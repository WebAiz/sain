import {useCallback, useEffect, useState} from 'react';
import {getContactsData} from '../../admin/pages/Contacts/Contacts';
import './Contacts.scss';

type Props = {};

export function ContactsApp(props: Props) {
  const [contacts, setContacts] = useState({
    city: '',
    email: '',
    telOne: '',
    telTwo: '',
    address: '',
    region: '',
    street: '',
  });
  const fetchContacts = useCallback(() => {
    getContactsData().then((res: any) => setContacts(res));
  }, []);
  useEffect(() => {
    fetchContacts();
  }, []);
  console.log(contacts);
  return (
      <div className={'contacts'}>
        <h2 className={'mb'}>Контактілер</h2>
        <div className="contacts-row">
          <h3>Email</h3>
          <p>{contacts.email}</p>
        </div>
        <div className="contacts-row">
          <h3>Мекенжай</h3>
          <p>{contacts.address}</p>
        </div>
        <div className="contacts-row">
          <h3>Аймақ</h3>
          <p>{contacts.region}</p>
        </div>
        <div className="contacts-row">
          <h3>Қала</h3>
          <p>{contacts.city}</p>
        </div>
        <div className={'contacts-row'}>
          <h3 className={'contacts-title'}>Тел: 1</h3>
          <p>+{contacts?.telOne}</p>
        </div>
        <div className={'contacts-row'}>
          <h3 className={'contacts-title'}>Тел: 2</h3>
          <p>+{contacts?.telTwo}</p>
        </div>
      </div>
  );
}
