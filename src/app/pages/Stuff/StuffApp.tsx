import {useEffect, useState} from 'react';
import {getStuffs} from '../../../admin/pages/Stuff/Stuff';

type Props = {};

export function StuffApp(props: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStuffs(setData);
  }, []);

  return (
      <main className={'stuffs'}>
        <div className={'stuffs-list'}>
          {data.map((el, i) => (
              <div key={i} className={'stuffs-card'}>
                <div className={'stuffs-img'}>
                  <img src={el.imgUrl} alt="stuff" />
                </div>
                <h1>{el.full_name}</h1>
                <p className={'mb'}>{el.description}</p>
              </div>
          ))}
        </div>
      </main>
  );
}
