// @flow
import * as React                                                                     from 'react';
import {useNavigate, useParams,}                                                      from 'react-router-dom';
import {useEffect, useState}                                                          from 'react';
import {collection, doc, addDoc, getDoc, setDoc, getDocs, query, where, getFirestore} from 'firebase/firestore';
import {db}                                                              from '../../../firebase';
import {ADMIN_ROUTES} from '../../../constants';
import {addSubCollectionDoc, editSubCollectionDoc, getSubCollectionDocs} from '../../../helper';
import {Modal}                                                                        from '../../../components/common/Modal/Modal';

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

interface PagesData {
    slug: string,
    name: string,

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
    const {slug} = useParams();
    const navigate = useNavigate();


    function goToSubPage(url: string) {
        // navigate(`pages/${page.slug}/${url}`);
    }

    const saveEdit = () => {
        if (subPage.name) {
            editSubCollectionDoc({
                colRef:     'common_pages',
                docID:      slug || '',
                subColRef:  'sub_pages',
                subDocID:   subPage.id,
                subDocData: {name: subPage.name},
            }).then((res) => {
                setIsEditMode(false);
                setSubPage({name: ''});
                setOpenForm(false);
                getData();
            });
        }
    };
    const addSubPages = () => {
        if (subPage.name) {
            addSubCollectionDoc({
                colRef:     'common_pages',
                docID:      slug || '',
                subColRef:  'sub_pages',
                subDocData: {name: subPage.name}
            })
                .then((res) => {
                    setOpenForm(false);
                    getSubCollectionDocs({
                        colRef:    'common_pages',
                        docID:     slug || '',
                        subColRef: 'sub_pages'
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
        setSubPage({name: ''});
        setIsEditMode(false);
        setOpenForm(true);
    };

    function getData() {
        getSubCollectionDocs({
            colRef:    'common_pages',
            docID:     slug || '',
            subColRef: 'sub_pages'
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
                        <a href={ADMIN_ROUTES.PAGES + slug + "/" + page.id}>{page.name}</a>
                        <button onClick={() => handleEditClick(page)}>Редактировать</button>
                    </div>
                ))}
            </section>
            <button className={'mb'} onClick={handleAddClick}>Добавить подразделы</button>
            {openForm && <Modal>
                <div className={'row sb border p-10'}>
                    <input type="text" value={subPage.name}
                           onChange={(e) => setSubPage({...subPage, name: e.target.value})} />
                    {!isEditMode && <button onClick={addSubPages}>Добавить</button>}
                    {isEditMode && <button onClick={saveEdit}>Сохранить изменения</button>}
                </div>
            </Modal>}
        </main>
    );
};
