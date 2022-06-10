// @flow
import * as React from 'react';
import './Footer.scss';
import {Contacts} from '../Contacts';

type Props = {};

export function Footer(props: Props) {
  return (
      <footer className={'footer'}>
        <img src="/images/logo.png" alt="logo" />
        <Contacts />
      </footer>
  );
}
