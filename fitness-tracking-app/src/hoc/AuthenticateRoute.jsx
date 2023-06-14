import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import { CircularProgress } from "@chakra-ui/react";
import PropTypes from "prop-types";

const AuthenticateRoute = ({ children }) => {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <div>
        <CircularProgress value={80} />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <div> Please sign in or log in</div>;
};

export default AuthenticateRoute;

AuthenticateRoute.propTypes = {
  children: PropTypes.any,
};
