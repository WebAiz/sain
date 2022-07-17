import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import * as React from 'react';
import {getCollectionDoc} from '../../../helper';
import {getImages} from '../../../components/Images/Images';

type Props = {};

export function Home(props: Props) {
  const [homeData, setHomeData] = useState({
    name: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);

  async function getHomeData() {
    const res: any = await getCollectionDoc('home', 'home');
    setHomeData(res);
  }

  async function getHomeImages() {
    const images = await getImages('home');
    setImages(images);
  }
  async function fetchDocs() {
    const docs = await getImages(`home-file`);
    setDocs(docs);
  }

  useEffect(() => {
    getHomeData();
    getHomeImages();
    fetchDocs()
  }, []);
  return (
    <main className={'blog'}>
      <h1>{homeData?.name}</h1>
      <p className={'mb'}>{homeData?.description}</p>
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
