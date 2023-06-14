import "react-toastify/dist/ReactToastify.css";
import WaterDrop from "./../../assets/waterDrop.png";
import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomToastGoodAmountWater = ({ closeToast }) => (
  <Box backgroundColor="teal.100">
    <Flex justifyContent="center">
      <Image src={WaterDrop} boxSize="170px" alt="bottle of water" />
    </Flex>
    <Text align="center" border="2px" color="black">
      Nice, Good for you!
    </Text>
    <Flex justify="center" align="center">
      <Button
        color="blackAlpha.900"
        backgroundColor="teal"
        onClick={closeToast}
      >
        Thanks
      </Button>
    </Flex>
  </Box>
);

export default CustomToastGoodAmountWater;

CustomToastGoodAmountWater.propTypes = {
  closeToast: PropTypes.func.isRequired,
};
