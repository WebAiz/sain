import {useEffect, useState} from 'react';
import {getStuffs} from '../../../admin/pages/Stuff/Stuff';
import './StuffApp.scss';

type Props = {};

export function StuffApp(props: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStuffs(setData);
  }, []);

  return (
      <main className={'stuff'}>
        <h1 className={'mb'}>Stuff</h1>
        <div className={'stuff-list'}>
          {data.map((el, i) => (
              <div key={i} className={'stuff-card'}>
                <div className={'stuff-img'}>
                  <img src={el.imgUrl} alt="stuff" />
                </div>
                <div className={'stuff-body'}>
                  <h2>{el.full_name}</h2>
                  <p className={'mb'}>{el.description}</p>
                </div>

              </div>
          ))}
        </div>
      </main>
  );
}
