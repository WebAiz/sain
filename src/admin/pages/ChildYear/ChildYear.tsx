// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {db, storage} from '../../../firebase';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {ADMIN_ROUTES} from '../../../constants';
import {useNavigate} from 'react-router-dom';

type Props = {};

export function ChildYear(props: Props) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const navigate = useNavigate();

  function getImgList() {
    const listRef = ref(storage, 'child_year');
    listAll(listRef)
      .then(async (res) => {
        const url = await await getImgUrl(res.items[0].name);
      }).catch((error) => {
      console.log('Uh-oh, an error occurred!');
    });
  }

  async function getImgUrl(name) {
    const starsRef = ref(storage, `child_year/${name}`);
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
    navigate(ADMIN_ROUTES.DOCS + `child_year`);
  };

  function uploadImage(img) {
    if (!img) return;
    const imgType = img.type.split('/')[1];
    const storageRef = ref(storage, `child_year/child_year.${imgType}`);
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
    const docRef = doc(db, 'child_year', 'child_year');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.name);
      setDescription(data.description);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  function setData() {
    // Add a new document in collection "cities"
    setDoc(doc(db, 'child_year', 'child_year'), {
      name, description,
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
      <h2>?????? ??????????</h2>
      <section className={'col'}>
        <div className="images__upload mb">
          <img src={image} alt="uploaded file" height={200}/>
        </div>
        <div className={'col sb mb'}>
          <label htmlFor="">??????????????????</label>
          <input className="mb" type="text" disabled={isDisabled} value={name}
                 onChange={(e) => setName(e.target.value)}/>
          <label htmlFor="">????????????????</label>
          <input className="mb" type="text" disabled={isDisabled}
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}/>
          {isDisabled &&
            <button onClick={() => handleEditClick()}>?????????????????????????? ????????????</button>}
          {!isDisabled && <button onClick={() => saveEdit()}>??????????????????</button>}
        </div>
        <button className={'mb p-10'} onClick={() => goToDocPage()}>????????????????
          ??????????????????
        </button>
        <label htmlFor="image">?????????????????????????? ??????????????</label>
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
};