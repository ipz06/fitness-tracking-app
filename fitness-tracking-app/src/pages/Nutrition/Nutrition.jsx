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
      <Box p={4} pt="2%" >   
     <Flex justifyContent="center" alignItems="center" height="100%">
  <Box>
    <AddNutrition />
  </Box>
</Flex>

      
      <Box flex="2" p="2" maxW="70%" mx="auto" >
        <SimpleGrid columns={[1, 2, 3]}  > 
          { nutritions && nutritions.map((nutr, index) => (
          <MealView
          author={handle}
          nutritionKey={nutr.nutritionKey}
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
      </Box>

  );
};

export default Nutrition;



{/* <Box flex="2" >
<SimpleGrid maxW="lg" columns={[1, 2, 3]} spacing="5%">
  {nutritions &&
    nutritions.map((nutr, index) => (
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
</Box> */}