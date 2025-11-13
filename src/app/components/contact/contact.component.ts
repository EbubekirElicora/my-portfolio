import { Component } from '@angular/core';
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

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslationPipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent extends ScrollableSection {
  override nextSectionId = '';
  protected override backTargetId = 'about';

  submitting = false;
  messageFocused = false;
  nameFocused = false;
  emailFocused = false;
  success = false;
  error = '';

  constructor(
    scroll: ScrollService,
    private fb: FormBuilder,
    private lang: LanguageService          // ⬅️ NEU
  ) {
    super(scroll);
  }

  /** Nur Buchstaben (inkl. Umlaute), Leerzeichen, ' und - */
  private static namePattern = /^[A-Za-zÄÖÜäöüß'\-\s]+$/;

  /** Mindestens 20 Zeichen */
  private static minChars(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const text = ((control.value || '') as string).trim();
      return text.length >= min
        ? null
        : { minChars: { required: min, actual: text.length } };
    };
  }

  /** simple E-Mail-Regel: irgendwas@irgendwas.tld (>=2 Buchstaben) */
  private static emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

  // kleiner Helper für Übersetzungen
  private tr(key: string): string {
    return this.lang.translateSync(key);
  }

  contactForm = this.fb.group({
    name: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(ContactComponent.namePattern),
        ],
        updateOn: 'blur',
      },
    ],
    email: [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern(ContactComponent.emailPattern),
        ],
        updateOn: 'blur',
      },
    ],
    message: [
      '',
      {
        validators: [Validators.required, ContactComponent.minChars(20)],
        updateOn: 'blur',
      },
    ],
    privacy: [
      false,
      { validators: [Validators.requiredTrue], updateOn: 'change' },
    ],
  });

  // Bequeme Getter fürs Template
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

  async onSubmit(): Promise<void> {
    this.success = false;
    this.error = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.contactForm.updateValueAndValidity();
      return;
    }

    this.submitting = true;
    try {
      // hier würdest du senden
      this.success = true;
      this.contactForm.reset();
    } catch (err: any) {
      this.error = err?.message ?? 'Fehler beim Senden';
    } finally {
      this.submitting = false;
    }
  }

  // NAME
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

  nameErrorText(): string {
    const c = this.nameCtrl;
    if (c.hasError('required'))  return this.tr('contact.errors.name_required');
    if (c.hasError('minlength')) return this.tr('contact.errors.name_minlength');
    if (c.hasError('pattern'))   return this.tr('contact.errors.name_pattern');
    return this.tr('contact.errors.name_required');
  }

  // EMAIL
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

  emailErrorText(): string {
    const c = this.emailCtrl;
    if (c.hasError('required')) return this.tr('contact.errors.email_required');
    if (c.hasError('pattern'))  return this.tr('contact.errors.email_pattern');
    return this.tr('contact.errors.email_required');
  }

  // MESSAGE
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

  // PRIVACY
  showPrivacyError(): boolean {
    const c = this.privacyCtrl;
    return c.touched && c.invalid;
  }
}
