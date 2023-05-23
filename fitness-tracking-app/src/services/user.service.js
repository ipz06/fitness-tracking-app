import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  update,
} from "firebase/database";
import { uploadBytes, getDownloadURL, ref as sRef } from "@firebase/storage";
import { storage, db } from "../config/firebase-config";

export const getUserByHandle = async (handle) => {
  const snapshot = await get(ref(db, `users/${handle}`));
  return snapshot.val();
};

export const createUserHandle = async (
  handle,
  uid,
  email,
  firstName,
  lastName,	
  phone,
  photoURL,
  weight,
  gender,
  age,

) => {
  const userData = {
    handle,
    uid,
    email,
    createdOn: new Date().toISOString(),
    firstName,
    lastName,
    role: 1,
	phone,
	photoURL,
	weight,
	gender,
	age,
  };
  await set(ref(db, `users/${handle}`), userData);
  return userData;
};


export const getUserData = (uid) => {
	return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)))
	.then((snapshot) => snapshot)
	.catch((error) => {
		throw new Error(error.message);
	});
  };

// export const getUserData = (uid) => {
// 	return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
//   };