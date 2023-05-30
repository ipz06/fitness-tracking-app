import { Box, Text, VStack, Button, Badge, UnorderedList, ListItem, Center, Flex, HStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaTrash } from "react-icons/fa";
import { AuthContext } from '../../common/context';
import { saveMealLog } from '../../services/log.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteNutrituionFromDatabase } from '../../services/nutrition.service';
import CustomToasEatMeal from '../CustumeToast/CustumeToastEatMeal';
import { GiMeal } from 'react-icons/gi';

const MealView = ({ author, nutritionKey, addOn, title, weight, calories, ingredients }) => {
  const {user} = useContext(AuthContext)

  const handleLogMeal = async () => {
    try {
      await saveMealLog(user.displayName, calories, weight, title);
      toast(<CustomToasEatMeal title={title}/>)
    } catch (error) {
      console.error("An error occurred while logging the meal:", error);
    }
  };

  const handleDeleteMeal = async () => {
    try {
      await deleteNutrituionFromDatabase(author, nutritionKey);
    } catch (error) {
      console.log("Error deleting meal:", error);
    }
  };

  return (
    <Box align="center" p="1%">
    <Flex maxW="50%" minW="60%" justify="center" align="center">
      <VStack
        align="center"
        border="1px"
        borderRadius="sm"
        p={4}
        borderColor="black"
        maxW="160%"
        minW="160%"
      >
        <Text fontSize="md" color="black" fontStyle="normal">Added on: {addOn}</Text>
        <Box>
          <Text fontSize="lg" fontWeight="bold" fontStyle="normal">{title}</Text>
          <Badge colorScheme="teal" p={1} mr={2}>Weight: {weight}g</Badge>
          <Badge colorScheme="teal" p={1}>Calories: {calories}</Badge>
          <Text fontSize="md" fontWeight="bold" mt={3} fontStyle="normal">Ingredients:</Text>
          <HStack>
          <UnorderedList>
            {ingredients &&
              ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
          </UnorderedList>
          <VStack paddingLeft="10%">
          <Button onClick={handleLogMeal} backgroundColor="blackAlpha.300" borderRadius="sm" color="blackAlpha.900" variant="outline" borderColor="black"><GiMeal size={20}/></Button>
          <Button onClick={handleDeleteMeal} backgroundColor="red.500" borderRadius="sm" color="blackAlpha.900" variant="outline" borderColor="black"><FaTrash size={20}/></Button>
          </VStack>
          </HStack>
        </Box>
      </VStack>
      </Flex>
      </Box>
  );
};

export default MealView;