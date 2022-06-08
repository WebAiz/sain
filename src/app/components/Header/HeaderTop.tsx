// @flow
import * as React from 'react';
import {Button} from '../Button/Button';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';

type Props = {};

export function HeaderTop(props: Props) {
  return (
      <div>
        <Button>
          <SensorDoorOutlinedIcon />
          <span>Enter</span>
        </Button>
      </div>
  );
}
