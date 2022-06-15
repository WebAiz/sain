// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {getCollectionDoc} from '../../../helper';
import {getImages} from '../../../components/Images/Images';
import '../Blog/Blog.scss';

type Props = {};

export function ChildYearApp(props: Props) {
  const [childYearData, setChildYearData] = useState({
    name: '',
    description: '',
  });
  const [images, setImages] = useState([]);

  async function getChildYear() {
    const res: any = await getCollectionDoc('child_year', 'child_year');
    setChildYearData(res);
  }

  async function getChildImages() {
    const images = await getImages('child_year');
    setImages(images);
  }

  useEffect(() => {
    getChildYear();
    getChildImages();
  }, []);
  return (
      <main className={'blog'}>
        <h1>{childYearData?.name}</h1>
        <p className={'mb'}>{childYearData?.description}</p>
        <div className={'blog-list'}>
          {images.map((el, i) => (
              <img key={i} src={el.url} alt="img" />
          ))}
        </div>
      </main>
  );
}
