// @flow
import * as React        from 'react';
import {DropDown, Pages} from '../common/DropDown/DropDown';
import "./Sidebar.scss"
import {logout}          from '../../firebase';

type Props = {};

const commPages: Pages = {
    title: 'Общие Страницы',
    lists: [{
        slug: 'news',
        name: 'Китап'
    }]
};

const uniquePages: Pages = {
    title: 'Страницы',
    lists: [{
        slug: 'stuff',
        name: 'сотрудники'
    }]
};

export function Sidebar(props: Props) {
    return (
        <section className={"sidebar"}>
            <div className="sidebar__links">
                <a href="/dashboard">Главная страница</a>
                <DropDown data={commPages} />
                <div className={"col border"}>
                    <h3>Отдельные страницы</h3>
                    <a href="/stuff">Stuff</a>
                    <a href="/child-year">Child Year</a>
                    <a href="contacts">Contacts</a>
                </div>

            </div>
            <button onClick={logout} className="logOut">Выйти</button>
        </section>
    );
};