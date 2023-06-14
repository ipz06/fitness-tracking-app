import {
  FormControl,
  FormLabel,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  IconButton,
} from "@chakra-ui/react";
import { CgAdd } from "react-icons/all";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../common/context";
import {
  addUserGoal,
  startTimeCaloriesGoal,
} from "../../../services/goal.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const TrackCalories = ({ open, setOpen }) => {
  const { handle } = useContext(AuthContext);
  const [startTime, setStartTime] = useState("");
  const [calories, setCalories] = useState("");

  const HandleSubmitGoal = (open, setOpen) => {
    if (!calories) {
      toast("Please enter calories!", { autoClose: 1000 });
      return;
    }
    if (calories < 1200) {
      toast("Please enter more that 1200 Kcal!", { autoClose: 1000 });
      return;
    }

    if (!startTime) {
      toast("Please enter start time!", { autoClose: 1000 });
      return;
    }

    let time = startTimeCaloriesGoal(+startTime, 0, 0);
    setOpen(!open);
    addUserGoal(handle, "track-calories", time, 1 / 7, 0, calories);
  };

  return (
    <>
      <Text fontSize={"md"} fontWeight={"light"} marginBottom={"2"}>
        Keep track of daily calories intake.
      </Text>
      <Text fontSize={"sm"} fontWeight={"light"} marginBottom={"2"}>
        Select the time to reset the daily counter.
      </Text>
      <FormControl w={"10rem"} marginX={"auto"}>
        <Select
          size={"sm"}
          placeholder="Set Start time"
          onChange={(e) => setStartTime(e.target.value)}
        >
          <option value={8}> 08:00 </option>
          <option value={12}> 12:00 </option>
        </Select>
      </FormControl>
      <FormLabel textAlign={"center"} fontSize={"sm"} fontWeight={"light"}>
        Set daily kcal
      </FormLabel>
      <NumberInput
        size="xs"
        maxW={"75px"}
        defaultValue={""}
        min={1000}
        onChange={(valueAsString, valueAsNumber) => setCalories(valueAsNumber)}
        margin={"auto"}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <IconButton
        icon={<CgAdd />}
        size={"md"}
        margin={"5"}
        onClick={() => HandleSubmitGoal(open, setOpen, calories, startTime)}
      />
    </>
  );
};

export default TrackCalories;

TrackCalories.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
