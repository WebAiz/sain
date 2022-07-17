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
  const [docs, setDocs] = useState([]);

  async function getChildYear() {
    const res: any = await getCollectionDoc('child_year', 'child_year');
    setChildYearData(res);
  }

  async function getChildImages() {
    const images = await getImages('child_year');
    setImages(images);
  }
  async function fetchDocs() {
    const docs = await getImages(`child_year-file`);
    setDocs(docs);
  }

  useEffect(() => {
    getChildYear();
    getChildImages();
    fetchDocs()
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
        <div className={'col'}>
          <h3 className={'mb-10'}>Косалкы акпараттар</h3>
          {docs.map((doc, i) => (
            <a target="_blank" key={i} href={doc.url}>{doc.name}</a>
          ))}
        </div>
      </main>
  );
}
