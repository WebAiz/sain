// @flow
import * as React from 'react';
import './SideBlock.scss';
import {Contacts} from '../Contacts';

type Props = {};

export function SideBlock(props: Props) {
  return (
      <div className={'sideblock'}>
        <img src="/images/map.png" alt="avatar" />
        <div className={'sideblock-body'}>
          <h2>Аламанова Акмарал Сериковна</h2>
          <button className={'submit-btn'}>Ask stmg</button>
          <Contacts />
        </div>

      </div>
  );
}
