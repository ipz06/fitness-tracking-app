import "react-toastify/dist/ReactToastify.css";
import StayHydratedImage from "./../../assets/stayHydrated.png";
import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomToastWaterReminder = ({ closeToast }) => (
  <Box>
    <Image src={StayHydratedImage} boxSize="170px" alt="bottle of water" />
    <Text align="center" border="2px" color="black">
      PLEASE STAY HYDRATED!
    </Text>
    <Flex justify="center" align="center">
      <Button
        color="blackAlpha.900"
        backgroundColor="red.500"
        onClick={closeToast}
      >
        OK, I WILL
      </Button>
    </Flex>
  </Box>
);

export default CustomToastWaterReminder;

CustomToastWaterReminder.propTypes = {
  closeToast: PropTypes.func.isRequired,
};
