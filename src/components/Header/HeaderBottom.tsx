// @flow
import * as React from 'react';
import {DropDown} from '../DropDown';

type Props = {
  headerData: any,
  navigateToBlogs: any
};

export function HeaderBottom({headerData, navigateToBlogs}: Props) {

  return (
      <div className={'header-bottom'}>
        {headerData.map((el, i) => (
            <DropDown key={i} data={el} navigateToBlogs={navigateToBlogs} />
        ))}
      </div>
  );
}
