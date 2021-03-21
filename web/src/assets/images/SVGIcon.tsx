import {ReactNode} from 'react';
import styles from './Icons.module.scss';

export const SVGIcon = (
  {children, size}: {children: ReactNode; size: number},
  ...props: any
) => {
  return (
    <svg
      viewBox="0 0 512 512"
      className={styles.primary}
      {...props}
      width={size || 32}
      height={size || 32}>
      {children}
    </svg>
  );
};
