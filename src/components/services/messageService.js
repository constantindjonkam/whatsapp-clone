import db from "../../firebase";
import firebase from "firebase/app";

export const addMessage = async (
  message = "",
  groupId,
  name,
  email,
  image = ""
) => {
  const date = firebase.firestore.FieldValue.serverTimestamp();

  const result = await db
    .collection("messages")
    .add({ message, name, date, groupId, email, image });
  if (result) console.log("Document successfully written!"); //render double tick icon

  db.collection("groups").doc(groupId).update({ date, lastMessage: message });
};

export const getMessages = (myFunction) => {
  db.collection("messages")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) =>
      myFunction(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
};
