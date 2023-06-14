import { ref, update, get } from "firebase/database";
import { db } from "../config/firebase-config";
import { MONTH_MS } from "../common/constants";

export const updateUserRole = async (handle, role) => {
  const updates = {
    [`/users/${handle}/role`]: role,
  };

  return update(ref(db), updates);
};

export const getUserMeals = (handle) => {
  const mealRef = ref(db, `/nutritions/${handle}`);
  return get(mealRef);
};

export const getLastMonth = () => {
  let now = new Date();
  const dayInMs = 24 * 3600 * 1000;
  const startDay = now - 30 * dayInMs;
  const result = [];
  for (let i = startDay; i <= now; i = i + dayInMs) {
    const date = new Date(i);
    result.push(date.getDate());
  }
  return result;
};

/**
 * Reads user activity log and updates the data used
 * for the chart
 * @param {array} createData
 * @param {object} userLog the user activity log: name;{timestamp{...}}
 * @returns
 */

export const updateGraphData = (logs, createData) => {
  const now = new Date();

  Object.keys(logs).map((user) => {
    Object.keys(logs[user]).map((timeStamps) => {
      const activityDate = new Date(+timeStamps);
      createData.map((el) => {
        if (
          el.date === activityDate.getDate() &&
          activityDate.getTime() > now - MONTH_MS
        ) {
          el.loggedActivities++;
        }
      });
    });
  });

  return createData;
};

export const calculateTotalActivities = (createData) => {
  const total = createData.reduce((acc, el) => {
    acc += el["loggedActivities"];
    return acc;
  }, 0);

  return total;
};

export const deleteUserPhoto = (handle) => {
  const updates = {
    [`/users/${handle}/photoURL`]: "",
  };
  return update(ref(db), updates);
};
