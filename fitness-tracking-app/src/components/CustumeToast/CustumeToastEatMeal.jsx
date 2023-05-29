import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MealImage from "./../../assets/meal.png";
import { Box, Flex, Button, Text, VStack, Input, Badge, Stack, Image, Icon, HStack, Center,  Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";

const CustomToasEatMeal = ({ closeToast, title }) => (
	<Box backgroundColor="teal.100">
	<Flex justifyContent="center">
	<Image src={MealImage} boxSize="170px" alt="bottle of water" />
	</Flex>
	<Text align="center" border="2px" color="black">{`You eat one ${title}`}</Text>
	<Flex justify="center" align="center">
	<Button color="blackAlpha.900" backgroundColor="teal" onClick={closeToast}>Yes</Button>
	</Flex>
  </Box>
);

export default CustomToasEatMeal;