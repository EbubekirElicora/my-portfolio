import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ScrollableSection } from '../../shared/scrollable-section.base';   // <— Pfad anpassen falls nötig
import { ScrollService } from '../../services/scroll.service';              // <— Pfad anpassen

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends ScrollableSection {
  override nextSectionId = 'legal';

  submitting = false;
  success = false;
  error = '';

  constructor(
    scroll: ScrollService,
    private fb: FormBuilder
  ) {
    super(scroll);
  }

  contactForm = this.fb.group({
    name: ['', { validators: [Validators.required, Validators.minLength(2)], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
    message: ['', { validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur' }],
    privacy: [false, { validators: [Validators.requiredTrue], updateOn: 'change' }]
  });

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';
    try {
      // TODO: E-Mail/Backend call integrieren
      this.success = true;
      this.contactForm.reset();
    } catch (err: any) {
      this.error = err?.message ?? 'Fehler beim Senden';
    } finally {
      this.submitting = false;
    }
  }
}
