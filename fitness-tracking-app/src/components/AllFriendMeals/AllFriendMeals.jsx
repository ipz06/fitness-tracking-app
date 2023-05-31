import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { AuthContext } from "../../common/context";
import "firebase/database";
import { filterSharedMeals } from "../../services/nutrition.service";
import MealView from "../MealView/MealView";

import { Text } from "@chakra-ui/react";
const AllFriendMeals = ({ handle }) => {
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const dbRef = ref(db, `nutritions/` + handle);
      const handleGoals = (snap) => {
        if (snap.val()) {
          const data = filterSharedMeals(snap.val());
          setMeals(data);
          setLoading(false);
        }
      };
      onValue(dbRef, (snapshot) => {
        handleGoals(snapshot);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  } else {
  
    return meals ? (
      <>
        <Text
          align="center"
          fontSize="2xl"
          fontStyle="normal"
          fontWeight="bold"
        >
          Shared meals of {handle}
        </Text>
		{Object.keys(meals).map((meal) => {
  console.log("one meal", meals[meal]);
  return (
	
    <MealView
	key={meals[meal].nutritionKey}
      addOn={meals[meal].addOn}
      calories={meals[meal].calories}
      ingredients={meals[meal].ingredients}
      nutritionKey={meals[meal].nutritionKey}
      title={meals[meal].title}
      weight={meals[meal].weight}
    />
  );
})}
      </>
    ) : (
      <div>No shared meals</div>
    );
  }
};

export default AllFriendMeals;
