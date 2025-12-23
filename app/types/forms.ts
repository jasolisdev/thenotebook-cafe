/**
 * @fileoverview Form data type definitions
 * @module types/forms
 *
 * @description
 * Type definitions for form submissions across the site.
 * Used in contact forms, newsletter forms, and job applications.
 */

/**
 * Contact form submission data
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Newsletter subscription form data
 */
export interface SubscribeFormData {
  email: string;
  source: 'homepage' | 'footer' | 'modal' | 'newsletter-section';
}

/**
 * Job application form data
 */
export interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume?: File;
}
