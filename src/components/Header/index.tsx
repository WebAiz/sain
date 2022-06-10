// @flow
import * as React from 'react';
import {useCallback, useContext, useEffect, useState} from 'react';
import {HeaderTop} from './HeaderTop';
import {HeaderMiddle} from './HeaderMiddle';
import {HeaderBottom} from './HeaderBottom';
import './Header.scss';
import {MobileHeader} from './MobileHeader';
import {getCollectionDocs, getSubCollectionDocs} from '../../helper';
import {useNavigate} from 'react-router-dom';
import {LoaderContext} from '../Layout';

type Props = {};

export function Header(props: Props) {
  const isDesktop = window.innerWidth > 1024;
  const [headerData, setHeaderData] = useState([]);
  const navigate = useNavigate();
  const setIsLoading = useContext(LoaderContext);


  const getData = useCallback(async () => {
    const res = await getCollectionDocs('common_pages');
    if (res) {
      const list = [];
      for (const el of res) {
        const result = await getSubCollectionDocs({
          colRef: 'common_pages',
          docID: el.id || '',
          subColRef: 'sub_pages',
        });
        list.push({header: el, list: result});
      }
      setHeaderData(list);
    }
  }, []);

  const navigateToBlogs = (sectionID, blogsID) => {
    // setIsLoading(true);
    navigate(`/blogs/${sectionID}/${blogsID}`);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
      <header className={'header'}>
        <HeaderTop />
        {isDesktop ?
            <>
              <HeaderMiddle />
              <HeaderBottom navigateToBlogs={navigateToBlogs} headerData={headerData} />
            </> :
            <MobileHeader navigateToBlogs={navigateToBlogs} headerData={headerData} />
        }
      </header>
  );
}
