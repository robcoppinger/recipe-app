import classNames from 'classnames';
import {LockIcon} from '../../assets/images/LockIcon';
import {Button} from '../../components/button';
import {TextInput} from '../../components/textInput';
import styles from './Login.module.scss';

export const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={classNames(styles.loginIcon)}>
        <LockIcon size={32} />
      </div>
      <h1 style={{marginBottom: '4rem'}}>Login</h1>
      <TextInput
        style={{marginBottom: '2rem'}}
        autoFocus
        tabIndex={1}
        type="email"
        autoComplete="username"
        id="email"
        placeholder="Email"
      />
      <TextInput
        tabIndex={2}
        id="password"
        type="password"
        autoComplete="current-password"
        placeholder="Password"
      />
      <Button
        variant="filled"
        tabIndex={3}
        className={styles.test}
        aria-label="Log In">
        Login
      </Button>
    </div>
  );
};
