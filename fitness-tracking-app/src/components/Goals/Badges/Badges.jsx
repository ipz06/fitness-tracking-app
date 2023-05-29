import { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database";
import {
   HStack,  
   Image,
   Spacer
} from '@chakra-ui/react';
import { db } from "../../../config/firebase-config";
import "firebase/database";
import BadgeActive from '../../../assets/badge-active.png'
import BadgeActiveL1 from '../../../assets/badge-active-level1.png'
import BadgeToned from '../../../assets/badge-stay-toned.png'
import BadgeTonedL1 from '../../../assets/badge-toned-level1.png'
import BadgeHydrated from '../../../assets/badge-hydrated.png'




const Badges = ({handle}) =>{
   const [loading, setLoading ] = useState()
   const [toned, setToned] =useState(0)
   const [active,setActive] = useState(0)
   useEffect(()=>{
      setLoading(true)
      const dbRef = ref(db,`users/${handle}/goalsCompleted`)
      const handleData = (snap)=>{
         if(snap.exists()){
               const act =  Object.keys(snap.val())
                     .filter((el)=>{
                           if(snap.val()[el]==='StayActive'){
                              return true
                           } else {
                              return false
                           }
                     })
               setActive(act.length)
               const ton = Object.keys(snap.val())
                     .filter((el)=>{
                           if(snap.val()[el]==='StayToned'){
                              return true
                           } else {
                              return false
                           }
                     })
               setToned(ton.length)
         }
      }
      return onValue(dbRef, (snapshot) => {
                           handleData(snapshot);
                           setLoading(false); 
                        }, (error) => {
                           console.error(error); 
                           setLoading(false); 
                        });

   },[])

   if(loading){
      return(
         <div>
            Loading..
         </div>
      )
   } else {
   

   const renderActive = (active) => {
      const result = []
      if(active>0){
         result.push(BadgeActive)
      }
      if(active>3){
         result.push(BadgeActiveL1)
      }
      if(active === 0) {
         return
      }

      return (
         result.map((el,i) =>{
            return (
               <Image key={i}
               src ={el}
               h='50px'
               />
            )
         })
      )
   }

   const renderToned = (toned) => {
      const result = []
      if(toned>0){
         result.push(BadgeToned)
      }
      if(toned>3){
         result.push(BadgeTonedL1)
      }
      if(toned === 0) {
         return
      }
      return (
         result.map((el,i) =>{
            return (
               <Image key={i}
               src ={el}
               h='50px'
               />
            )
         })
      )
   }

   return(
      <HStack w={'300px'} marginX={'auto'} marginY={'auto'} align="center" justify="center" marginBottom={'5'}>
         {renderActive(active)}
         {renderToned(toned)}
      </HStack>
      // <HStack w={'300px'} marginX={'auto'} marginY={'auto'}>
      //    <Image 
      //          src ={BadgeActive}
      //          h='50px'
      //          marginLeft={'5'}/>
      //    <Image 
      //          src ={BadgeActiveL1}
      //          h='50px'
      //          marginLeft={'5'}/>
      //    <Image 
      //          src ={BadgeToned}
      //          h='50px'
      //          marginLeft={'5'}/>
      //    <Image 
      //          src ={BadgeTonedL1}
      //          h='50px'
      //          marginLeft={'5'}/>
      //    <Image 
      //          src ={BadgeHydrated}
      //          h='50px'
      //          marginLeft={'5'}/>  
      // </HStack>
   )
   }

}

export default Badges