import './SideBlock.scss';
import {ContactPhones} from '../Contacts';
import Modal from '../Modal';
import ContactForm from '../ContactForm';
import {useState} from 'react';

type Props = {
  ceo: any
};

export function SideBlock({ceo}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
      <div className={'sideblock'}>
        <img src={ceo.url} alt="avatar" />
        <div className={'sideblock-body'}>
          <h2>{ceo.name}</h2>
          <button className={'submit-btn'} onClick={handleClick}>Cұрақ қою</button>
          <ContactPhones />
        </div>

        {isOpen && <Modal onClose={() => setIsOpen(false)}>
          <ContactForm closeModal={() => setIsOpen(false)} />
        </Modal>}
      </div>
  );
}
