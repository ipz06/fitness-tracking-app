import {ref, onValue} from "firebase/database";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase-config";
import { db } from "../../../config/firebase-config";
import "firebase/database";
import { filterSharedGoals } from "../../../services/goal.service";
import RenderStayToned from "../ReadGoals/RenderStayToned";
import RenderStayActive from "../ReadGoals/RenderStayActive";
import RenderLooseWeight from "../ReadGoals/RenderLooseWeight";
import RenderTrackCalories from "../ReadGoals/RenderTrackCalories";

const AllFriendGoals = ({handle})=>{

   const [goals, setGoals] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(()=>{
      setLoading(true)
      try{
         const dbRef = ref(db,`goals/`+handle )
         const handleGoals = snap =>{
            if(snap.val()) {
               const data = filterSharedGoals((snap.val()))
               setGoals(data)
               setLoading(false)
            }
         }
         onValue(dbRef,(snapshot)=>{
            handleGoals(snapshot)
         })
      } catch(e) {
         console.log(e)
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
      
      goals? (
         <>
         <div> Goals of {handle}</div>
         {Object.keys(goals)
            .map((id)=>{
                  if(goals[id]['type']==='stay-toned') {
                     return(
                        <div key={id}>
                           <RenderStayToned title={goals[id]['type']} workouts={goals[id]['target']} interval={goals[id]['interval']} value={40} handle={handle} goalID={id} startDate={goals[id]['startDate']} sharedStatus={goals[id]['shared']} owner={false}/>
                        </div>
                     )
                  } else if (goals[id]['type']==='stay-active') {
                     return(
                        <div key={id}>
                           <RenderStayActive title={goals[id]['type']} minutes={goals[id]['target']} interval={goals[id]['interval']} value={40} handle={handle} goalID={id} startDate={goals[id]['startDate']} sharedStatus={goals[id]['shared']} owner={false}/>
                        </div>
                     )
                  } else if (goals[id]['type']==='loose-weight') {
                     return(
                        <div key={id}>
                           <RenderLooseWeight title={goals[id]['type']} targetWeight={goals[id]['target']} targetDate={goals[id]['targetDate']} value={40} handle={handle} goalID={id} startWeight={goals[id]['startWeight']} sharedStatus={goals[id]['shared']} owner={false}/>
                        </div>
                     )
                  } else if(goals[id]['type']==='track-calories') {
                     return (
                        <div key={id}>
                           <RenderTrackCalories title={goals[id]['type']} calories={goals[id]['target']} interval={goals[id]['interval']} value={40} handle={handle} goalID={id} startDate={goals[id]['startDate']} sharedStatus={goals[id]['shared']} owner={false}/>
                        </div>
                     )
               }
            })}
            </>
         
      ):(
         <div>No shared goals</div>
      )
      
      )
   }
   
      
}

export default AllFriendGoals