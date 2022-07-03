import {useNavigate} from 'react-router-dom';
import {ContactPhones} from '../Contacts';

type Props = {};

export function HeaderMiddle(props: Props) {
  const navigate = useNavigate();
  return (
      <div className={'header-middle'}>
        <div className={'row sb a-center'}>
          <img onClick={() => navigate('/')} src={'/images/logo.png'} alt="logo" />
          <img className={'p-10'} src="/images/main-logo.jpeg" alt="map" />
          <ContactPhones />
        </div>

        <img className={'main-logo'} src="/images/map.png" alt="main logo" />
      </div>
  );
}
