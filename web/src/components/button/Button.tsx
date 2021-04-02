import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  variant?: 'filled' | 'outline';
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, className, variant, ...buttonProps }, ref) => {
    return (
      <button
        type="button"
        {...buttonProps}
        className={classNames(styles.button, className && className, {
          [styles.filled]: variant === 'filled',
          [styles.outline]: variant === 'outline',
          [styles.disabled]: buttonProps.disabled,
        })}>
        {children}
      </button>
    );
  },
);
