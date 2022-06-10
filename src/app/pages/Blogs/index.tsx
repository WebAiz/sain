// @flow
import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {getSubSubCollectionDocs} from '../../../helper';
import {useParams} from 'react-router-dom';
import {SmallBlock} from '../../../components/SmallBlock';
import {getImages} from '../../../components/Images/Images';
import {LoaderContext} from '../../../components/Layout';

type Props = {};

export function Blogs(props: Props) {
  const {sectionId, blogsId} = useParams();
  const [blogs, setBlogs] = useState([]);
  const setIsLoading = useContext(LoaderContext);

  async function getBlogs() {
    const res = await getSubSubCollectionDocs({
      colRef: 'common_pages',
      docID: sectionId,
      subColRef: 'sub_pages',
      subDocID: blogsId,
      subSubColRef: 'blogs',
    });
    const completeData = [];
    for (const blog of res) {
      const images = await getImages(blog.id);
      completeData.push({blog, images});
    }
    setBlogs(completeData);
  }

  useEffect(() => {
    getBlogs();
  }, [sectionId, blogsId]);
  return (
      <main className={'blogs'}>
        {blogs.map((el, index) => (
            <SmallBlock sectionId={sectionId} blogsId={blogsId} data={el.blog} imgUrl={el.images[0].url} key={index} />
        ))}
      </main>
  );
}
