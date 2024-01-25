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
  room_name = localStorage.getItem("room_name");

  document.getElementById("sala").innerHTML = "¡Hola " + user_name + "!" + " Bienvenido a la sala: " + room_name;


  function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message: msg,
        like:0
    });

    document.getElementById("msg").value = "";
  }

  function getData(){
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose"){
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag ="<h4> "+ name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>"; 

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
          } 
        });
    });
  }

  getData();

  function updateLike(message_id){
  console.log("clickeaste el boton like");
  button_id = message_id;
  likes =document.getElementById(button_id).value;
  update_likes = Number(likes) +1;
firebase.database().ref(room_name).child(message_id).update({
  like:  update_likes
  });

  }

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
  }

  function roomChange(){
    localStorage.removeItem("room_name");
    window.location.replace("kwitter_room.html");
  }