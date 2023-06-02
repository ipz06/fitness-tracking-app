import { ref, update, get } from 'firebase/database';
import { db } from '../config/firebase-config';


export const updateUserRole = async (handle, role) => {
   const updates = {
     [`/users/${handle}/role`]: role,
   };
 
   return update(ref(db), updates);
 };

 export const getUserMeals = (handle)=>{
   const mealRef = ref(db,`/nutritions/${handle}`)
   return get(mealRef)
 }