import React, { Component } from 'react';
import styles from './loading.less';

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.spinner}>
        <div className={styles['double-bounce1']} />
        <div className={styles['double-bounce2']} />
      </div>
    )
  }
}
