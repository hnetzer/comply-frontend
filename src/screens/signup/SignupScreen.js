import React from 'react';

import styles from './Signup.module.css'

const SignupScreen = (props) => {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default SignupScreen;
