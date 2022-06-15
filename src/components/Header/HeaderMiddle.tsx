import {useNavigate} from 'react-router-dom';
import {ContactPhones} from '../Contacts';

type Props = {};

export function HeaderMiddle(props: Props) {
  const navigate = useNavigate();
  return (
      <div className={'header-middle'}>
        <div className={'row sb'}>
          <img onClick={() => navigate('/')} src={'/images/logo.png'} alt="logo" />
          <img src="/images/map.png" alt="map" />
          <ContactPhones />
        </div>

        <img className={'main-logo'} src="/images/main-logo.jpeg" alt="main logo" />
      </div>
  );
}
