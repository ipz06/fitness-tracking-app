import { Box, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Alert from "../../assets/notification.png";
import PropTypes from "prop-types";

const FriendAlert = ({ setActiveLink }) => {
  return (
    <Box
      className="shake-icon"
      position={"absolute"}
      top={4}
      left={0}
      zIndex={0}
    >
      <NavLink to={`/friends`} onClick={() => setActiveLink(`friends`)}>
        <Image src={Alert} h="35px" marginX={"auto"} />
      </NavLink>
    </Box>
  );
};

export default FriendAlert;


FriendAlert.propTypes = {
   setActiveLink: PropTypes.func.isRequired,
   
 };