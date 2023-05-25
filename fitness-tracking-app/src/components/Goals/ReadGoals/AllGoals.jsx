import {ref, onValue} from "firebase/database";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../common/context";
import { db } from "../../../config/firebase-config";
import "firebase/database";
import RenderStayToned from "./RenderStayToned";
import RenderStayActive from "./RenderStayActive";
import RenderLooseWeight from "./RenderLooseWeight";




const AllGoals = () => {
   const {handle} = useContext(AuthContext)
   const [goals, setGoals] = useState({});
   const [loading, setLoading] = useState(false);

   useEffect(()=>{
      setLoading(true)
      try{
         const dbRef = ref(db,`goals/`+handle )
         const handleGoals = snap =>{
            if(snap.val()) {
               setGoals(snap.val())
            }
         }
         onValue(dbRef,(snapshot)=>{
            handleGoals(snapshot)
         })
      } catch(e) {
         console.log(e)
      } finally {
         setLoading(false)
      }
   },[])

   if(loading){
      return(
         <div>
            Loading..
         </div>
      )
   } else {

   return (
      Object.keys(goals)
         .map((id)=>{
            if(goals[id]['type']==='stay-toned') {
               return(
                  <div key={id}>
                     <RenderStayToned title={goals[id]['type']} workouts={goals[id]['target']} interval={goals[id]['interval']} value={40} handle={handle} goalID={id} startDate={goals[id]['startDate']}/>
                  </div>
               )
            } else if (goals[id]['type']==='stay-active') {
               return(
                  <div key={id}>
                     <RenderStayActive title={goals[id]['type']} minutes={goals[id]['target']} interval={goals[id]['interval']} value={40} handle={handle} goalID={id} startDate={goals[id]['startDate']}/>
                  </div>
               )
            } else if (goals[id]['type']==='loose-weight') {
               return(
                  <div key={id}>
                     <RenderLooseWeight title={goals[id]['type']} targetWeight={goals[id]['target']} targetDate={goals[id]['targetDate']} value={40} handle={handle} goalID={id}/>
                  </div>
               )
            }
         })
   )
      }
}

export default AllGoals