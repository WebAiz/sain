// @flow
import * as React                                                                 from 'react';
import {useEffect, useState}                                                      from 'react';
import {addSubSubCollectionDoc, editSubSubCollectionDoc, getSubSubCollectionDocs} from '../../../helper';
import {useParams}                                                                from 'react-router-dom';
import './SubPage.scss'

type Props = {};

export function SubPage(props: Props) {
    const [blogList, setBlogList] = useState<any>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [blog, setBlog] = useState<any>({
        title:       '',
        description: '',
    });
    const [openEdit, setOpenEdit] = useState(false);
    const {slug, subSlug} = useParams();
    const addImages = (e) => {

    };
    const addBlog = () => {
        if (blog.title && blog.description) {
            addSubSubCollectionDoc({
                colRef:       'common_pages',
                docID:        slug,
                subColRef:    'sub_pages',
                subDocID:     subSlug,
                subSubColRef: 'blogs',
                subSubData:   {title: blog.title, description: blog.description}
            }).then((res) => console.log('addSubSubCollectionDoc'));
        }
    };
    const handleEditClick = (blog) => {
        setBlog(blog);
        setOpenEdit(true);
        setIsEditMode(true);
    };

    function getBlogs() {
        getSubSubCollectionDocs({
            colRef:       'common_pages',
            docID:        slug,
            subColRef:    'sub_pages',
            subDocID:     subSlug,
            subSubColRef: 'blogs',
        }).then(res => setBlogList(res));
    }

    const editBlog = () => {
        console.log('BLOG EDIT', blog);
        editSubSubCollectionDoc({
            colRef:       'common_pages',
            docID:        slug,
            subColRef:    'sub_pages',
            subDocID:     subSlug,
            subSubColRef: 'blogs',
            subSubDocRef: blog.id,
            subSubData:   {title: blog.title, description: blog.description}
        }).then(() => setOpenEdit(false));
    };
    useEffect(() => {
        getBlogs();
    });
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
                    <div key={index} className={'blog-row  sb mb-10 p-10 bg-gray'}>
                        {/*<img src={blog.img[0]} alt="blog" />*/}
                        <span>{blog.title}</span>
                        <span>{blog.description}</span>
                        <button onClick={() => handleEditClick(blog)}>Редактировать</button>
                    </div>
                ))}
            </section>
            <button className={'mb'} onClick={() => setOpenEdit(true)}>Добавить блог</button>
            {openEdit && <section>
                <div className={'form border   '}>
                    <label htmlFor="">Заголовок</label>
                    <input type="text" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})} />
                    <label htmlFor="">Описание</label>
                    <textarea value={blog.description}
                           onChange={(e) => setBlog({...blog, description: e.target.value})} />
                    {/*<input type="file" onChange={addImages} />*/}
                    {!isEditMode && <button onClick={addBlog}>Добавить</button>}
                    {isEditMode && <button onClick={editBlog}>Сохранить</button>}
                </div>
            </section>}
        </main>
    );
};