import { useEffect, useState } from "react";
import { MEALS_TYPE } from "../common/constants";
import healthyDinner from "../assets/healthy-dinner.png";
import breakfastForGentlemen from "../assets/breakfast-Gentlemen.png";
import lunchForLadies from "../assets/lunch-for-l.png";
import energeticStartOFTheDay from "../assets/energeticStartOFTheDay.png";
import healthyBreakfast from "../assets/healthyBreakfast.jpg";
import onTheGoSnack from "../assets/on-the-go-snack.png";
import muscleLunch from "../assets/muscleL.png";
import salad from "../assets/salad.jpg";
import snack from "../assets/snack.png";
import dinner from "../assets/dinner.png";
import upload from "../assets/upload.png";

const useMealImages = (typeMeal) => {
  const [imageMeal, setImageMeal] = useState("");

  useEffect(() => {
    const getImageByType = () => {
      if (typeMeal === MEALS_TYPE.HEALTHY_DINNER) {
        setImageMeal(healthyDinner);
      } else if (typeMeal === MEALS_TYPE.BREAKFAST_FOR_GENTLEMEN) {
        setImageMeal(breakfastForGentlemen);
      } else if (typeMeal === MEALS_TYPE.LUNCH_FOR_LADIES) {
        setImageMeal(lunchForLadies);
      } else if (typeMeal === MEALS_TYPE.HEALTHY_BREAKFAST) {
        setImageMeal(healthyBreakfast);
      } else if (typeMeal === MEALS_TYPE.ENERGETIC_START_OF_THE_DAY) {
        setImageMeal(energeticStartOFTheDay);
      } else if (typeMeal === MEALS_TYPE.ON_THE_GO_SNACK) {
        setImageMeal(onTheGoSnack);
      } else if (typeMeal === MEALS_TYPE.MUSCLE_LUNCH) {
        setImageMeal(muscleLunch);
      } else if (typeMeal === MEALS_TYPE.SALAD) {
        setImageMeal(salad);
      } else if (typeMeal === MEALS_TYPE.SNACK) {
        setImageMeal(snack);
      } else if (typeMeal === MEALS_TYPE.DINNER) {
        setImageMeal(dinner);
      } else if (typeMeal === "") {
        setImageMeal(upload);
      }
    };
    getImageByType();
  }, []);

  return imageMeal;
};

export default useMealImages;
