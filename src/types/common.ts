/**
 * Common shared types used across the application
 */

export interface NavItem {
  label: string;
  path?: string;
  id?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

