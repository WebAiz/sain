import * as React from 'react';
import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SideBlock from '../SideBlock';
import BreadCrumb from '../BreadCrumb';
import {getCollectionDoc} from '../../helper';
import {getImages} from '../Images/Images';
import Loader from '../common/Loader';
import {LoaderContext} from '../../hooks/useContext';
import './Layout.scss';
import FixedButton from '../FixedButton';
import Modal from '../Modal';
import ContactForm from '../ContactForm';

type Props = {};

export function Layout(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isTablet = window.innerWidth < 1024;
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
              {isTablet && <FixedButton onClick={() => setIsOpen(true)}>
                Бізге жазыныз
              </FixedButton>}
              {isOpen && <Modal onClose={() => setIsOpen(false)}>
                <ContactForm closeModal={() => setIsOpen(false)} />
              </Modal>}
            </LoaderContext.Provider>
        }
      </>
  );
}
