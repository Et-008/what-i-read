import { getDatabase, ref, set, child, get, push } from "firebase/database";

function writeUserData(data) {
  const { userId, name, email, imageUrl } = data;
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

function getUserData(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function addUserBlog(data) {
  const db = getDatabase();

  const postListRef = ref(db, "posts/");
  const newPostRef = push(postListRef);
  set(newPostRef, data)
}

export { writeUserData, getUserData, addUserBlog };
