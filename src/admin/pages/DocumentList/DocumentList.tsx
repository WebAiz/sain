// @flow
import * as React from 'react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {storage} from '../../../firebase';
import {getImages} from '../../../components/Images/Images';

type Props = {};

export function DocumentList(props: Props) {
  const [docs, setDocs] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const {blogId} = useParams();

  async function fetchDocs() {
    const docs = await getImages(`${blogId}-file`);
    setDocs(docs);
  }

  const deleteDoc = (fileName) => {
    const desertRef = ref(storage, `${blogId}-file/${fileName}`);
    deleteObject(desertRef).then(() => {
      alert('Файл удален');
      fetchDocs();
    }).catch((error) => {
      alert('Ошибка!');
    });
  };

  const handleChange = (e) => {
    if (e.target.files) {
      uploadFiles(e.target.files);
    }
  };

  const uploadFiles = (files) => {
    const uploadedImages = [];
    for (const file of files) {
      if (!file) return;
      const storageRef = ref(storage, `${blogId}-file/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgressPercent(progress);
          fetchDocs();
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
  };
  return (
    <div className={'col'}>
      {docs.map((doc) => (
        <div className={'row sb'} key={doc.name}>
          <a href={doc.url}>{doc.name}</a>
          <button onClick={() => deleteDoc(doc.name)}>DELETE</button>
        </div>
      ))}

      <div className={'col'}>
        <label htmlFor="img">Добавить Файлы</label>
        <input id={'img'} multiple name="files" type="file"
               onChange={handleChange}/>
      </div>
      <div>Файл загружен на {progressPercent} %</div>
    </div>
  );
};