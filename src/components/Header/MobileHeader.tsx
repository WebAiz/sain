// @flow
import * as React from 'react';
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import {MobileDropDown} from '../DropDown/MobileDropDown';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  headerData: any,
  navigateToBlogs: any
};

export function MobileHeader({headerData, navigateToBlogs}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
      <header className={'header'}>
        {isOpen ? <CloseIcon
                className={'burger'}
                onClick={() => setIsOpen(false)} />
            : <MenuIcon className={'burger'} onClick={() => setIsOpen(true)} />}
        {isOpen &&
          <div className="menu">
            {headerData.map((el, i) => (
                <MobileDropDown navigateToBlogs={navigateToBlogs} data={el} key={i} />
            ))}
          </div>
        }
      </header>
  );
}
