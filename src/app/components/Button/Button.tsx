// @flow
import * as React from 'react';
import './Button.scss';

export function Button(props) {
  const {children} = props;
  return (
      <button className={'button'}>
        {children}
      </button>
  );
}
