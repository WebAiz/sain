// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {DropDown} from '../common/DropDown/DropDown';
import './Sidebar.scss';
import {logout} from '../../firebase';
import {addNewDoc, getCollectionDocs} from '../../helper';

type Props = {};

export function Sidebar(props: Props) {
  const [pages, setPages] = useState([]);
  const [addPageOpen, setAddPageOpen] = useState(false);
  const [newPage, setNewPage] = useState('');
  const addNewPage = () => {
    if (newPage.length) {
      addNewDoc('common_pages', {name: newPage}).then(res => console.log('RES', res));
      setNewPage('');
      setAddPageOpen(false);
    }
  };

  function getData() {
    getCollectionDocs('common_pages').then((res) => setPages(res));
  }

  useEffect(() => {
    console.log('SIDEBAR UPDATE');
    getData();
  }, []);
  return (
      <section className={'sidebar'}>
        <div className="sidebar__links">
          <a className={'mb'} href="/">Главная страница</a>
          <h3 className={'mb-10'}>Общие Разделы</h3>
          <DropDown data={pages} setData={setPages} />
          <button onClick={() => setAddPageOpen(true)}>Добавить общий Раздел</button>
          {addPageOpen && <div>
            <input type="text" value={newPage} onChange={(e) => setNewPage(e.target.value)} />
            <button onClick={addNewPage}>Добавить новую страницу</button>
          </div>}
          <div className={'col border'}>
            <h3>Отдельные Разделы</h3>
            <a className="mb-10" href="/admin/stuff">Сотрудники</a>
            <a className="mb-10" href="/admin/child-year">Год детей</a>
            <a className="mb-10" href="/admin/contacts">Контакты</a>
            <a className="mb-10" href="/admin/ceo">Директор садика</a>
          </div>

        </div>
        <button onClick={logout} className="logOut">Выйти</button>
      </section>
  );
}
