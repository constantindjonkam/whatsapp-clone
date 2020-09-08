import { auth, provider } from "../../firebase";

export default async function () {
  const { user } = await auth.signInWithPopup(provider);
  if (user) return user;
  alert("An error occurred during sign up. Please try again");
  return null;
}

// export default function (myFunction) {
//   auth
//     .signInWithPopup(provider)
//     .then((result) => {
//       myFunction(result.user);
//       localStorage.setItem("x-auth-token", result.user.refreshToken);
//     })
//     .catch((err) => alert(err.message));
// }
