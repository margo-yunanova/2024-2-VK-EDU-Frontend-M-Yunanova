import { FC } from 'react';

import styles from './TextInputFormField.module.scss';
import { TextInputFormFieldProps } from './TextInputFormField.props';

export const TextInputFormField: FC<TextInputFormFieldProps> = ({
  type,
  required,
  name,
  onChange,
  value,
  id,
  label,
  ...props
}) => {
  return (
    <label htmlFor={id} className={styles.label}>
      <span>{label}</span>
      <input
        className={styles['form-input']}
        type={type}
        required={required}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        {...props}
      />
    </label>
  );
};
