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

export const uploadAvatar = async (userId, file) => {
  const storageRef = sRef(storage, `avatars/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);
 console.log('download url', downloadUrl)
  return downloadUrl;
};

export const updateUserAvatar = async (displayName, photoURL) => {
  const userRef = ref(db, `users/${displayName}`);
  return update(userRef, { photoURL: photoURL });
};

export const updateUserProfile = async (handle, firstName, lastName, phone, weight, gender, photoURL, height, country, birthDate) => {
  const updates = {
    [`/users/${handle}/firstName`]: firstName,
    [`/users/${handle}/lastName`]: lastName,
    [`/users/${handle}/weight`]: weight,
    [`/users/${handle}/phone`]: phone,
    [`/users/${handle}/gender`]: gender,
    [`/users/${handle}/photoURL`]: photoURL,
    [`/users/${handle}/height`]: height,
    [`/users/${handle}/country`]: country,
    [`/users/${handle}/birthDate`]: birthDate,

  };

  return update(ref(db), updates);
};

// export const writeAdditionalUserData = async (handle, height, country) => {
//   return await set(ref(db, `users/${handle}`), {
//     height: height,
//     country: country
//   })
// }

export const getAllCreatedUsers = async () => {
  try {
    const allUsers = query(ref(db, `users`));
    const snapshot = await get(allUsers);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};


export const getAllUsersActivitiesLogs = async () => {
  try {
    const allLogs = query(ref(db, `log-activity`));
    const snapshot = await get(allLogs);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

