/**
 * @fileoverview Sanity CMS document type definitions
 * @module types/sanity
 *
 * @description
 * Type definitions for Sanity document schemas.
 * Used when querying and creating Sanity documents.
 */

/**
 * Newsletter subscriber document
 */
export interface SanitySubscriber {
  _id: string;
  _type: 'subscriber';
  email: string;
  source: string;
  status: 'subscribed' | 'unsubscribed';
  unsubscribeToken: string;
  createdAt: string;
}

/**
 * Contact message document
 */
export interface SanityContactMessage {
  _id: string;
  _type: 'contactMessage';
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  source: string;
  createdAt: string;
}
