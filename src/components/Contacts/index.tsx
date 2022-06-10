// @flow
import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import './Contacts.scss';
import {getContactsData} from '../../admin/pages/Contacts/Contacts';

type Props = {};

export function Contacts(props: Props) {
  const [contacts, setContacts] = useState({
    telOne: '',
    telTwo: '',
  });
  const fetchContacts = useCallback(() => {
    getContactsData().then((res: any) => setContacts(res));
  }, []);
  useEffect(() => {
    fetchContacts();
  }, []);
  return (
      <div className="contacts">
        <div className={'contacts-row'}>
          <p className={'contacts-title'}>Тел: 1</p>
          <p className={'contacts-phone'}>+{contacts?.telOne}</p>
        </div>
        <div className={'contacts-row'}>
          <p className={'contacts-title'}>Тел: 2</p>
          <p className={'contacts-phone'}>+{contacts?.telTwo}</p>
        </div>
      </div>
  );
}
