// @flow
import * as React from 'react';
import './Contacts.scss';

type Props = {};

export function Contacts(props: Props) {
  return (
      <div className="contacts">
        <div className={'contacts-row'}>
          <p className={'contacts-title'}>Menter</p>
          <p className={'contacts-phone'}>+77777777777</p>
        </div>
        <div className={'contacts-row'}>
          <p className={'contacts-title'}>Menter</p>
          <p className={'contacts-phone'}>+77777777777</p>
        </div>
      </div>
  );
}
