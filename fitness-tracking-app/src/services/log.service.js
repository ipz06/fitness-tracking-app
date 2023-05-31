import {
  ref,
  child,
  update,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../config/firebase-config";
import { push } from "firebase/database";
import "firebase/database";

export const saveLogToDatabase = async (user, logData) => {
  const now = Date.now();
  const updates = {};
  updates[`/log-activity/${user}/${now}`] = logData;
  return update(ref(db), updates);
};

export const saveWeightToDatabase = async (
  user,
  weightChange,
  currentWeight,
  startWeight
) => {
  const weightData = {
    weightChange: weightChange,
    currentWeight: currentWeight,
    startWeight: startWeight,
  };

  const now = Date.now();
  const updates = {};
  updates[`/log-weight/${user}/${now}`] = weightData;
  return update(ref(db), updates);
};

export const getUserActivityLogs = async (handle) => {
  try {
    const snapshot = await get(query(ref(db, `log-activity/${handle}`)));
    if (snapshot.exists()) {
      const activityLogs = Object.values(snapshot.val());
      return activityLogs;
    }
    return [];
  } catch (error) {
    console.log("Error retrieving user activity logs:", error);
    throw error;
  }
};

export const getDurationActivity = async (handle) => {
  try {
  const durationActivity = query(ref(db, `log-activity/${handle}`), orderByChild('duration'));
  const snapshot = await get(durationActivity);
  // console.log('snapshot:', snapshot)

  if (snapshot.exists()) {
    // console.log('val',snapshot.val())
    return snapshot.val();
  } else {
    console.log('null')
    return null;
  }
} catch (error) {
  console.log(error);
}
}

export const saveWaterToDatabase = async (
  user,
  dailyWater,
) => {
  const WaterData = {
    dailyWater: dailyWater,
    addOn: new Date().toLocaleString(),
  };

  const now = Date.now();
  const updates = {};
  updates[`/log-water/${user}/${now}`] = WaterData;
  return update(ref(db), updates);
};


export const saveMealLog = async (
  user,
  calories,
  weight,
  title
) => {
  const nutritionData = {
    calories: calories,
    addOn: new Date().toLocaleString(),
    weight: weight,
    title: title,
  };

  const now = Date.now();
  const updates = {};
  updates[`/log-nutrition/${user}/${now}`] = nutritionData;
  return update(ref(db), updates);
};


