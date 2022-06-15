import './Contacts.scss';
import {useCallback, useEffect, useState} from 'react';
import {getContactsData} from '../../admin/pages/Contacts/Contacts';

export function ContactPhones() {
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
  console.log(contacts);
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
