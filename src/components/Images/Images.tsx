// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from '../../firebase';
import {useParams} from 'react-router-dom';

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
      window.location.reload();
    }).catch((error) => {
      alert('Uh-oh, an error occurred!');
    });
  };

  const uploadImages = (images) => {
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
          },
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

  async function fetchImages() {
    const images = await getImages(slug);
    setImages(images);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
      <div>
        <section className={'images__list'}>
          {images.map((img) => (
              <div className={'row sb'} key={img.name}>
                <p>{img.name}</p>
                <img src={img.url} alt="" height={'100px'} />
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
}

export async function getImgUrl(blogId, imgName) {
  const starsRef = ref(storage, `${blogId}/${imgName}`);
  return await getDownloadURL(starsRef);
}

export async function getImages(blogID) {
  const listRef = ref(storage, blogID);
  const images = await listAll(listRef)
      .then(async (res) => {
        const imgList = [];
        for (const itemRef of res.items) {
          const url = await getImgUrl(blogID, itemRef.name);
          imgList.push({name: itemRef.name, url});
        }
        return imgList;
      }).catch((error) => {
        alert('Uh-oh, an error occurred!');
        return [];
      });
  return images;
}
