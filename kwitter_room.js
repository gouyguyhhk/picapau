//Añade los enlaces de Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBioAmYBO3184_Oza4hIDdNVBaDAO1LgNs",
  authDomain: "xpirata-cd9d3.firebaseapp.com",
  databaseURL: "https://xpirata-cd9d3-default-rtdb.firebaseio.com",
  projectId: "xpirata-cd9d3",
  storageBucket: "xpirata-cd9d3.appspot.com",
  messagingSenderId: "57192714690",
  appId: "1:57192714690:web:b17289d2a5329ec7a1465b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function updateLike(message_id){
  console.log("clickeo el boton like -" + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  update_likes = Number(likes) + 1;
  console.log(update_likes);
  
  firebase.database().ref(room_name).child(message_id).update({
      like: update_likes
  });
}


getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}