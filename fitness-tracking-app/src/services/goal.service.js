import {
         ref,
         child,
         update, get, query, orderByChild, equalTo, push, onValue, remove, limitToLast, runTransaction, set
         } from "firebase/database";
import { db } from "../config/firebase-config";
import "firebase/database";
import { toast } from 'react-toastify';

export const addUserGoal = (user,type,startDate,interval=0,targetDate=0,target)=>{
   const goalData ={
         author: user,
         type: type,
         startDate: startDate,
         interval: interval*7*24*3600*1000,
         targetDate: targetDate,
         target: target
       };
   const newGoalKey = push(child(ref(db), "Goal")).key;
   const updates = {};
   updates["/goals/" + user + "/" +  newGoalKey]=goalData
   update(ref(db), updates)
       .then(()=>{
         toast('Goal updated',{
          autoClose:500
         })
       })
       .catch((e)=>{
         console.log(e.message)
       })
}

export const addUserWeightGoal = (user,type,startDate,interval=0,targetDate=0,target,startWeight)=>{
  const goalData ={
        author: user,
        type: type,
        startDate: startDate,
        interval: interval*7*24*3600*1000,
        targetDate: targetDate,
        target: target,
        startWeight: startWeight
      };
  const newGoalKey = push(child(ref(db), "Goal")).key;
  const updates = {};
  updates["/goals/" + user + "/" +  newGoalKey]=goalData
  update(ref(db), updates)
      .then(()=>{
        console.log('Goal updated')
      })
      .catch((e)=>{
        console.log(e.message)
      })
}

export const readUserGoal = (user,setGoals) => {
  const userGoalsRef = ref(db,`goals/`+user )
  onValue(userGoalsRef,(snapshot)=>{
    setGoals(snapshot.val())
  })
}

export const deleteUserGoal = (user,key) => {

  const goalReference = ref(db,`goals/${user}/${key}`)
  remove(goalReference)
    .then(()=>console.log('ok'))
    .catch((e)=>console.log(e))

}

export const calculateMinutes = (data, startDate, interval, target)=>{
  const now = Date.now()
  let result = 0
  
  const periods = Math.floor((now-startDate)/interval)
  const filterDate =  startDate+periods*interval

  const min = Object.keys(data)
    .filter(el=>el>=filterDate)
    .reduce((acc,el)=>{
      acc+=+data[el]['duration']
      return acc
    },0)
  if(target - min<=0){
    result = 0
  } else {
    result = target-min
  }
  return result
}

export const calculateWorkouts = (data, startDate, interval, target) => {
  const now = Date.now()
  let result = 0
  const periods = Math.floor((now-startDate)/interval)
  const filterDate =  startDate+periods*interval
  const workouts = Object.keys(data)
    .filter(el=>el>=filterDate)

  if ( target - workouts.length <= 0) {
    result = 0
  } else {
    result = target - workouts.length
  }
  return result 
}

export const calculateTargetDate = (startDate, interval) => {
  const now = Date.now()
  
  const periods = Math.floor((now-startDate)/interval)
  const filterDate =  startDate+periods*interval
  const targetDate = filterDate + interval
  let dateISO = new Date(targetDate)
  return dateISO.toLocaleDateString()

   
}

export const getUserLog = (user)=>{
  const logRef = ref(db,`log-activity/${user}`)
  return get(logRef)
}

export const getLastWeight = (user) => {
  const lastWeightQuery = query(ref(db,`log-weight/${user}`),limitToLast(1))
  return get(lastWeightQuery)
}

export const addBadge = (handle,goalId,type) => {
  const userRef = ref(db,`users/${handle}`)
  runTransaction(userRef, (user)=>{
    if(user){
      if(!user.goalsCompleted){
        user.goalsCompleted={}
      }
      if(!user.goalsCompleted[goalId]){
        user.goalsCompleted[goalId]=type
        toast(`badge ${type}`,{
          autoClose:1000,
       })
      }
    }
    return user
  })
  .then(()=>{
    console.log('run transaction')
  })
  .catch((e)=>console.log(e))
}

export const getBadges = (handle) => {
  const badgeRef = ref(db,`users/${handle}/goalsCompleted`)
  return get(badgeRef)
}
/**
 * Returns the desired hour in milliseconds on the present date.
 * @param {number} hour 
 * @param {number} minutes 
 * @param {number} seconds 
 * @returns the time in milliseconds at the hour:minutes:seconds for today
 */
export const startTimeCaloriesGoal = (hour, minutes, seconds)=>{
  let now = new Date();
  let dateWithDesiredTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(),hour, minutes, seconds);
  let startTime = dateWithDesiredTime.getTime();
  return startTime;
}

export const getUserNutritionLog = (user)=>{
  const logRef = ref(db,`log-nutrition/${user}`)
  return get(logRef)
}

/**
 * 
 * @param {object} data - the user log of calories
 * @param {number} startDate - the start date in milliseconds
 * @param {number} interval - the interval in milliseconds(hard coded to 24hrs)
 * @param {number} target - the desired calorie goal
 * @returns - the calories left for the day
 */
export const calculateCalories = (data, startDate, interval, target)=>{
  const now = Date.now()
  let result = 0
  
  const periods = Math.floor((now-startDate)/interval)
  const filterDate =  startDate+periods*interval

  const calories = Object.keys(data)
    .filter(el=>el>=filterDate)
    .reduce((acc,el)=>{
      acc+=+data[el]['calories']
      return acc
    },0)
  if(target - calories<=0){
    result = 0
  } else {
    result = target-calories
  }
  return result
}

export const  updateUserGoalTarget = (handle, goalID, target) => {

  const targetPath = ref(db,`goals/${handle}/${goalID}/target`)
  set(targetPath,target)
    .then(()=>console.log('Target updated'))
    .catch((e)=>console.log(e))

}

export const shareUserGoal = (handle, goalID, shared) => {
  const goalPath = ref(db,`goals/${handle}/${goalID}/shared`)
  set(goalPath,shared)
    .then(()=>console.log('Shared state updated'))
    .catch((e)=>console.log(e))
}

export const filterSharedGoals= (data)=>{
  let result = {}
  const keys = Object.keys(data)
  keys.map((key)=>{
    if(data[key]['shared']){
      result[key]=data[key]
    }
  })
  return result
}

export const getAllCreatedGoals = async () => {
  try {
    const allGoals = query(ref(db, `goals`));
    const snapshot = await get(allGoals);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};