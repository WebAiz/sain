// @flow
import * as React from 'react';
import DropDown from '../DropDown';
import Button from '../Button';
import {ROUTES} from '../../constants';

type Props = {
  headerData: any,
  navigate: any
};

export function HeaderBottom({headerData, navigate}: Props) {
  return (
      <div className={'header-bottom'}>
        {headerData.map((el, i) => (
            <DropDown key={i} data={el} navigate={navigate} />
        ))}
        <Button onClick={() => navigate(ROUTES.CONTACTS)}>
          КОНТАКТІЛЕР
        </Button>
        <Button onClick={() => navigate(ROUTES.STUFF)}>
          ҚЫЗМЕТКЕРЛЕР
        </Button>
      </div>
  );
}
