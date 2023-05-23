import {
	ref,
	child,
	update, get, query, orderByChild, equalTo,
  } from "firebase/database";
  import { db } from "../config/firebase-config";
  import { push } from "firebase/database";
  import "firebase/database";
  
  export const saveLogToDatabase = async (user, logData) => {
	const now = Date.now() //newLogActivity = push(ref(db, `/log/${user}`)).key;
	const updates = {};
	updates[`/log-activity/${user}/${now}`] = logData;
	return update(ref(db), updates);
  };