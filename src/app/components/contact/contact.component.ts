import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { TranslationPipe } from '../../shared/translation.pipe';
import { LanguageService } from '../../services/language.service';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const NAME_PATTERN = /^[A-Za-zÄÖÜäöüß'\-\s]+$/;
const EMAIL_PATTERN =
  /^(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const NAME_VALIDATORS = [
  Validators.required,
  trimMinLength(5),
  Validators.pattern(NAME_PATTERN),
];
const EMAIL_VALIDATORS = [
  Validators.required,
  Validators.pattern(EMAIL_PATTERN),
];
const MESSAGE_VALIDATORS = [Validators.required, minChars(20)];
function minChars(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = ((control.value || '') as string).trim();
    return text.length >= min
      ? null
      : { minChars: { required: min, actual: text.length } };
  };
}
function trimMinLength(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = ((control.value || '') as string).trim();
    return text.length >= min
      ? null
      : {
          minlengthTrimmed: { requiredLength: min, actualLength: text.length },
        };
  };
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslationPipe,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent extends ScrollableSection {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  override nextSectionId = '';
  protected override backTargetId = 'about';

  submitting = false;
  messageFocused = false;
  nameFocused = false;
  emailFocused = false;
  success = false;
  mailTest = false;
  error = '';

  private readonly mailConfig = {
    endPoint: '/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: { 'Content-Type': 'text/plain' as const },
      responseType: 'text' as const,
    },
  };

  constructor(
    scroll: ScrollService,
    private fb: FormBuilder,
    private lang: LanguageService,
    private http: HttpClient
  ) {
    super(scroll);
  }

  private tr(key: string): string {
    return this.lang.translateSync(key);
  }

  contactForm = this.createContactForm();

  private createContactForm() {
    return this.fb.group({
      name: ['', { validators: NAME_VALIDATORS, updateOn: 'blur' }],
      email: ['', { validators: EMAIL_VALIDATORS, updateOn: 'blur' }],
      message: ['', { validators: MESSAGE_VALIDATORS, updateOn: 'blur' }],
      privacy: [
        false,
        { validators: [Validators.requiredTrue], updateOn: 'change' },
      ],
    });
  }

  get nameCtrl() {
    return this.contactForm.get('name')!;
  }
  get emailCtrl() {
    return this.contactForm.get('email')!;
  }
  get messageCtrl() {
    return this.contactForm.get('message')!;
  }
  get privacyCtrl() {
    return this.contactForm.get('privacy')!;
  }

  isFieldValid(ctrl: AbstractControl | null) {
    return !!ctrl && ctrl.touched && ctrl.valid;
  }

  isFieldInvalid(ctrl: AbstractControl | null) {
    return !!ctrl && ctrl.touched && ctrl.invalid;
  }

  private markFormInvalid() {
    this.contactForm.markAllAsTouched();
    this.contactForm.updateValueAndValidity();
  }

  private buildPayload() {
    return {
      name: (this.nameCtrl.value || '').trim(),
      email: (this.emailCtrl.value || '').trim(),
      message: (this.messageCtrl.value || '').trim(),
    };
  }
  private async simulateSuccess(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    this.success = true;
    this.contactForm.reset();
  }

  private sendMail(payload: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(
          this.mailConfig.endPoint,
          this.mailConfig.body(payload),
          this.mailConfig.options
        )
        .subscribe({
          next: () => {
            this.success = true;
            this.contactForm.reset();
            resolve();
          },
          error: (err) => {
            console.error('Mail send error', err);
            this.error = 'Fehler beim Senden der Nachricht.';
            reject(err);
          },
        });
    });
  }

  private async sendForm(): Promise<void> {
    const payload = this.buildPayload();
    if (this.mailTest) {
      await this.simulateSuccess();
      return;
    }
    await this.sendMail(payload);
  }

  async onSubmit(): Promise<void> {
    this.success = false;
    this.error = '';
    if (this.contactForm.invalid) {
      this.markFormInvalid();
      return;
    }
    this.submitting = true;
    try {
      await this.sendForm();
    } catch (err: any) {
      this.error = err?.message ?? 'Fehler beim Senden';
    } finally {
      this.submitting = false;
    }
  }

  onNameFocus() {
    this.nameFocused = true;
  }

  onNameBlur() {
    this.nameFocused = false;
    this.nameCtrl.markAsTouched();
  }

  showNameError(): boolean {
    const c = this.nameCtrl;
    return c.touched && c.invalid && !this.nameFocused;
  }

  focusNameInput() {
    this.nameInput.nativeElement.focus();
  }

  nameErrorText(): string {
    const c = this.nameCtrl;
    if (c.hasError('required')) return this.tr('contact.errors.name_required');
    if (c.hasError('minlength') || c.hasError('minlengthTrimmed'))
      return this.tr('contact.errors.name_minlength');
    if (c.hasError('pattern')) return this.tr('contact.errors.name_pattern');
    return this.tr('contact.errors.name_required');
  }
  onEmailFocus() {
    this.emailFocused = true;
  }

  onEmailBlur() {
    this.emailFocused = false;
    this.emailCtrl.markAsTouched();
  }

  showEmailError(): boolean {
    const c = this.emailCtrl;
    return c.touched && c.invalid && !this.emailFocused;
  }

  focusEmailInput() {
    this.emailInput.nativeElement.focus();
  }

  emailErrorText(): string {
    const c = this.emailCtrl;
    if (c.hasError('required')) return this.tr('contact.errors.email_required');
    if (c.hasError('pattern')) return this.tr('contact.errors.email_pattern');
    return this.tr('contact.errors.email_required');
  }

  onMessageFocus() {
    this.messageFocused = true;
  }

  onMessageBlur() {
    this.messageFocused = false;
    this.messageCtrl.markAsTouched();
  }

  showMessageError(): boolean {
    const c = this.messageCtrl;
    return c.touched && c.invalid && !this.messageFocused;
  }

  messageErrorText(): string {
    const c = this.messageCtrl;
    if (c.hasError('required')) {
      return this.tr('contact.errors.message_required');
    }
    if (c.hasError('minChars')) {
      return this.tr('contact.errors.message_minchars');
    }
    return this.tr('contact.errors.message_required');
  }

  showPrivacyError(): boolean {
    const c = this.privacyCtrl;
    return c.touched && c.invalid;
  }
}
