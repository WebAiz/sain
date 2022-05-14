// @flow
import * as React            from 'react';
import {
    deleteObject, getDownloadURL, ref,
    uploadBytesResumable, listAll
}                            from 'firebase/storage';
import {storage}             from '../../firebase';
import {useEffect, useState} from 'react';
import {useParams}           from 'react-router-dom';

type Props = {};

export function Images(props: Props) {
    const [images, setImages] = useState([]);
    const [uploadImgUrls, setUploadImgUrls] = useState([]);
    const [progressPercent, setProgressPercent] = useState(0);
    const {slug} = useParams();

    const deleteImg = (imgName) => {
        const desertRef = ref(storage, `${slug}/${imgName}`);
        deleteObject(desertRef).then(() => {
            alert('File deleted successfully');
            window.location.reload()
        }).catch((error) => {
            alert('Uh-oh, an error occurred!');
        });
    };

    const uploadImages = (images) => {
        console.log('FILEs', images);
        const uploadedImages = [];
        for (const img of images) {
            if (!img) return;
            const storageRef = ref(storage, `${slug}/${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        uploadedImages.push(downloadURL);
                    });
                }
            );
        }
        setUploadImgUrls(uploadedImages);

    };
    const handleImgChange = (e) => {
        if (e.target.files) {
            if (e.target.files.length + images.length > 8) {
                alert('MAX 8 images');
            } else {
                uploadImages(e.target.files);
            }
        }
    };

    const getImages = (blogID) => {
        const listRef = ref(storage, slug);
        listAll(listRef)
            .then(async (res) => {
                const imgList = []
                for (const itemRef of res.items) {
                    const url = await getImgUrl(itemRef.name);
                    imgList.push({name: itemRef.name, url})
                }
                setImages(imgList)
            }).catch((error) => {
           alert('Uh-oh, an error occurred!');
        });
    };

    async function getImgUrl(imgName) {
        const starsRef = ref(storage, `${slug}/${imgName}`);
        return await getDownloadURL(starsRef);
    }

    useEffect(() => {
        getImages(slug);
    }, []);
    return (
        <div>
            <section className={'images__list'}>
                {images.map((img) => (
                    <div className={"row sb"} key={img.name}>
                        <p>{img.name}</p>
                        <img src={img.url} alt="" height={"100px"}/>
                        <button onClick={() => deleteImg(img.name)}>DELETE</button>
                    </div>
                ))}
            </section>
            <section className={'images__control'}>
                <input multiple name="files" type="file" onChange={handleImgChange} />
                {!!uploadImgUrls.length &&
                    <div className="images__upload">
                        {uploadImgUrls.map(url => (
                            <img src={url} alt="uploaded file" height={200} />
                        ))}
                    </div>}
                {!uploadImgUrls.length && (
                    <div className="outerbar">
                        <div className="innerbar" style={{width: `${progressPercent}%`}}>
                            {progressPercent}%
                        </div>
                    </div>
                )}
            </section>

        </div>
    );
};