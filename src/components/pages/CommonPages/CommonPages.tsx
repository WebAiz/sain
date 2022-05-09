// @flow
import * as React                                                             from 'react';
import {useNavigate, useParams,}                                              from 'react-router-dom';
import {useEffect, useState}                                                  from 'react';
import {collection, doc, addDoc, getDoc, getDocs, query, where, getFirestore} from 'firebase/firestore';
import {db}                                                                   from '../../../firebase';
import {ROUTES}                                                               from '../../../contants';

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
    slug: string,
    id?: ''
}

export function CommonPages() {
    const [subPageOpen, setSubPageOpen] = useState(false);
    const [pages, setPages] = useState<Page[]>([]);
    const [page, setPage] = useState<Page>({
        name: '',
        slug: '',
    });
    const {slug} = useParams();
    const navigate = useNavigate();


    const sendData = async () => {
        // Add a new document with a generated id.
        if (page.name.length && page.slug.length) {
            const pageData = {
                name: page.name,
                slug: page.slug
            };
            const pageRef = await addDoc(collection(db, 'common_pages'), pageData);
            const subPageData = {
                page_id:     pageRef.id,
                title:       '',
                description: '',
            };
            const subPageRef = await addDoc(collection(db, 'sub_pages'), subPageData);
            getCommonPages()
        }
    };

    function getCommonPages() {
        getDocs(collection(db, 'common_pages')).then((res) => {
            const arr: any = [];
            res.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                arr.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setPages(arr);
            console.log("getPAges",arr)
        }).catch((err) => console.error(err));
    }

    function goToSubPage(url: string) {
        // navigate(`pages/${page.slug}/${url}`);
    }

    function addSubPage() {
        // add to collection
    }

    function setImage(e: any) {

    }

    useEffect(() => {
        getCommonPages();
    }, []);
    return (
        <main className={'commonPages'}>
            <h2>Common Pages</h2>
            <div className="commonPages__list">
                {pages.map((list, index) => (
                    <a href={ROUTES.SUB_PAGE + list.id} key={index}>{list.name}</a>
                ))}
            </div>
            <section>
                <button className={'mb'} onClick={() => setSubPageOpen(true)}>Add SubPage</button>
                {subPageOpen && <div className={'form'}>

                    <label htmlFor="">Title</label>
                    <input type="text" value={page.name} onChange={(e) => setPage({...page, name: e.target.value})} />
                    <label htmlFor="">slugName</label>
                    <input type="text" value={page.slug} onChange={(e) => setPage({...page, slug: e.target.value})} />
                    <button onClick={sendData}>SendData</button>
                </div>}
            </section>

        </main>
    );
};