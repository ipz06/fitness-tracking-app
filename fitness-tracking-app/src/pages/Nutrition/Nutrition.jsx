import AddNutrition from "../../components/AddNutrition/AddNutrition";
import { useState, useEffect } from "react";
import MealView from "../../components/MealView/MealView";
import { Flex, Box, SimpleGrid } from "@chakra-ui/react";
import { onUserNutritionsChange } from "../../services/nutrition.service";
import { useContext } from "react";
import { AuthContext } from "../../common/context";

const Nutrition = () => {
  const {user} = useContext(AuthContext);
  const [nutritions, setNutritions] = useState([]);
  const handle = user.displayName;

 useEffect(() => {
    const unsubscribe = onUserNutritionsChange(user, setNutritions);
    return () => unsubscribe();
  }, [user]);


  return (
        <div>
     
     <Flex justifyContent="center" alignItems="center" height="100%">
  <Box>
    <AddNutrition />
  </Box>
</Flex>
    
 <br></br>
      
      <Box flex="2">
        <SimpleGrid columns={[1, 2, 3, 4]} >
          { nutritions && nutritions.map((nutr, index) => (
          <MealView
          key={index}
          addOn={nutr.addOn}
          title={nutr.title}
          weight={nutr.weight}
          calories={nutr.calories}
          ingredients={nutr.ingredients}
          />
          ))}
        </SimpleGrid>
      </Box>

    </div>
  );
};

export default Nutrition;
