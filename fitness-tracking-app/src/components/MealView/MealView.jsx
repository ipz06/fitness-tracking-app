import { Box, Text, VStack, Button, Badge, UnorderedList, ListItem, Center, HStack } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../common/context';
import { saveMealLog } from '../../services/log.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MealView = ({ addOn, title, weight, calories, ingredients }) => {
  const {user} = useContext(AuthContext)

  const handleLogMeal = async () => {
    try {
      await saveMealLog(user.displayName, calories, weight, title);
      toast.success("update succes")
    } catch (error) {
      console.error("An error occurred while logging the meal:", error);
    }
  };



  return (
    <Center boxShadow="sm">
      <VStack
        align="center"
        border="1px"
        borderRadius="sm"
        p={4}
        borderColor="black"
      >
        <Text fontSize="md" color="black">Added on: {addOn}</Text>
        <Box>
          <Text fontSize="lg" fontWeight="bold">{title}</Text>
          <Badge colorScheme="teal" p={1} mr={2}>Weight: {weight}g</Badge>
          <Badge colorScheme="teal" p={1}>Calories: {calories}</Badge>
          <Text fontSize="md" fontWeight="bold" mt={3}>Ingredients:</Text>
          <HStack>
          <UnorderedList>
            {ingredients &&
              ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
          </UnorderedList>
          <Button onClick={handleLogMeal} backgroundColor="blackAlpha.300" borderRadius="sm" color="blackAlpha.900" variant="outline" borderColor="black">Log</Button>
          </HStack>
        </Box>
      </VStack>
    </Center>
  );
};

export default MealView;