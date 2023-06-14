import "react-toastify/dist/ReactToastify.css";
import ExerciseFinishedImage from "./../../assets/exerciseFinished.png";
import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustumeToastActivityFinished = ({ closeToast, type, duration }) => (
  <Box backgroundColor="teal.100">
    <Flex justifyContent="center">
      <Image
        src={ExerciseFinishedImage}
        boxSize="170px"
        alt="bottle of water"
      />
    </Flex>
    <Text align="center" border="2px" color="black">
      You are now closer to your goals through {type} for {duration} min
    </Text>
    <Flex justify="center" align="center">
      <Button
        color="blackAlpha.900"
        backgroundColor="teal"
        onClick={closeToast}
      >
        YES
      </Button>
    </Flex>
  </Box>
);

export default CustumeToastActivityFinished;

CustumeToastActivityFinished.propTypes = {
  closeToast: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};
