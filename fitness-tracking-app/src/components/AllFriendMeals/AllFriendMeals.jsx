import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { AuthContext } from "../../common/context";
import "firebase/database";
import { filterSharedMeals } from "../../services/nutrition.service";
import MealView from "../Meal/Meal";
import PropTypes from 'prop-types';
import { Text, SimpleGrid, Box } from "@chakra-ui/react";


const AllFriendMeals = ({ handle }) => {
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const dbRef = ref(db, `nutritions/` + handle);
      const handleMeals = (snap) => {
        if (snap.val()) {
          const data = filterSharedMeals(snap.val());
          setMeals(data);
          setLoading(false);
        }
      };
      onValue(dbRef, (snapshot) => {
        handleMeals(snapshot);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  } else {
  
    return meals ? (
     <Box p={2}>
        <Text
          align="center"
          fontSize="2xl"
          fontStyle="normal"
          fontWeight="bold"
        >
          Shared meals of {handle}
        </Text>
        <SimpleGrid columns={[1, 2, 3]}>
		{Object.keys(meals).map((meal) => {

  return (
	
    <MealView
	    key={meals[meal].nutritionKey}
      addOn={meals[meal].addOn}
      calories={meals[meal].calories}
      ingredients={meals[meal].ingredients}
      nutritionKey={meals[meal].nutritionKey}
      title={meals[meal].title}
      weight={meals[meal].weight}
      typeMeal={meals[meal].typeMeal}
    />
   
  );
})}
 </SimpleGrid>
      </Box>
    ) : (
      <div>No shared meals</div>
    );
  }
};

export default AllFriendMeals;

AllFriendMeals.propTypes = {
  handle: PropTypes.string.isRequired,
}