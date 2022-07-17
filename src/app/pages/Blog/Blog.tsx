// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import './Blog.scss';
import {getSubSubCollectionDoc} from '../../../helper';
import {useParams} from 'react-router-dom';
import {getImages} from '../../../components/Images/Images';

type Props = {};

export function Blog(props: Props) {
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const {sectionId, blogsId, blogId} = useParams();

  async function getBlog() {
    const res: any = await getSubSubCollectionDoc({
      colRef: 'common_pages',
      docID: sectionId,
      subColRef: 'sub_pages',
      subDocID: blogsId,
      subSubColRef: 'blogs',
      subSubDocID: blogId,
    });
    setData(res);
  }
  async function fetchDocs() {
    const docs = await getImages(`${blogId}-file`);
    setDocs(docs);
  }

  useEffect(() => {
    getBlog();
    getImages(blogId).then(list => setImages(list));
    fetchDocs()
  }, [sectionId, blogsId, blogId]);

  return (
    <main className={'blog'}>
      <h1>{data?.title}</h1>
      <p className={'mb'}>{data?.description}</p>
      <div className={'blog-list'}>
        {images.map((el, i) => (
          <img key={i} src={el.url} alt="img"/>
        ))}
      </div>
      <div className={'col'}>
        <h3 className={'mb-10'}>Қосалкы акпараттар</h3>
        {docs.map((doc, i) => (
          <a target="_blank" key={i} href={doc.url}>{doc.name}</a>
        ))}
      </div>
    </main>
  );
}
