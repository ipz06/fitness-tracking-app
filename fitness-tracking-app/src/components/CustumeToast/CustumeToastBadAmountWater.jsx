import "react-toastify/dist/ReactToastify.css";
import WaterDrop from "./../../assets/waterDrop.png";
import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomToastBadAmountWater = ({ closeToast }) => (
  <Box backgroundColor="red.500">
    <Flex justifyContent="center">
      <Image src={WaterDrop} boxSize="170px" alt="bottle of water" />
    </Flex>
    <Text align="center" border="2px" color="black">
      PLEASE DRINK MORE NEXT TIME!
    </Text>
    <Flex justify="center" align="center">
      <Button
        color="blackAlpha.900"
        backgroundColor="teal"
        onClick={closeToast}
      >
        OK
      </Button>
    </Flex>
  </Box>
);

export default CustomToastBadAmountWater;

CustomToastBadAmountWater.propTypes = {
  closeToast: PropTypes.func.isRequired,
};
