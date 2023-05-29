import {
  ref,
  child,
  update,
  get,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../config/firebase-config";
import { push } from "firebase/database";
import "firebase/database";
import { onValue } from "firebase/database";

export const saveNutritionToDatabase = async (
  user,
  recipeTitle,
  ingredients,
  calories,
  totalWeight
) => {
  const nutritionData = {
    title: recipeTitle,
    addOn: new Date().toLocaleString(),
    ingredients: ingredients,
    calories: calories,
    weight: totalWeight,
  };

  const newNutritionKey = push(child(ref(db), "activity")).key;
  const updates = {};
  updates[`/nutritions/${user}/${newNutritionKey}`] = {...nutritionData, nutritionKey: newNutritionKey};
  return update(ref(db), updates);
};

// export const getUserNutritions = async (handle) => {
//   try {
//     const snapshot = await get(query(ref(db, `nutritions/${handle}`)));
//     if (snapshot.exists()) {
//       const nutritions = Object.values(snapshot.val());
//       return nutritions;
//     }
//     return [];
//   } catch (error) {
//     console.log("Error retrieving user nutritions:", error);
//     throw error;
//   }
// };



export const onUserNutritionsChange = (user, setNutritions) => {
  if (user) {
    const handle = user.displayName;
    const userNutritionsRef = ref(db, `nutritions/${handle}`);

    const onNutritionsChange = (snapshot) => {
      if (snapshot.exists()) {
        const nutritions = Object.values(snapshot.val());
        setNutritions(nutritions);
      } else {
        setNutritions([]);
      }
    };

    const unsubscribeNutritions = onValue(
      userNutritionsRef,
      onNutritionsChange,
      {
        onlyOnce: false,
      }
    );

    return unsubscribeNutritions;
  }
};


export const deleteNutrituionFromDatabase = async (user, activityId) => {
  try {
    const activityRef = ref(db, `nutritions/${user}/${activityId}`);
    await remove(activityRef);
  } catch (error) {
    console.log("Error deleting activity:", error);
    throw error;
  }
};