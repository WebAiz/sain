// @flow
import * as React                     from 'react';
import {DropDown}                     from '../common/DropDown/DropDown';
import './Sidebar.scss';
import {logout}                       from '../../firebase';
import {useEffect, useState}          from 'react';
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
    function getData(){
        getCollectionDocs('common_pages').then((res) => setPages(res));
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <section className={'sidebar'}>
            <div className="sidebar__links">
                <a href="/">Главная страница</a>
                <h3>Общие Разделы</h3>
                <DropDown data={pages} />
                <button onClick={() => setAddPageOpen(true)}>Добавить общий Раздел</button>
                {addPageOpen && <div>
                    <input type="text" value={newPage} onChange={(e) => setNewPage(e.target.value)} />
                    <button onClick={addNewPage}>Add new Page</button>
                </div>}
                <div className={'col border'}>
                    <h3>Отдельные Разделы</h3>
                    <a href="/stuff">Stuff</a>
                    <a href="/child-year">Child Year</a>
                    <a href="contacts">Contacts</a>
                </div>

            </div>
            <button onClick={logout} className="logOut">Выйти</button>
        </section>
    );
};