import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

type Props = {};

export function Home(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/blogs/QluiWVDrOKCEGtlXfiXA/Xdl9ePRFLWuMXBAkcoCQ');
  }, [location.pathname]);
  return (
    <main>
      <div className="block-list">
        <div>home</div>
      </div>
    </main>
  );
}
