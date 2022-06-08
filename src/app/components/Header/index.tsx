// @flow
import * as React from 'react';
import {HeaderTop} from './HeaderTop';
import {HeaderMiddle} from './HeaderMiddle';
import {HeaderBottom} from './HeaderBottom';

type Props = {};

export function Header(props: Props) {
  return (
      <header>
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
  );
}
