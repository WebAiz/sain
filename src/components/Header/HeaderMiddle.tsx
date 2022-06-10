import {Contacts} from '../Contacts';

type Props = {};

export function HeaderMiddle(props: Props) {
  return (
      <div className={'header-middle'}>
        <img src={'/images/logo.png'} alt="logo" />
        <img src="/images/map.png" alt="map" />
        <Contacts />
        {/*  TODO рузани жангыру*/}
        {/*  TODO add mobile phone*/}

      </div>
  );
}
