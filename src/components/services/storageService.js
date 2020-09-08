import { storage } from "../../firebase";
import { addMessage } from "./messageService";
import { updateGroupImage } from "./groupService";

export default function handleUpload(
  e,
  folder,
  setProgress,
  message = "",
  groupId,
  name,
  email
) {
  let image;
  if (e.target.files[0]) image = e.target.files[0];

  //compress images

  const uploadTask = storage.ref(`${folder}/${image.name}`).put(image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progressStatus = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progressStatus);
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => addMessage(message, groupId, name, email, url));
    }
  );
}

export function updateGroupImages(e, groupId, setProgress = "") {
  let image;
  if (e.target.files[0]) image = e.target.files[0];

  //compress images

  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progressStatus = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progressStatus);
      // setProgress(progressStatus);
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => updateGroupImage(groupId, url));
    }
  );
}
