import {
  ref,
  child,
  update,
  get,
  remove,
  query,
  orderByChild,
  set,
  startAt,
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
  totalWeight,
  sharedStatus,
  typeMeal
) => {
  const nutritionData = {
    title: recipeTitle,
    addOn: new Date().toLocaleDateString(),
    ingredients: ingredients,
    calories: calories,
    weight: totalWeight,
    shared: sharedStatus,
    typeMeal: typeMeal,
  };

  const newNutritionKey = push(child(ref(db), "activity")).key;
  const updates = {};
  updates[`/nutritions/${user}/${newNutritionKey}`] = {
    ...nutritionData,
    nutritionKey: newNutritionKey,
  };
  return update(ref(db), updates);
};

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

export const getNutrition = async (handle) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const timeStampSundayOfThisWeek = today.setDate(
      today.getDate() - today.getDay()
    );
    const caloriesCount = query(
      ref(db, `log-nutrition/${handle}`),
      orderByChild("timestamp"),
      startAt(+timeStampSundayOfThisWeek)
    );
    const snapshot = await get(caloriesCount);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const shareUserMeal = (handle, nutritionKey, shared) => {
  const mealPath = ref(db, `nutritions/${handle}/${nutritionKey}/shared`);
  set(mealPath, shared)
    .then(() => console.log("Shared state updated"))
    .catch((e) => console.log(e));
};

export const filterSharedMeals = (data) => {
  let result = {};
  const keys = Object.keys(data);
  keys.map((key) => {
    if (data[key]["shared"]) {
      result[key] = data[key];
    }
  });
  return result;
};

export const getAllCreatedMeals = async () => {
  try {
    const allMeals = query(ref(db, `nutritions`));
    const snapshot = await get(allMeals);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
