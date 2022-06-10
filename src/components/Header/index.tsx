// @flow
import * as React from 'react';
import {HeaderTop} from './HeaderTop';
import {HeaderMiddle} from './HeaderMiddle';
import {HeaderBottom} from './HeaderBottom';
import './Header.scss';
import {MobileHeader} from './MobileHeader';

type Props = {};

export function Header(props: Props) {
  return (
      <header className={'header'}>
        <HeaderTop />
        {window.innerWidth > 1024 ?
            <>
              <HeaderMiddle />
              <HeaderBottom />
            </> :
            <MobileHeader />
        }
      </header>
  );
}
