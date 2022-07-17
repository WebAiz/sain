// @flow
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DropDown.scss';
import { ADMIN_ROUTES } from '../../../constants';
import { Modal } from '../Modal/Modal';
import { deleteCollectionDoc, editDoc } from '../../../helper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export interface Page {
  id: string,
  name: string,
  setData: any
}

export function DropDown({ data, getData }) {
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState({
    id: '',
    name: '',
  });
  const handleEdit = (page: any) => {
    setOpenModal(true);
    setPage(page);
  };
  const saveEdit = () => {
    editDoc('common_pages', page.id, { name: page.name }).then((res) => {
      setOpenModal(false);
      setPage({ id: '', name: '' });
      getData()
    });

  };
  const deleteItem = (page) => {
    deleteCollectionDoc('common_pages', page.id);
    alert("Удален")
    getData()
  }
  return (
    <section className={'dropDown'}>
      {data.map((item, index) => (
        <div className={'row sb'} key={index}>
          <a href={ADMIN_ROUTES.PAGES + item.id} key={index}>{item.name}</a>
          <div>
            <EditIcon onClick={() => handleEdit(item)} />
            <DeleteIcon onClick={() => deleteItem(item)} />
          </div>
        </div>
      ))}
      {openModal && <Modal>
        <div className={'edit'}>
          <input type="text" value={page.name} onChange={(e) => setPage({ ...page, name: e.target.value })} />
          <button onClick={saveEdit}>Сохранить</button>
        </div>
      </Modal>}
    </section>
  );
}
