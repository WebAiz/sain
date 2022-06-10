// @flow
import * as React from 'react';
import './SideBlock.scss';
import {Contacts} from '../Contacts';

type Props = {
  ceo: any
};

export function SideBlock({ceo}: Props) {
  return (
      <div className={'sideblock'}>
        <img src={ceo.url} alt="avatar" />
        <div className={'sideblock-body'}>
          <h2>{ceo.name}</h2>
          <button className={'submit-btn'}>Ask stmg</button>
          <Contacts />
        </div>

      </div>
  );
}
