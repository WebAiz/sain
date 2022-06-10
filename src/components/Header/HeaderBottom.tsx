// @flow
import * as React from 'react';
import {DropDown} from '../DropDown';

type Props = {};

export function HeaderBottom(props: Props) {
  const arr = new Array(6).fill('df');
  return (
      <div className={'header-bottom'}>
        {arr.map((el, i) => (
            <DropDown key={i} />
        ))}
      </div>
  );
}
