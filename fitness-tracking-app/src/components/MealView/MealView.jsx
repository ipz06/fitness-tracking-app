import { Box, Text, VStack, Badge, UnorderedList, ListItem } from '@chakra-ui/react';



const MealView = ({ addOn, title, weight, calories, ingredients }) => {

  return (
    <Box boxSize="sm" shadow="sm">
    <VStack spacing={4} align="center" border="1px" borderRadius="sm" p={4} borderColor="black">
      <Text fontSize="md" color="black">Added on: {addOn}</Text>
      <Box>
        <Text fontSize="lg" fontWeight="bold">{title}</Text>
      <Badge colorScheme="teal" p={1} mr={2}>Weight: {weight}g</Badge>
     <Badge colorScheme="teal" p={1}>Calories: {calories}</Badge>
        <Text fontSize="md" fontWeight="bold" mt={3}>Ingredients:</Text>
           <UnorderedList>
        {ingredients && ingredients.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
              ))}
           </UnorderedList>
      </Box>
    </VStack>
          </Box>
  );
};

export default MealView;