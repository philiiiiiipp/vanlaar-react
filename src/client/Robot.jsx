import React, { Component } from 'react';
import styles from './Robot.scss';

export default class Robot extends Component {

  render() {
    const { robot: { name, picture, origin } } = this.props;

    return (
      <div className={styles.robotContainer}>
        <div>
          <img src={picture} />
        </div>
        <h2>{name}</h2>
        <p>{origin}</p>
      </div>
    );
  }
}
