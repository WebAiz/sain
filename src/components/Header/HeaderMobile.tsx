// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import {MobileDropDown} from '../DropDown/MobileDropDown';
import CloseIcon from '@mui/icons-material/Close';
import {ROUTES} from '../../constants';

type Props = {
  headerData: any,
  navigate: any
};

export function HeaderMobile({headerData, navigate}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);
  return (
      <header className={'header'}>
        {isOpen ? <CloseIcon
                className={'burger'}
                onClick={() => setIsOpen(false)} />
            : <MenuIcon className={'burger'} onClick={() => setIsOpen(true)} />}
        {isOpen &&
          <div className="menu">
            {headerData.map((el, i) => (
                <MobileDropDown navigate={navigate} data={el} key={i} />
            ))}
            <div className="dropdown">
              <div className="dropdown-header">
                <p onClick={() => navigate(ROUTES.CONTACTS)}>
                  Контакты
                </p>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropdown-header">
                <p onClick={() => navigate(ROUTES.STUFF)}>
                  Stuff
                </p>
              </div>
            </div>
          </div>
        }
      </header>
  );
}
