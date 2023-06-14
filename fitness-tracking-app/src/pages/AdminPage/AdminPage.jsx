import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../common/context";
import DividerHeader from "../../components/Goals/Divider";
import { CircularProgress } from "@chakra-ui/react";
import UsersTable from "./UsersTable";
import {USER_TYPE} from '../../common/constants'
import NewUsersStats from "./NewUsersStats";
import UserActivityStats from "./UsersActivityStats";
import {ref, onValue} from "firebase/database";
import { db } from "../../config/firebase-config";
import "firebase/database";

const AdminPage = () =>{

   const {role, handle} = useContext(AuthContext)
   const [loading, setLoading] = useState(true);
   const [users, setUsers] = useState(null)

   useEffect(()=>{
      setLoading(true)
         try{
            const dbRef = ref(db, `users`)
            const handleUsers = snap =>{
               if(snap.val()) {
                  setUsers(snap.val())
               }
               setLoading(false)
            }
            onValue(dbRef,(snapshot)=>{
               handleUsers(snapshot)
            })
         } catch(e) {
            console.log(e)
         }
   },[])

   if (role !== USER_TYPE.ADMIN && role !== USER_TYPE.SUPER_ADMIN) {
      return <div>Please sign in as admin....</div>;
    }
   if (loading) {
   return <div><CircularProgress value={80} /></div>;
   }


   return (
      <>
         <DividerHeader heading={'admin panel'}/>
         <UsersTable
                  keys={Object.keys(users)}
                  allUsers={users}
                  items={4}
                  role={role}
                  />
         <NewUsersStats/>
         <UserActivityStats/>
      </>

   )
}

export default AdminPage