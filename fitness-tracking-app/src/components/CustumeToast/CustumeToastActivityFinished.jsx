import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExerciseFinishedImage from "./../../assets/exerciseFinished.png";
import { Box, Flex, Button, Text, VStack, Input, Badge, Stack, Image, Icon, HStack, Center,  Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";


const CustumeToastActivityFinished = ({ closeToast, type, duration }) => (
	<Box backgroundColor="teal.100">
	<Flex justifyContent="center">
	<Image src={ExerciseFinishedImage} boxSize="170px" alt="bottle of water" />
	</Flex>
	<Text align="center" border="2px" color="black">You are now closer to your goals through {type} for {duration} min</Text>
	<Flex justify="center" align="center">
	<Button color="blackAlpha.900" backgroundColor="teal" onClick={closeToast}>YES</Button>
	</Flex>
  </Box>
);

export default CustumeToastActivityFinished;