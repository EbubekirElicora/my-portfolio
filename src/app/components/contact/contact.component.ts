import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = this.fb.group({
    name: ['', { validators: [Validators.required, Validators.minLength(2)], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
    message: ['', { validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur' }],
    privacy: [false, { validators: [Validators.requiredTrue], updateOn: 'change' }]
  });

  submitting = false;
  success = false;
  error = '';

  constructor(private fb: FormBuilder) {}


  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';
    try {
      this.success = true;
      this.contactForm.reset();
    } catch (err: any) {
      this.error = err?.message ?? 'Fehler beim Senden';
    } finally {
      this.submitting = false;
    }
  }
}