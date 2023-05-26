import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StayHydratedImage from "./../../assets/stayHydrated.png";
import { Box, Flex, Button, Text, VStack, Input, Badge, Stack, Image, Icon, HStack, Center,  Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";

const CustomToastWaterReminder = ({ closeToast }) => (
    <Box>
      <Image  src={StayHydratedImage} boxSize="170px" alt="bottle of water" />
      <Text align="center" border="2px" color="black">PLEASE STAY HYDRATED!</Text>
      <Flex justify="center" align="center">
        <Button color="blackAlpha.900" backgroundColor="red.500" onClick={closeToast}>OK, I WILL</Button>
      </Flex>
    </Box>
);

export default CustomToastWaterReminder;