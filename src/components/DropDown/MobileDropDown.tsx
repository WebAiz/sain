import {useState} from 'react';
import './DropDown.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {ROUTES} from '../../constants';

type Props = {
  data: any,
  navigate: any
};

export function MobileDropDown({data, navigate}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
      <div className={'dropdown'} onClick={toggleOpen}>
        <div className={'dropdown-header'}>
          {data?.header?.name}
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
        {isOpen && <div className={'dropdown-body'}>
          {data?.list && data?.list.map((el, i) => (
              <p onClick={() => navigate(ROUTES.BLOGS + data.header.id + '/' + el.id)} key={i}>{el?.name}</p>
          ))}
        </div>}
      </div>
  );
}
