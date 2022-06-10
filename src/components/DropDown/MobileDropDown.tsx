// @flow
import * as React from 'react';
import {useState} from 'react';
import './DropDown.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type Props = {};

const data = {
  title: 'temp title',
  list: [{title: 'dsfsd', slug: '1'}, {title: 'sdfsd', slug: '2'}],
};

export function MobileDropDown(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };
  return (
      <div className={'dropdown'} onClick={toggleOpen}>
        <div className={'dropdown-header'}>
          {data.title}
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
        {isOpen && <div className={'dropdown-body'}>
          {data.list.map((el, i) => (
              <p key={i}>{el.title}</p>
          ))}
        </div>}
      </div>
  );
}
