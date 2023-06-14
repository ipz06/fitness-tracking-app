import { Box, IconButton } from "@chakra-ui/react";
import { CgAdd, CgRemove } from "react-icons/all";
import DividerHeader from "../../components/Goals/Divider";
import Goal from "../../components/Goals/Goal";
import { useState, useContext, useEffect } from "react";
import AddGoal from "../../components/Goals/AddGoal/AddGoal";
import AllGoals from "../../components/Goals/ReadGoals/AllGoals";
import Badges from "../../components/Goals/Badges/Badges";
import { AuthContext } from "../../common/context";
import { addUserGoal } from "../../services/goal.service";
import { useNavigate } from "react-router-dom";
import { MONTH_MS } from "../../common/constants";
import { toast } from "react-toastify";
import { getLastWeight } from "../../services/goal.service";
import { addUserWeightGoal } from "../../services/goal.service";

const Goals = () => {
  const date = new Date().toLocaleDateString("en-GB");
  const [open, setOpen] = useState(false);
  const { handle, weight } = useContext(AuthContext);
  const [currentWeight, setCurrentWeight] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getLastWeight(handle).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = Object.keys(snapshot.val());
        setCurrentWeight(data[key]["currentWeight"]);
      } else if (weight !== "") {
        setCurrentWeight(weight);
      } else {
        navigate("/profile");
        toast("set weight", { autoClose: 1000 });
      }
    });
  }, []);

  const addTimedActivity = () => {
    const now = Date.now();
    addUserGoal(handle, "stay-active", now, 1, 0, 240);
  };

  const addWorkOutActivity = () => {
    const now = Date.now();
    addUserGoal(handle, "stay-toned", now, 1, 0, 4);
  };
  const addWeightGoal = () => {
    const now = Date.now();
    const targetDate = now + MONTH_MS;
    addUserWeightGoal(
      handle,
      "loose-weight",
      now,
      0,
      targetDate,
      currentWeight - 2,
      currentWeight
    );
  };
  return (
    <Box textAlign={"center"} margin={"auto"} p={5}>
      <Badges handle={handle} />
      <h2>GOALS</h2>
      {!open ? (
        <IconButton
          icon={<CgAdd />}
          size={"md"}
          marginTop={"5"}
          marginBottom={"5"}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <IconButton
          icon={<CgRemove />}
          size={"md"}
          marginTop={"5"}
          marginBottom={"5"}
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <AddGoal open={open} setOpen={setOpen} />}
      <Box marginBottom={6}>
        <DividerHeader heading={"active goals"} />
      </Box>
      <AllGoals />
      <Box marginBottom={6}>
        <DividerHeader heading={"suggested goals"} />
      </Box>
      <Goal
        title={"Four hours a week workout"}
        description={"Any activity"}
        startDate={date}
        handleClick={addTimedActivity}
      />
      <Goal
        title={"Any activity four times a week"}
        description={"Any activity"}
        startDate={date}
        handleClick={addWorkOutActivity}
      />
      <Goal
        title={"Loose 2kg in a month"}
        description={"Loose some weight"}
        startDate={date}
        handleClick={addWeightGoal}
      />
    </Box>
  );
};
export default Goals;
