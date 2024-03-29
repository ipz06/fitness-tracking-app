import {
  ref,
  update,
  get,
  query,
  orderByChild,
  startAt,
} from "firebase/database";
import { db } from "../config/firebase-config";
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

export const getActivityByDate = async (handle) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const timeStampSundayOfThisWeek = today.setDate(
      today.getDate() - today.getDay()
    );
    const durationActivity = query(
      ref(db, `log-activity/${handle}`),
      orderByChild("timestamp"),
      startAt(+timeStampSundayOfThisWeek)
    );
    const snapshot = await get(durationActivity);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getActivityForToday = async (handle) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const durationActivity = query(
      ref(db, `log-activity/${handle}`),
      orderByChild("timestamp"),
      startAt(+today)
    );
    const snapshot = await get(durationActivity);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getActivityByMonth = async (handle) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const timeStampSundayOfThisWeek = today.setDate(
      today.getDate() - today.getDay()
    );
    const durationActivity = query(
      ref(db, `log-activity/${handle}`),
      orderByChild("timestamp"),
      startAt(+timeStampSundayOfThisWeek)
    );
    const snapshot = await get(durationActivity);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWaterConsumption = async (handle) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const timeStampSundayOfThisWeek = today.setDate(
      today.getDate() - today.getDay()
    );
    const durationActivity = query(
      ref(db, `log-water/${handle}`),
      orderByChild("timestamp"),
      startAt(+timeStampSundayOfThisWeek)
    );
    const snapshot = await get(durationActivity);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("null");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveWaterToDatabase = async (user, dailyWater) => {
  const WaterData = {
    dailyWater: dailyWater,
    addOn: new Date().toLocaleString(),
    timestamp: Date.now(),
  };

  const now = Date.now();
  const updates = {};
  updates[`/log-water/${user}/${now}`] = WaterData;
  return update(ref(db), updates);
};

export const saveMealLog = async (user, calories, weight, title, typeMeal) => {
  const nutritionData = {
    calories: calories,
    addOn: new Date().toLocaleString(),
    weight: weight,
    title: title,
    timestamp: Date.now(),
    typeMeal: typeMeal,
  };

  const now = Date.now();
  const updates = {};
  updates[`/log-nutrition/${user}/${now}`] = nutritionData;
  return update(ref(db), updates);
};
