// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../../constants';
import {
  addSubCollectionDoc,
  deleteSubCollectionDoc,
  editSubCollectionDoc,
  getSubCollectionDocs,
} from '../../../helper';
import Modal from '../../../components/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'

export interface list {
  id: number,
  name: string,
  slug: string,
  text: string,
  images: Img[]
}

export interface Img {
  url: string,
}

interface Page {
  name: string,
  id?: ''
}

export function CommonPages() {
  const [openForm, setOpenForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [docs, setDocs] = useState<Page[]>([]);
  const [subPage, setSubPage] = useState<Page>({
    name: '',
  });
  const { slug } = useParams();

  const saveEdit = () => {
    if (subPage.name) {
      editSubCollectionDoc({
        colRef: 'common_pages',
        docID: slug || '',
        subColRef: 'sub_pages',
        subDocID: subPage.id,
        subDocData: { name: subPage.name },
      }).then((res) => {
        setIsEditMode(false);
        setSubPage({ name: '' });
        setOpenForm(false);
        getData();
      });
    }
  };
  const addSubPages = () => {
    if (subPage.name) {
      addSubCollectionDoc({
        colRef: 'common_pages',
        docID: slug || '',
        subColRef: 'sub_pages',
        subDocData: { name: subPage.name },
      })
        .then((res) => {
          setOpenForm(false);
          getSubCollectionDocs({
            colRef: 'common_pages',
            docID: slug || '',
            subColRef: 'sub_pages',
          }).then(res => setDocs(res));
        });
    }
  };
  const handleEditClick = (page) => {
    setSubPage(page);
    setOpenForm(true);
    setIsEditMode(true);
  };
  const handleAddClick = () => {
    setSubPage({ name: '' });
    setIsEditMode(false);
    setOpenForm(true);
  };
  const handleDeleteClick = (page) => {
    deleteSubCollectionDoc({
      colRef: 'common_pages',
      docID: slug || '',
      subColRef: 'sub_pages',
      subDocID: page.id,
    })
    getData();
    alert('Удален ')
  }

  function getData() {
    getSubCollectionDocs({
      colRef: 'common_pages',
      docID: slug || '',
      subColRef: 'sub_pages',
    }).then(res => setDocs(res));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={'commonPages'}>
      <h2>Подразделы</h2>
      <section className="commonPages__list col mb">
        {docs.map((page, index) => (
          <div className={'row sb mb-10 bg-gray p-10'} key={index}>
            <a href={ADMIN_ROUTES.PAGES + slug + '/' + page.id}>{page.name}</a>
            <div>
              <EditIcon onClick={() => handleEditClick(page)} />
              <DeleteIcon onClick={() => handleDeleteClick(page)} />
            </div>
          </div>
        ))}
      </section>
      <button className={'mb'} onClick={handleAddClick}>Добавить подразделы
      </button>
      {openForm && <Modal onClose={() => setOpenForm(false)}>
        <div className={'col sb border p-10'}>
          <input placeholder={'название подраздела'} className={'mb'} type="text" value={subPage.name}
            onChange={(e) => setSubPage({
              ...subPage,
              name: e.target.value,
            })} />
          {!isEditMode && <button onClick={addSubPages}>Добавить новый подраздел</button>}
          {isEditMode &&
            <button onClick={saveEdit}>Сохранить изменения</button>}
        </div>
      </Modal>}
    </main>
  );
}
