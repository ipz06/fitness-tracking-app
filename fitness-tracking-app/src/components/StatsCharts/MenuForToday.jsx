import {  Card, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../common/context";
import { useState, useEffect, useRef } from "react";
import { getNutrition } from "../../services/nutrition.service";
import CarouselItem from "./CarouselItem";
import Slider from "react-slick";

const settings = {
  infinite: true,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const MenuForToday = () => {

  const [calNutrition, setCalNutrition] = useState([])
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  // const [imageMeal, setImageMeal] = useState("")



  const getCaloriesFromNutrition = async (user) => {
    try {
      const fetchCalFromNutrition = await getNutrition(user.displayName); 
      console.log("fetch CALORIES", fetchCalFromNutrition)
   
      const kcal = Object.values(fetchCalFromNutrition).filter(meal => {
        const today = new Date();
        console.log('today', today);
       const dayOfMonth = today.getDate();
       console.log('daOFMonth', dayOfMonth);
       const logged = new Date(meal.timestamp)
       const dateLogged = logged.getDate()
       console.log("dateLogged",dateLogged)
       if (dayOfMonth === dateLogged) {
        console.log("MEAl", meal)
        return meal;
       }
      })
      console.log("KCAL", kcal)
      setCalNutrition(kcal);
      console.log("CALNUTRITION", calNutrition)
    } catch (error) {
      return "Error fetching calories:", error;
    } 
  };

  useEffect(() => {
    getCaloriesFromNutrition(user);
  }, [user]);

    return (
      <Flex>
         <Card
          h={{ base: "250px", md: "300px", lg: "300px" }}
          w={{ base: "400px", md: "2xl", lg: "3xl" }}
          marginX={"auto"}
          >   
            {/* <Flex>
              <Carousel>
                {calNutrition.map((meal, i) => (       
                  <CarouselItem  
                  key={i} 
                  title={meal.title}
                  calories={meal.calories}
                  typeMeal={meal.typeMeal}
                  ref={index === i ?
                    selectedRef :
                    null
                  }/>
                ))}
                </Carousel>
              </Flex> */}
              <Slider {...settings}>
                {calNutrition.map((meal, i) => (       
                  <CarouselItem  
                  key={i} 
                  title={meal.title}
                  calories={meal.calories}
                  typeMeal={meal.typeMeal}
                />
                ))}
              </Slider>
        </Card>
      </Flex>
    )
}

export default MenuForToday;