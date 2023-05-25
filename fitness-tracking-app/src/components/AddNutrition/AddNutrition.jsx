import { useState } from "react";
import { Box, Input, Button, VStack, Text, Heading, Divider, Badge, SimpleGrid, Container } from "@chakra-ui/react";
import { analyzeNutrition } from "../../services/api.service";

const AddNutrition = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [nutritionData, setNutritionData] = useState(null);

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const analyzeRecipe = async () => {
    const data = await analyzeNutrition(recipeTitle, ingredients);
    setNutritionData(data);
  };

  return (
    <Container maxW="container.md" centerContent>
    <VStack spacing={2}>
      <Input
        value={recipeTitle}
        onChange={(e) => setRecipeTitle(e.target.value)}
        placeholder="Recipe Title"
      />

      {ingredients.map((ingredient, index) => (
        <Input
          key={index}
          value={ingredient}
          onChange={(e) => handleIngredientChange(index, e)}
          placeholder="Ingredient"
        />
      ))}

      <Button onClick={addIngredientField}>Add another ingredient</Button>

      <Button onClick={analyzeRecipe}>Analyze recipe</Button>

      {nutritionData && (
       <Box p={4} mt={4} shadow="md" borderWidth="1px" borderRadius="md">
       <Heading as="h2" size="lg" mb={4}>
         Nutrition Analysis Results:
       </Heading>
       <Box mb={4}>
            <Heading as="h4" size="md" mb={2}>
              Total Calories:
            </Heading>
            <Text fontSize="xl">{nutritionData.calories}</Text>
            <Heading as="h4" size="md" mb={2}>
              Total Weight:
            </Heading>
            <Text fontSize="xl">{nutritionData.totalWeight}</Text>
          </Box>
          <Divider />
          <Box my={4}>
            <Heading as="h4" size="md" mb={2}>
              Diet Labels:
            </Heading>
            <Box>
              {nutritionData.dietLabels && nutritionData.dietLabels.map((label, index) => (
                <Badge key={index} colorScheme="green" mr={2}>
                  {label}
                </Badge>
              ))}
            </Box>
          </Box>

          <Divider />

          <Box my={4}>
            <Heading as="h4" size="md" mb={2}>
              Health Labels:
            </Heading>
            <Box>
              {nutritionData.healthLabels && nutritionData.healthLabels.map((label, index) => (
                <Badge key={index} colorScheme="blue" mr={2}>
                  {label}
                </Badge>
              ))}
            </Box>
          </Box>

          <Divider />

          <Box my={4}>
            <Heading as="h4" size="md" mb={2}>
              Nutrients:
            </Heading>
            <SimpleGrid columns={2} spacing={2}>
              {nutritionData.totalNutrients && Object.entries(nutritionData.totalNutrients).map(([key, nutrient]) => (
                <Box key={key}>
                  <Text>
                    <strong>{nutrient.label}</strong>: {nutrient.quantity.toFixed(2)} {nutrient.unit}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>


       </Box>
      )}
    </VStack>
    </Container>
  );
};

export default AddNutrition;
