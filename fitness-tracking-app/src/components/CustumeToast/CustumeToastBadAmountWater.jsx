import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WaterDrop from "./../../assets/waterDrop.png";
import { Box, Flex, Button, Text, VStack, Input, Badge, Stack, Image, Icon, HStack, Center,  Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";

const CustomToastBadAmountWater = ({ closeToast }) => (
	<Box backgroundColor="red.500">
	<Flex justifyContent="center">
	<Image src={WaterDrop} boxSize="170px" alt="bottle of water" />
	</Flex>
	<Text align="center" border="2px" color="black">PLEASE DRINK MORE NEXT TIME!</Text>
	<Flex justify="center" align="center">
	<Button color="blackAlpha.900" backgroundColor="teal" onClick={closeToast}>OK</Button>
	</Flex>
  </Box>
);

export default CustomToastBadAmountWater;