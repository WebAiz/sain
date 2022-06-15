import './SideBlock.scss';
import {ContactPhones} from '../Contacts';

type Props = {
  ceo: any
};

export function SideBlock({ceo}: Props) {
  return (
      <div className={'sideblock'}>
        <img src={ceo.url} alt="avatar" />
        <div className={'sideblock-body'}>
          <h2>{ceo.name}</h2>
          <button className={'submit-btn'}>Cұрақ қою</button>
          <ContactPhones />
        </div>

      </div>
  );
}
