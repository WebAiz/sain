// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  addSubSubCollectionDoc,
  deleteSubSubCollectionDoc,
  editSubSubCollectionDoc,
  getSubSubCollectionDocs,
} from '../../../helper';
import { useNavigate, useParams } from 'react-router-dom';
import './BlogsPage.scss';
import { ADMIN_ROUTES } from '../../../constants';
import Modal from '../../../components/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {};

export function BlogsPage(props: Props) {
  const [blogList, setBlogList] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { slug, subSlug } = useParams();
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
        subSubData: { title: blog.title, description: blog.description },
      });
      setOpenEdit(false);
      getBlogs();
    }
  };
  const handleEditClick = (blog) => {
    setBlog(blog);
    setOpenEdit(true);
    setIsEditMode(true);
  };
  const handleDeleteClick = (blog) => {
    deleteSubSubCollectionDoc({
      colRef: 'common_pages',
      docID: slug,
      subColRef: 'sub_pages',
      subDocID: subSlug,
      subSubColRef: 'blogs',
      subSubDocID: blog.id
    }).then(() => alert("удален"))
    getBlogs();
  }
  const handleAddClick = () => {
    setIsEditMode(false);
    setOpenEdit(true);
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
      subSubData: { title: blog.title, description: blog.description },
    }).then(() => {
      setOpenEdit(false);
      getBlogs();
    });
  };
  const goToImagesPage = (blog) => {
    navigate(ADMIN_ROUTES.IMAGES + `${blog.id}`);
  };
  const goToDocPage = (blog) => {
    navigate(ADMIN_ROUTES.DOCS + `${blog.id}`);
  }
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
          <div key={index} className={'blog-row sb mb-10 p-10 bg-gray'}>
            {/*<img src={blog.img[0]} alt="blog" />*/}
            <span>{blog.title}</span>
            <span>{blog.description}</span>
            <div>
              <EditIcon onClick={() => handleEditClick(blog)} />
              <DeleteIcon onClick={() => handleDeleteClick(blog)} />
              <button onClick={() => goToImagesPage(blog)}>Настроить картины
              </button>
              <button onClick={() => goToDocPage(blog)}>Добавить документы
              </button>
            </div>
          </div>
        ))}
      </section>
      <button className={'mb'} onClick={handleAddClick}>
        Добавить блог
      </button>
      {openEdit && <Modal onClose={() => setOpenEdit(false)}>
        <section>
          <div className={'form col border'}>
            <label htmlFor="">Заголовок</label>
            <input type="text" value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
            <label htmlFor="">Описание</label>

            <textarea value={blog.description}
              onChange={(e) => setBlog({
                ...blog,
                description: e.target.value,
              })} />
            {!isEditMode && <button onClick={addBlog}>Добавить</button>}
            {isEditMode && <button onClick={editBlog}>Сохранить</button>}
          </div>
        </section>
      </Modal>}
    </main>
  );
}
