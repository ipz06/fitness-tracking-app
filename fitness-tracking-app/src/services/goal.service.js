import {
         ref,
         child,
         update, get, query, orderByChild, equalTo, push, onValue, remove, limitToLast
         } from "firebase/database";
import { db } from "../config/firebase-config";
import "firebase/database";

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
         console.log('Goal updated')
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
  
  const periods = Math.floor((now-startDate)/interval)
  const filterDate =  startDate+periods*interval

  const min = Object.keys(data)
    .filter(el=>el>=filterDate)
    .reduce((acc,el)=>{
      acc+=+data[el]['duration']
      return acc
    },0)

  return (target - min)
}

export const calculateWorkouts = (data, startDate, interval, target) => {
  const now = Date.now()
  
  const periods = Math.floor((now-startDate)/interval)
  const filterDate =  startDate+periods*interval
  const workouts = Object.keys(data)
    .filter(el=>el>=filterDate)

  return target - workouts.length
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
