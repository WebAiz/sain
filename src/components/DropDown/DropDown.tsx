import {useState} from 'react';
import './DropDown.scss';
import {ROUTES} from '../../constants';

type Props = {
  data: any,
  navigate: any
};

export function DropDown({data, navigate}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className={'dropdown'}
           onMouseOver={() => setIsOpen(true)}
           onMouseLeave={() => setIsOpen(false)}>
        <div className={'dropdown-header'}>
          {data.header.name}
        </div>
        {isOpen && <div className={'dropdown-body'}>
          {data.list.map((el, i) => (
              <p onClick={() => navigate(ROUTES.BLOGS + data.header.id + '/' + el.id)} key={i}>{el.name}</p>
          ))}
        </div>}
      </div>
  );
}
