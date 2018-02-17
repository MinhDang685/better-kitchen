//Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDy7SVdKJpujVTPpgXhwtzw5YsZCMkRRus",
  authDomain: "better-kitchen.firebaseapp.com",
  databaseURL: "https://better-kitchen.firebaseio.com",
  projectId: "better-kitchen",
  storageBucket: "better-kitchen.appspot.com",
  messagingSenderId: "38255703807"
};
export function getCurrentUser(firebaseRef) {
	return firebaseRef.auth().currentUser;
}
export const colors = [
	"#89bdd3",
	"#6ed3cf",
	"#9068be",
	"#e62739",
	"#fae596",
	"#3fb0ac",
	"#173e43",
	"#b56969",
	"#daad86",
];