import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './TextInput.module.scss';

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  required?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInput>(
  ({ id, label, required = false, ...inputProps }: ITextInput, ref) => (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        type="text"
        className={styles.input}
        aria-label={label || inputProps.placeholder}
        aria-required={required}
        {...inputProps}
      />
    </>
  ),
);
