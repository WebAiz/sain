// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {addSubSubCollectionDoc, editSubSubCollectionDoc, getSubSubCollectionDocs} from '../../../helper';
import {useNavigate, useParams} from 'react-router-dom';
import './BlogsPage.scss';
import {ADMIN_ROUTES} from '../../../constants';

type Props = {};

export function BlogsPage(props: Props) {
  const [blogList, setBlogList] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const {slug, subSlug} = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>({
    title: '',
    description: '',
  });
  const addBlog = async () => {
    if (blog.title && blog.description) {
      const docRef = await addSubSubCollectionDoc({
        colRef: 'common_pages',
        docID: slug,
        subColRef: 'sub_pages',
        subDocID: subSlug,
        subSubColRef: 'blogs',
        subSubData: {title: blog.title, description: blog.description},
      });
      window.location.reload();
    }
  };
  const handleEditClick = (blog) => {
    setBlog(blog);
    setOpenEdit(true);
    setIsEditMode(true);
  };

  function getBlogs() {
    getSubSubCollectionDocs({
      colRef: 'common_pages',
      docID: slug,
      subColRef: 'sub_pages',
      subDocID: subSlug,
      subSubColRef: 'blogs',
    }).then((res) => setBlogList(res));
  }

  const editBlog = () => {
    editSubSubCollectionDoc({
      colRef: 'common_pages',
      docID: slug,
      subColRef: 'sub_pages',
      subDocID: subSlug,
      subSubColRef: 'blogs',
      subSubDocRef: blog.id,
      subSubData: {title: blog.title, description: blog.description},
    }).then(() => setOpenEdit(false));
    window.location.reload();
  };
  const goToImagesPage = (blog) => {
    navigate(ADMIN_ROUTES.IMAGES + `${blog.id}`);
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
      <main className={'subPage'}>
        <h1>Блоги</h1>
        <section className="list mb ">
          <div className={'blog-row sb mb-10 p-10 bg-gray'}>
            {/*<img src={blog.img[0]} alt="blog" />*/}
            <span>Заголовок</span>
            <span>Описание</span>
            <div></div>
          </div>
          {blogList.map((blog, index) => (
              <div key={index} className={'blog-row  sb mb-10 p-10 bg-gray'}>
                {/*<img src={blog.img[0]} alt="blog" />*/}
                <span>{blog.title}</span>
                <span>{blog.description}</span>
                <button onClick={() => handleEditClick(blog)}>Редактировать</button>
                <button onClick={() => goToImagesPage(blog)}>Настроить картины</button>
              </div>
          ))}
        </section>
        <button className={'mb'} onClick={() => setOpenEdit(true)}>
          Добавить блог
        </button>
        {openEdit && (
            <section>
              <div className={'form col border'}>
                <label htmlFor="">Заголовок</label>
                <input type="text" value={blog.title}
                       onChange={(e) => setBlog({...blog, title: e.target.value})} />
                <label htmlFor="">Описание</label>

                <textarea value={blog.description}
                          onChange={(e) => setBlog({...blog, description: e.target.value})} />

                {!isEditMode && <button onClick={addBlog}>Добавить</button>}
                {isEditMode && <button onClick={editBlog}>Сохранить</button>}
              </div>
            </section>
        )}
      </main>
  );
}
