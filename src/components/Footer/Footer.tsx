import './Footer.scss';
import {ContactPhones} from '../Contacts';

type Props = {};

export function Footer(props: Props) {
  return (
      <footer className={'footer'}>
        <img src="/images/logo.png" alt="logo" />
        <ContactPhones />
      </footer>
  );
}
