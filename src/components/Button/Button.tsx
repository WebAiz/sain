// @flow
import * as React from 'react';
import './Button.scss';

export function Button(props) {
  const {children, onClick} = props;
  return (
      <button className={'button'} onClick={onClick}>
        {children}
      </button>
  );
}
