// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../Header';
import {Footer} from '../Footer';
import {SideBlock} from '../SideBlock';
import './Layout.scss';
import {BreadCrumb} from '../BreadCrumb';
import {getCollectionDoc} from '../../helper';
import {getImages} from '../Images/Images';
import Loader from '../common/Loader';

type Props = {};


export const LoaderContext = React.createContext(null);

export function Layout(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [ceo, setCEO] = useState({
    name: '',
    url: '',
  });


  async function getCEO() {
    const res: any = await getCollectionDoc('ceo', 'ceo');
    const ceoImg = await getImages('ceo');
    setCEO({name: res.name, url: ceoImg[0].url});
  }

  useEffect(() => {
    getCEO();
  }, []);
  return (
      <>
        {isLoading ? <Loader /> :
            <LoaderContext.Provider value={setIsLoading}>
              <div className={'layout'}>
                <Header />
                <BreadCrumb />
                <div className={'layout-body'}>
                  <Outlet />
                  <SideBlock ceo={ceo} />
                </div>
                <Footer />
              </div>
            </LoaderContext.Provider>
        }
      </>
  );
}
