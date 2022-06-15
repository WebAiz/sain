import {useNavigate} from 'react-router-dom';
import {ContactPhones} from '../Contacts/ContactPhones';

type Props = {};

export function HeaderMiddle(props: Props) {
  const navigate = useNavigate();
  return (
      <div className={'header-middle'}>
        <img onClick={() => navigate('/')} src={'/images/logo.png'} alt="logo" />
        <img src="/images/map.png" alt="map" />
        <ContactPhones />
      </div>
  );
}
