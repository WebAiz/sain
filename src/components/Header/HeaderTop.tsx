// @flow
import * as React from 'react';
import {Button} from '../Button/Button';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import {useNavigate} from 'react-router-dom';

type Props = {};

export function HeaderTop(props: Props) {
  const navigate = useNavigate();
  const goToAdminPage = () => {
    console.log('fsd');
    navigate('/admin');
  };
  return (
      <div className={'header-top'}>
        <Button onClick={goToAdminPage}>
          <SensorDoorOutlinedIcon />
          <span>Кіру</span>
        </Button>
      </div>
  );
}
