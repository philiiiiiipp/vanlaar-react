import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './Robot.scss';

export default class Robot extends Component {

  render() {
    const { robot: { name, picture, origin, id: { $oid } } } = this.props;

    return (
      <div className={styles.robotContainer}>
        <div>
          <img src={picture} />
        </div>
        <h2><Link to={`/${$oid}`}>{name}</Link></h2>
        <p>{origin}</p>
        <p>{$oid}</p>
      </div>
    );
  }
}
