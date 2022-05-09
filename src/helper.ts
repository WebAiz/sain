import {addDoc, collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore';
import {db}                                               from './firebase';

export interface GetSubDataList {
    colRef: string,
    docID: string,
    subColRef: string,
}

export interface AddSubData extends GetSubDataList {
    subDocData: Partial<any>;
}

export interface EditSubData extends GetSubData {
    subDocData: Partial<any>;
}

export interface GetSubData extends GetSubDataList {
    subDocID: string,
}

export const addNewDoc = async (colRef: string, docData: any) => {
    return await addDoc(collection(db, colRef), docData);
};

export const editDoc = async (colRef: string, docID: string, docData: any) => {
    const docRef = doc(db, colRef, docID);
    const result = await setDoc(docRef, docData);
};

export async function getCollectionDocs(colRef: string) {
    const docList: any = [];
    const docQuery = await getDocs(collection(db, colRef));
    docQuery.forEach((doc) => {
        docList.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return docList;
}

export async function getCollectionDoc(colRef: string, docID: string) {
    const docRef = await getDoc(doc(db, colRef, docID));
    console.log('getCollectionDoc', docRef.data());
    return {id: docRef.id, ...docRef.data()};
}

export async function addSubCollectionDoc(args: AddSubData) {
    const {colRef, docID, subColRef, subDocData} = args;
    const docRef = doc(collection(db, colRef, docID, subColRef));
    const docSnap = await setDoc(docRef, subDocData);
}

export async function getSubCollectionDoc(args: GetSubData) {
    const {colRef, docID, subColRef, subDocID} = args;
    const docRef = doc(db, colRef, docID, subColRef, subDocID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function getSubCollectionDocs({colRef, docID, subColRef}: GetSubDataList) {
    const resRef = collection(db, colRef, docID, subColRef);
    const docSnap = await getDocs(resRef);
    const resArr: any = [];
    docSnap.forEach((res) => {
        resArr.push({id: res.id, ...res.data()});
    });
    return resArr;
}

export async function editSubCollectionDoc(args: EditSubData) {
    const {colRef, docID, subColRef, subDocID, subDocData} = args;
    const docRef = doc(db, colRef, docID, subColRef, subDocID);
    const docSnap = await setDoc(docRef, subDocData, {merge: true});
}

// 3rd level

export async function addSubSubCollectionDoc({colRef, docID, subColRef, subDocID, subSubColRef, subSubData}) {
    const docRef = doc(collection(db, colRef, docID, subColRef, subDocID, subSubColRef));
    const docSnap = await setDoc(docRef, subSubData);
}

export async function getSubSubCollectionDoc({colRef, docID, subColRef, subDocID, subSubColRef,subSubDocID}) {
    const docRef = doc(db, colRef, docID, subColRef, subDocID, subSubColRef, subSubDocID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function getSubSubCollectionDocs({colRef, docID, subColRef, subDocID, subSubColRef}) {
    const resRef = collection(db, colRef, docID, subColRef,subDocID, subSubColRef);
    const docSnap = await getDocs(resRef);
    const resArr: any = [];
    docSnap.forEach((res) => {
        resArr.push({id: res.id, ...res.data()});
    });
    return resArr;
}

export async function editSubSubCollectionDoc({colRef, docID, subColRef, subDocID, subSubColRef, subSubDocRef, subSubData}) {
    const docRef = doc(db, colRef, docID, subColRef, subDocID,subSubColRef, subSubDocRef);
    const docSnap = await setDoc(docRef, subSubData, {merge: true});
}