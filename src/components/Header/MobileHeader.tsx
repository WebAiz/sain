// @flow
import * as React from 'react';
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import {MobileDropDown} from '../DropDown/MobileDropDown';
import CloseIcon from '@mui/icons-material/Close';

type Props = {};

export function MobileHeader(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const arr = new Array(6).fill(0);
  return (
      <header className={'header'}>
        {isOpen ? <CloseIcon
                className={'burger'}
                onClick={() => setIsOpen(false)} />
            : <MenuIcon className={'burger'} onClick={() => setIsOpen(true)} />}
        {isOpen &&
          <div className="menu">
            {arr.map((el, i) => (
                <MobileDropDown key={i} />
            ))}
          </div>
        }
      </header>
  );
}
