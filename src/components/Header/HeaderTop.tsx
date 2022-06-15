import {Button} from '../Button/Button';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import {useNavigate} from 'react-router-dom';

type Props = {};

export function HeaderTop(props: Props) {
  const navigate = useNavigate();
  const goToAdminPage = () => {
    navigate('/admin');
  };
  const goToChildPage = () => {
    navigate('/child-year');
  };
  return (
      <div className={'header-top'}>
        <Button onClick={goToAdminPage}>
          <SensorDoorOutlinedIcon />
          <span>Кіру</span>
        </Button>
        <Button onClick={goToChildPage}>
          <span>Балалар жылы</span>
        </Button>
      </div>
  );
}
