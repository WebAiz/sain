import {useState} from 'react';
import Button from '../Button';
import './ContactForm.scss';
import {sendMessage} from './emailJsApi';

type Props = {
  closeModal: any
};

export function ContactForm({closeModal}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  function validate(text, minLen: number, maxLen: number) {
    return text.length >= minLen && text.length <= maxLen;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const full_name = target.fullName.value;
    const phone = target.phone.value;
    const email = target.email.value;
    const text = target.text.value;
    const isTextValid = validate(text, 10, 250);
    const isFullNameValid = validate(full_name, 10, 50);
    const isPhoneValid = validate(phone, 10, 12);
    const isEmailValid = validate(email, 5, 30);

    if (isTextValid && isFullNameValid && isPhoneValid && isEmailValid) {
      const data = {full_name, phone, email, text};
      submitForm(data);
    }
  };

  function submitForm(data) {
    sendMessage(data, alert, alert);
    closeModal();
  }

  return (
      <form className={'message'} onSubmit={handleSubmit}>
        <div className="message-header">
          <h2></h2>
        </div>
        <div className="message-body">
          <div className="message-field">
            <label htmlFor="fullName">ФИО</label>
            <input required minLength={10} maxLength={50} name="fullName" className="message-input" type="text"
                   id="fullName" value={name}
                   onChange={handleNameChange} />
          </div>
          <div className="message-field">
            <label htmlFor="email">Емайл</label>
            <input required name="email" minLength={5} maxLength={30} className="message-input" type="email" id="email"
                   value={email}
                   onChange={handleEmailChange} />
          </div>
          <div className="message-field">
            <label htmlFor="phone">Телефон</label>
            <input required maxLength={12} minLength={10} className="message-input" name="phone" value={phone}
                   type="text"
                   onChange={handlePhoneChange} />
          </div>
          <div className="message-field">
            <label htmlFor="text">Текст</label>
            <textarea minLength={10} maxLength={250} required name="text" className="message-input" value={text}
                      id="text" onChange={handleTextChange} />
          </div>
        </div>
        <Button>Жіберу</Button>
      </form>
  );
}
