// @flow
import * as React          from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './DropDown.scss';
import {ADMIN_ROUTES, ROUTES} from '../../../constants';
import {useState} from 'react';
import {Modal}             from '../Modal/Modal';
import {editDoc}           from '../../../helper';

export interface Page {
    id: string,
    name: string,
}

type Props = {
    data: Page[]
}


export function DropDown({data,setData}) {
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState({
        id:   '',
        name: ''
    });
    const navigate = useNavigate();
    const handleEdit = (page: any) => {
        setOpenModal(true);
        setPage(page);
    };
    const saveEdit = () => {
        editDoc('common_pages', page.id, {name: page.name}).then((res) => {
            setOpenModal(false);
            setPage({id: '', name: ''});
            window.location.reload()
        });

    };
    return (
        <section className={'dropDown'}>
            {data.map((item, index) => (
                <div className={'row sb'} key={index}>
                    <a href={ADMIN_ROUTES.PAGES + item.id} key={index}>{item.name}</a>
                    <button onClick={() => handleEdit(item)}>Изменить</button>
                </div>

            ))}
            {openModal && <Modal>
                <div className={'edit'}>
                    <input type="text" value={page.name} onChange={(e) => setPage({...page, name: e.target.value})} />
                    <button onClick={saveEdit}>Сохранить</button>
                </div>
            </Modal>}
        </section>
    );
}
