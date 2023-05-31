import { ref, child, update, get, query, remove } from "firebase/database";
import { db } from "../config/firebase-config";
import { push } from "firebase/database";
import "firebase/database";

export const saveFriendRequestToDatabase = async (
  receiver,
  sender,
  photo,
  email
) => {
  try {
    const friendRequestData = {
      sender: sender,
      createdOn: new Date().toLocaleDateString(),
      status: "pending",
      photo: photo,
      email: email,
    };

    const newFriendRequestKey = push(child(ref(db), "friend-requests")).key;
    const updates = {};
    updates["/friend-requests/" + receiver + "/" + newFriendRequestKey] = {
      ...friendRequestData,
      friendRequestKey: newFriendRequestKey,
    };
    return update(ref(db), updates);
  } catch (error) {
    console.log(error);
  }
};

export const getUserFriendRequests = async (handle) => {
  try {
    const snapshot = await get(query(ref(db, `friend-requests/${handle}`)));
    if (snapshot.exists()) {
      const friendREquests = Object.values(snapshot.val());
      return friendREquests;
    }
    return [];
  } catch (error) {
    console.log("Error retrieving user friend requests:", error);
    throw error;
  }
};

export const saveFriendToDatabase = async (userPhoto, handle, userEmail,  photo, sender, email) => {
  try {
    const friendRequestData = {
      user: sender,
      addOn: new Date().toLocaleDateString(),
      photo: photo,
      email: email,
    };

    const newFriendKey = push(child(ref(db), "friends")).key;
    const receiverUpdates = {};
    receiverUpdates["/friends/" + handle + "/" + sender] = {
      ...friendRequestData,
      friendKey: newFriendKey,
    };
    await update(ref(db), receiverUpdates);
    const senderUpdates = {};
    senderUpdates["/friends/" + sender + "/" + handle] = {
      user: handle,
      addOn: new Date().toLocaleDateString(),
      photo: userPhoto,
      email: userEmail,
      friendKey: newFriendKey,
    };
    await update(ref(db), senderUpdates);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFriendRequestFromDatabase = async (
  handle,
  friendRequestKey
) => {
  try {
    const friendRequestRef = ref(
      db,
      `friend-requests/${handle}/${friendRequestKey}`
    );
    await remove(friendRequestRef);
  } catch (error) {
    console.log("Error deleting activity:", error);
    throw error;
  }
};

export const getUserAllFriends = async (handle) => {
  try {
    const snapshot = await get(query(ref(db, `friends/${handle}`)));
    if (snapshot.exists()) {
      const friends = Object.values(snapshot.val());
      return friends;
    }
    return [];
  } catch (error) {
    console.log("Error retrieving user friends", error);
    throw error;
  }
};


export const deleteFriendsFromDatabase = async (
  handle,
  receiver,
) => {
  console.log("Deleting friends:", handle, receiver); // Debug log
  try {
    const handleRef = ref(
      db,
      `friends/${handle}/${receiver}`
    );
    await remove(handleRef);
    const receiverRef = ref(
      db,
      `friends/${receiver}/${handle}`
    );
    await remove(receiverRef);
  } catch (error) {
    console.log("Error deleting friends:", error);
    throw error;
  }
};