// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {getDownloadURL, listAll, ref, uploadBytesResumable} from 'firebase/storage';
import {db, storage} from '../../../firebase';
import {doc, getDoc, setDoc} from 'firebase/firestore';

type Props = {};

export function CEO(props: Props) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  function getImgList() {
    const listRef = ref(storage, 'ceo');
    listAll(listRef)
        .then(async (res) => {
          const url = await getImgUrl(res.items[0].name);
        }).catch((error) => {
      alert('Uh-oh, an error occurred!');
    });
  }

  async function getImgUrl(name) {
    const starsRef = ref(storage, `ceo/${name}`);
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

  function uploadImage(img) {
    if (!img) return;
    const imgType = img.type.split('/')[1];
    const storageRef = ref(storage, `ceo/ceo.${imgType}`);
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
        },
    );
  }

  async function getName() {
    const docRef = doc(db, 'ceo', 'ceo');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.name);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  function setData() {
    // Add a new document in collection "cities"
    setDoc(doc(db, 'ceo', 'ceo'), {
      name,
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
      <main>
        <h1>Директор Садика</h1>
        <section className={'col'}>
          <div className="images__upload">
            <img src={image} alt="uploaded file" height={200} />
          </div>
          <div className={'row sb mb'}>
            <label htmlFor="">ФИО директора</label>
            <input type="text" disabled={isDisabled} value={name} onChange={(e) => setName(e.target.value)} />
            {isDisabled && <button onClick={() => handleEditClick()}>Редактировать ФИО</button>}
            {!isDisabled && <button onClick={() => saveEdit()}>Сохранить</button>}
          </div>

          <label htmlFor="image">Редактировать картину</label>
          <input type="file" onChange={(e) => handleImg(e)}></input>
          {!image.length && (
              <div className="outerbar">
                <div className="innerbar" style={{width: `${progressPercent}%`}}>
                  {progressPercent}%
                </div>
              </div>
          )}
        </section>
      </main>
  );
}
