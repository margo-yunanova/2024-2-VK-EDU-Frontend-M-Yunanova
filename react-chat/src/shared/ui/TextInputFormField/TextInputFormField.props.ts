import { InputHTMLAttributes } from 'react';

export interface TextInputFormFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
