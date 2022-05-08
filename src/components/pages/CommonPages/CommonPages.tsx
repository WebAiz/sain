// @flow
import * as React                                                     from 'react';
import {useNavigate, useParams,}                                      from 'react-router-dom';
import {useEffect, useState}                                          from 'react';
import {collection, doc, getDoc, getDocs, query, where, getFirestore} from 'firebase/firestore';
import {db}                                                           from '../../../firebase';

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
    lists: list[],
    name: string
}

interface SubPage {
    title: string,
    description: string,
    image: unknown | null
}

export function CommonPages() {
    const [subPageOpen, setSubPageOpen] = useState(false);
    const [newSubPage, setNewSubPage] = useState<SubPage>({
        title:       '',
        description: '',
        image:       null
    });
    const [data, setData] = useState<PagesData>({
        slug:  '',
        lists: [],
        name:  ''
    });
    const {slug} = useParams();
    const navigate = useNavigate();

    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, 'common-pages'));
        const arr:any = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            arr.push({
                id: doc.id,
                ...doc.data()
            });
        });
        console.log("DATA",arr)
    }

    async function fetchCommonPages(slug: string = '') {
        try {
            const querySnapshot = await getDocs(collection(db, 'common-pages'));
            const arr:any = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                arr.push({
                    slug: doc.id,
                    ...doc.data()
                });
            });
        } catch (err) {
            console.error(err);
        }
    }

    function goToSubPage(url: string) {
        navigate(`pages/${data.slug}/${url}`);
    }

    function addSubPage() {
        // add to collection
    }

    function setImage(e: any) {

    }

    useEffect(() => {
        fetchCommonPages(slug);
    });
    return (
        <main className={'commonPages'}>
            commonPages
            <h2>{data.name}</h2>
            <div className="commonPages__list">
                {data.lists.map((list) => (
                    <div onClick={() => goToSubPage(list.slug)} key={list.id}>{list.name}</div>
                ))}
            </div>
            <section>
                <button className={'mb'} onClick={() => setSubPageOpen(true)}>Add SubPage</button>
                {subPageOpen && <div className={'form'}>

                    <label htmlFor="">Title</label>
                    <input type="text" value={newSubPage.title} />
                    <label htmlFor="">Description</label>
                    <textarea name="subpage" id="subpage" value={newSubPage.description} />
                    <label htmlFor="">Choose Image</label>
                    <input type="file" onChange={setImage} />
                </div>}
            </section>
        </main>
    );
};