import {ref, onValue} from "firebase/database";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase-config";
import { db } from "../../../config/firebase-config";
import "firebase/database";
import RenderStayToned from "./RenderStayToned";
import RenderStayActive from "./RenderStayActive";
import RenderLooseWeight from "./RenderLooseWeight";




const AllGoals = () => {
   //const { user} = useContext(AuthContext)
   const [goals, setGoals] = useState(null);
   const [loading, setLoading] = useState(false);
   const [user] = useAuthState(auth);

   useEffect(()=>{
      setLoading(true)
      try{
         const dbRef = ref(db,`goals/`+user.displayName )
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
      goals? (
         Object.keys(goals)
         .map((id)=>{
            if(goals[id]['type']==='stay-toned') {
               return(
                  <div key={id}>
                     <RenderStayToned title={goals[id]['type']} workouts={goals[id]['target']} interval={goals[id]['interval']} value={40} handle={user.displayName} goalID={id} startDate={goals[id]['startDate']}/>
                  </div>
               )
            } else if (goals[id]['type']==='stay-active') {
               return(
                  <div key={id}>
                     <RenderStayActive title={goals[id]['type']} minutes={goals[id]['target']} interval={goals[id]['interval']} value={40} handle={user.displayName} goalID={id} startDate={goals[id]['startDate']}/>
                  </div>
               )
            } else if (goals[id]['type']==='loose-weight') {
               return(
                  <div key={id}>
                     <RenderLooseWeight title={goals[id]['type']} targetWeight={goals[id]['target']} targetDate={goals[id]['targetDate']} value={40} handle={user.displayName} goalID={id} startWeight={goals[id]['startWeight']}/>
                  </div>
               )
            }
         })
      ):(
         <div>add some goals</div>
      )
      
   )
      }
}

export default AllGoals