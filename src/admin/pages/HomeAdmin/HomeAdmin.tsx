// @flow
import * as React from 'react';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {ADMIN_ROUTES} from '../../../constants';
import {useNavigate} from 'react-router-dom';
type Props = {};

export function HomeAdmin(props: Props) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [isDisabled, setIsDisabled] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const navigate = useNavigate()

  function getImgList() {
    const listRef = ref(storage, 'home');
    listAll(listRef)
      .then(async (res) => {
        const url = await await getImgUrl(res.items[0].name);
      }).catch((error) => {
      console.log('Uh-oh, an error occurred!');
    });
  }

  async function getImgUrl(name) {
    const starsRef = ref(storage, `home/${name}`);
    const url = await getDownloadURL(starsRef);
    setImage(url);
  }

  const handleEditClick = () => {
    setIsDisabled(false);
  };

  const saveEdit = () => {
    setIsDisabled(true);
    setData();
  };
  const handleImg = (e) => {
    if (e.target.files) {
      uploadImage(e.target.files[0]);
    }
  };

  const goToDocPage = () => {
    navigate(ADMIN_ROUTES.DOCS + `home`);
  };

  function uploadImage(img) {
    if (!img) return;
    const imgType = img.type.split('/')[1];
    const storageRef = ref(storage, `home/home${imgType}`);
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
          setImage(downloadURL);
        });
      }
    );
  }

  async function getName() {
    const docRef = doc(db, 'home', 'home');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.name);
      setDescription(data.description)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  function setData() {
    // Add a new document in collection "cities"
    setDoc(doc(db, 'home', 'home'), {
      name, description
    }).then(res => {
      alert('Data successfully updated');
      window.location.reload();
    });
  }

  useEffect(() => {
    getName();
    getImgList();
  }, []);
  return (
    <main className={'childYear'}>
      <h2>Начальная страница</h2>
      <section className={'col'}>
        <div className="images__upload mb">
          <img src={image} alt="uploaded file" height={200} />
        </div>
        <div className={'col sb mb'}>
          <label htmlFor="">Заголовок</label>
          <input className='mb' type="text" disabled={isDisabled} value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">Описание</label>
          <input className='mb' type="text" disabled={isDisabled} value={description} onChange={(e) => setDescription(e.target.value)} />
          {isDisabled && <button onClick={() => handleEditClick()}>Редактировать</button>}
          {!isDisabled && <button onClick={() => saveEdit()}>Сохранить</button>}
        </div>
        <button onClick={() => goToDocPage()}>Добавить документы
        </button>
        <label htmlFor="image">Редактировать картину</label>
        <input type="file" onChange={(e) => handleImg(e)}></input>
        {!image.length && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progressPercent}%` }}>
              {progressPercent}%
            </div>
          </div>
        )}
      </section>
    </main>
  );
};