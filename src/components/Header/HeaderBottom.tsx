// @flow
import * as React from 'react';
import DropDown from '../DropDown';
import Button from '../Button';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../constants';

type Props = {
  headerData: any,
  navigateToBlogs: any
};

export function HeaderBottom({headerData, navigateToBlogs}: Props) {
  const navigate = useNavigate();
  const goToContactsPage = () => {
    navigate(ROUTES.CONTACTS);
  };
  return (
      <div className={'header-bottom'}>
        {headerData.map((el, i) => (
            <DropDown key={i} data={el} navigateToBlogs={navigateToBlogs} />
        ))}
        <Button onClick={goToContactsPage}>
          Контакты
        </Button>
      </div>
  );
}
