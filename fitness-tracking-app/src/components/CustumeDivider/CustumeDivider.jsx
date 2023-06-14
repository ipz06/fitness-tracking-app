import { Box, Text, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomDivider = ({ heading }) => (
  <Center width="100%" pt="1%">
    <Box bg="gray.300" height="1px" width="100%" position="relative">
      <Text
        as="span"
        bg="white"
        color="gray.500"
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        zIndex="2"
        fontWeight="bold"
        textTransform="uppercase"
        display="flex"
        alignItems="center"
        lineHeight="1rem"
        px={2}
      >
        {heading}
      </Text>
    </Box>
  </Center>
);

export default CustomDivider;

CustomDivider.propTypes = {
  heading: PropTypes.string.isRequired,
};
