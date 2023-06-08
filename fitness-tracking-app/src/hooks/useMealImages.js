import React from "react";
import { useEffect, useState } from "react";
import { MEALS_TYPE } from "../common/constants";
import healthyDinner from "../assets/healthy-dinner.jpg";
import breakfastForGentlemen from "../assets/breakfast-Gentlemen.jpg";
import lunchForLadies from "../assets/lunch-for-l.jpg";
import energeticStartOFTheDay from "../assets/energeticStartOFTheDay.png";
import healthyBreakfast from "../assets/healthyBreakfast.jpg"
import onTheGoSnack from "../assets/on-the-go-snack.png"

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
        }
        };

        getImageByType();
    }, []);

    return imageMeal;
};

export default useMealImages;
