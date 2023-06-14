import "react-toastify/dist/ReactToastify.css";
import MealImage from "./../../assets/meal.png";
import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomToasEatMeal = ({ closeToast, title }) => (
  <Box backgroundColor="teal.100">
    <Flex justifyContent="center">
      <Image src={MealImage} boxSize="170px" alt="bottle of water" />
    </Flex>
    <Text
      align="center"
      border="2px"
      color="black"
    >{`You eat one ${title}`}</Text>
    <Flex justify="center" align="center">
      <Button
        color="blackAlpha.900"
        backgroundColor="teal"
        onClick={closeToast}
      >
        Yes
      </Button>
    </Flex>
  </Box>
);

export default CustomToasEatMeal;

CustomToasEatMeal.propTypes = {
  closeToast: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
