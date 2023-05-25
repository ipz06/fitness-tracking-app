import {ref, child, update, get, query,  remove } from "firebase/database";
  import { db } from "../config/firebase-config";
  import { push } from "firebase/database";
  import "firebase/database";
  
export const saveActivityToDatabase = async (
  user,
  uid,
  type,
	duration,
  cal
) => {
  const activityData = {
    author: user,
    uid: uid,
    type: type,
    duration: duration,
    createdOn: new Date().toLocaleDateString(),
    cal: cal,
  };

  const newActivityKey = push(child(ref(db), "activity")).key;
  const updates = {};
  updates["/activities/" + user + "/" +  newActivityKey] = {...activityData, activityKey: newActivityKey};
  return update(ref(db), updates);
};


export const getUserActivities = async (handle) => {
  try {
    const snapshot = await get(query(ref(db, `activities/${handle}`)));
    if (snapshot.exists()) {
      const activities = Object.values(snapshot.val());
      return activities;
    }
    return [];
  } catch (error) {
    console.log("Error retrieving user activities:", error);
    throw error;
  }
};

export const deleteActivityFromDatabase = async (user, activityId) => {
  try {
    const activityRef = ref(db, `activities/${user}/${activityId}`);
    await remove(activityRef);
  } catch (error) {
    console.log("Error deleting activity:", error);
    throw error;
  }
};