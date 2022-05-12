// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import { addSubSubCollectionDoc, editSubSubCollectionDoc, getSubSubCollectionDocs } from '../../../helper';
import { useParams } from 'react-router-dom';
import './BlogsPage.scss';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';

type Props = {};

export function BlogsPage(props: Props) {
    let image = null;
    const [blogList, setBlogList] = useState<any>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [blog, setBlog] = useState<any>({
        title: '',
        description: '',
    });
    const [openEdit, setOpenEdit] = useState(false);
    const { slug, subSlug } = useParams();

    const handleImgChange = (e) => {
        image = e.target.files[0];

        if (!image) return;
    };

    const uploadImages = (docRef) => {
        console.log('FILE', image);
        if (!image) return;
        const storageRef = ref(storage, `${docRef}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    };

    const addBlog = async () => {
        if (blog.title && blog.description) {
            const docRef = await addSubSubCollectionDoc({
                colRef: 'common_pages',
                docID: slug,
                subColRef: 'sub_pages',
                subDocID: subSlug,
                subSubColRef: 'blogs',
                subSubData: { title: blog.title, description: blog.description },
            });
            // create folder with Id of docRed.id
            uploadImages(docRef);
        }
    };
    const handleEditClick = (blog) => {
        setBlog(blog);
        setOpenEdit(true);
        setIsEditMode(true);
    };

    function getBlogs() {
        getSubSubCollectionDocs({
            colRef: 'common_pages',
            docID: slug,
            subColRef: 'sub_pages',
            subDocID: subSlug,
            subSubColRef: 'blogs',
        }).then((res) => setBlogList(res));
    }

    const editBlog = () => {
        editSubSubCollectionDoc({
            colRef: 'common_pages',
            docID: slug,
            subColRef: 'sub_pages',
            subDocID: subSlug,
            subSubColRef: 'blogs',
            subSubDocRef: blog.id,
            subSubData: { title: blog.title, description: blog.description },
        }).then(() => setOpenEdit(false));
    };
    useEffect(() => {
        getBlogs();
    }, []);
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
            <button className={'mb'} onClick={() => setOpenEdit(true)}>
                Добавить блог
            </button>
            {openEdit && (
                <section>
                    <div className={'form border'}>
                        <label htmlFor="">Заголовок</label>
                        <input type="text" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
                        <label htmlFor="">Описание</label>
                        <textarea value={blog.description} onChange={(e) => setBlog({ ...blog, description: e.target.value })} />
                        <input multiple name="files" type="file" onChange={handleImgChange} />
                        {!isEditMode && <button onClick={addBlog}>Добавить</button>}
                        {isEditMode && <button onClick={editBlog}>Сохранить</button>}

                        {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
                        {!imgUrl && (
                            <div className="outerbar">
                                <div className="innerbar" style={{ width: `${progresspercent}%` }}>
                                    {progresspercent}%
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </main>
    );
}
