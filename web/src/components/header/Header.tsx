import styles from './Header.module.scss';
import classnames from 'classnames';

export const Header = () => (
  <div className={classnames(styles.headerContainer)}>
    <h2>Recipeasy</h2>
  </div>
);
