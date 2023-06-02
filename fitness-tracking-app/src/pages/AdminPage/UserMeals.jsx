import { Flex, Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealView from "../../components/MealView/MealView"
import { getUserMeals } from "../../services/admin.service";
import DividerHeader from "../../components/Goals/Divider";
import { ref, onValue } from 'firebase/database';
import { db } from "../../config/firebase-config";



const UserMeals = () => {
   const [loading, setLoading] = useState(false)
   const {handle} = useParams()
   const [nutritions, setNutritions] = useState([]);

   useEffect(() => {
      setLoading(true)
      try{
         const dbRef = ref(db,`/nutritions/${handle}`)
         const handleMeals = snap =>{
            if(snap.val()) {
               setNutritions(snap.val())
            }
            for(const key in snap.val()){
               console.log(key)
            }
         }
         onValue(dbRef,(snapshot)=>{
            handleMeals(snapshot)
         })
      } catch(e) {
         console.log(e)
      } finally {
         setLoading(false)
      }
    }, [handle]);
   if (loading) {
      return (
         <div>
            Loading...
         </div>
      )
   }

   return (
      <>
      <DividerHeader heading={`Saved meals of ${handle}`} />
      <Box flex="2" p="2" maxW="70%" mx="auto" >
        <SimpleGrid columns={[1, 2, 3]}  > 
          { nutritions && Object.keys(nutritions).map((key) => (
          <MealView
                    author={handle}
                    nutritionKey={key}
                    key={key}
                    addOn={nutritions[key]['addOn']}
                    title={nutritions[key]['title']}
                    weight={nutritions[key]['weight']}
                    calories={nutritions[key]['calories']}
                    ingredients={nutritions[key]['ingredients']}
                    sharedStatus={nutritions[key]['shared']}
          />
          ))}
        </SimpleGrid>
      </Box>
      </>
   )
}

export default UserMeals