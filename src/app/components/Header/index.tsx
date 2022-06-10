// @flow
import * as React from 'react';
import {HeaderTop} from './HeaderTop';
import {HeaderMiddle} from './HeaderMiddle';
import {HeaderBottom} from './HeaderBottom';
import './Header.scss';

type Props = {};

export function Header(props: Props) {
  return (
      <header className={'header'}>
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
  );
}
