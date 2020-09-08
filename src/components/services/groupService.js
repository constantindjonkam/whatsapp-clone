import db from "../../firebase";
import firebase from "firebase/app";

export const addGroup = async (name, email, image = "") => {
  if (!name) return;

  const result = await db.collection("groups").add({
    name,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    image,
    members: email,
    admin: true,
  });
  if (result) console.log("Group Added!");
};

export const getGroups = (myFunction, email) => {
  db.collection("groups")
    .where("members", "array-contains", email ? email : "")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) =>
      myFunction(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
};

export const addMemberToGroup = async (groupId, email) => {
  if (!email) return;

  const result = await db
    .collection("groups")
    .doc(groupId)
    .update({ members: firebase.firestore.FieldValue.arrayUnion(email) });

  if (result) console.log("Added");
};

export const removeMemberFromGroup = async (groupId, email) => {
  if (!email) return;

  const result = await db
    .collection("groups")
    .doc(groupId)
    .update({ members: firebase.firestore.FieldValue.arrayRemove(email) });

  if (result) console.log("Removed");
};

export const updateGroupName = async (groupId, name) => {
  if (!name) return;

  db.collection("groups").doc(groupId).update({ name });
};

export const updateGroupImage = async (groupId, image) => {
  if (!image) return;

  db.collection("groups").doc(groupId).update({ image });
};
