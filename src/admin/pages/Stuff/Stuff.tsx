import {useEffect, useState} from 'react';
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {storage} from '../../../firebase';
import {addNewDoc, editDoc, getCollectionDocs} from '../../../helper';
import Modal from '../../../components/Modal';

type Props = {};

export async function getStuffImgUrl(id, name) {
  const starsRef = ref(storage, `stuff/${id}/${name}`);
  return await getDownloadURL(starsRef);
}

export async function getImages(docID) {
  const listRef = ref(storage, `stuff/${docID}`);
  return await listAll(listRef)
    .then(async (res) => {
      if (res.items && res.items[0] && res.items[0].name) {
        const imgUrl = await getStuffImgUrl(docID, res.items[0].name);
        const imgName = res.items[0].name;
        return {imgUrl, imgName};
      }
      return {imgUrl: '', imgName: ''};
    })
    .catch((error) => {
      console.log('Uh-oh, an error occurred!');
      return {imgUrl: '', imgName: ''};
    });
}

export async function getStuffs(setCb) {
  const newArr = [];
  await getCollectionDocs('stuff').then(async list => {
    for (const item of list) {
      const {imgUrl, imgName} = await getImages(item.id);
      newArr.push({...item, imgUrl, id: item.id, imgName});
    }
  });
  setCb(newArr);
}

export function Stuff(props: Props) {
  const [stuffs, setStuffs] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    full_name: '',
    description: '',
    imgUrl: null,
    id: '',
    img: null,
    imgName: '',
  });
  const [progressPercent, setProgressPercent] = useState(0);
  const [data, setData] = useState({
    fullName: '',
    description: '',
    img: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addNewDoc('stuff', {
      full_name: data.fullName,
      description: data.description,
    });
    if (docRef.id) alert('Data successfully Added');
    if (data.img) uploadImage(docRef.id, data.img, 'stuff.png');
    else alert('Error with IMG');

    resetData();
  };


  const saveEdit = async (e) => {
    e.preventDefault();
    await editDoc('stuff', editData.id, {
      full_name: editData.full_name,
      description: editData.description,
    });
    if (editData.img) uploadImage(editData.id, editData.img, editData.imgName);

    resetData();
  };

  function resetData() {
    setData({
      fullName: '',
      description: '',
      img: null,
    });
    setAddMode(false);
  }

  function handleEditChange(value: string, field: string) {
    switch (field) {
      case 'fullname': {
        setEditData({...editData, full_name: value});
        break;
      }
      case 'description': {
        setEditData({...editData, description: value});
        break;
      }
    }
  }

  function handleChange(value: string, field: string) {
    switch (field) {
      case 'fullname': {
        setData({...data, fullName: value});
        break;
      }
      case 'description': {
        setData({...data, description: value});
        break;
      }
    }
  }

  const handleImg = (e) => {
    if (e.target.files) {
      setData({...data, img: e.target.files[0]});
    }
  };
  const handleEditImg = (e) => {
    if (e.target.files) {
      setEditData({...editData, img: e.target.files[0]});
    }
  };


  function uploadImage(docID, img, name) {
    const imgName = name || img.name;

    console.log('uploadImage', imgName);
    if (!img) return;
    const storageRef = ref(storage, `stuff/${docID}/${imgName}`);
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
          setImageUrl(downloadURL);
        });
      },
    );
  }

  function editStuff(stuff) {
    setEditData(stuff);
    setEditMode(true);
  }


  useEffect(() => {
    getStuffs(setStuffs);
  }, []);

  return (
    <main className={'stuff'}>
      <h2>????????????????????</h2>
      <section className="mb border p-10">
        {stuffs.map((stuff, index) => (
          <div className="row sb bg-gray mb-10" key={index}>
            <img src={stuff.imgUrl} alt="avatar" height={200} width={150}/>
            <div>{stuff.full_name}</div>
            <div>{stuff.description}</div>
            <button onClick={() => editStuff(stuff)}>??????????????????????????</button>
          </div>
        ))}

      </section>
      <button onClick={() => setAddMode(true)}>???????????????? ???????????? ????????????????????
      </button>
      {addMode &&
        <Modal onClose={() => setAddMode(!addMode)}>
          <form onSubmit={handleSubmit} className="form border p-10">
            <h2>???????????????????? ???????????? ??????????????????</h2>
            <div className="form__body">
              <div className="form__field">
                <label htmlFor="address">??????</label>
                <input
                  onChange={(e) => handleChange(e.target.value, 'fullname')}
                  value={data.fullName}
                  name="fullName"
                  id="fullName"
                  placeholder="fullName"
                  required
                  minLength={3}
                />
              </div>
              <div className="form__field">
                <label htmlFor="address">????????????????</label>
                <textarea
                  onChange={(e) => handleChange(e.target.value, 'description')}
                  value={data.description}
                  name="description"
                  id="description"
                  placeholder="description"/>
              </div>
            </div>
            <label htmlFor="img">???????????????? ??????????????</label>
            <input type="file" onChange={(e) => handleImg(e)}/>
            {!imageUrl.length && (
              <div className="outerbar">
                <div className="innerbar"
                     style={{width: `${progressPercent}%`}}>
                  {progressPercent}%
                </div>
              </div>
            )}
            {!!imageUrl.length &&
              <div className="images__upload">
                <img src={imageUrl} alt="uploaded file" height={200}
                     width={100}/>
              </div>}
            <button className={'big-btn'} type="submit">???????????????? ????????????
              ????????????????????
            </button>
          </form>
        </Modal>}
      {editMode && <Modal onClose={() => setEditMode(false)}>
        <form onSubmit={saveEdit} className="form border">
          <h2>???????????????? ???????????? ??????????????????????</h2>
          <div className="form__body">
            <div className="form__field">
              <label htmlFor="address">??????</label>
              <input
                onChange={(e) => handleEditChange(e.target.value, 'fullname')}
                value={editData.full_name}
                name="fullName"
                id="fullName"
                placeholder="fullName"
                required
                minLength={3}
              />
            </div>
            <div className="form__field">
              <label htmlFor="address">????????????????</label>
              <textarea
                onChange={(e) => handleEditChange(e.target.value, 'description')}
                value={editData.description}
                name="description"
                id="description"
                placeholder="description"/>
            </div>
          </div>
          <img src={editData.imgUrl} alt="" height={200}/>
          <label htmlFor="img">???????????????? ??????????????</label>
          <input type="file" onChange={(e) => handleEditImg(e)}/>
          {!imageUrl.length && (
            <div className="outerbar">
              <div className="innerbar" style={{width: `${progressPercent}%`}}>
                {progressPercent}%
              </div>
            </div>
          )}
          {!!imageUrl.length &&
            <div className="images__upload">
              <img src={imageUrl} alt="uploaded file" height={200}/>
            </div>}
          <button className='big-btn' type="submit">??????????????????</button>
        </form>
      </Modal>}
    </main>
  );
}
