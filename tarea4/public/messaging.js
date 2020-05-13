const tokenDivId = "token_div";
const permissionDivId = "permission_div";

const tokenString = document.getElementById("token");
const errorMessage = document.getElementById("error");
const message = document.getElementById("message");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVjgx4YN7wyEvCLiGG2it_-rKmeDOISPg",
  authDomain: "pwa-web-avanzado.firebaseapp.com",
  databaseURL: "https://pwa-web-avanzado.firebaseio.com",
  projectId: "pwa-web-avanzado",
  storageBucket: "pwa-web-avanzado.appspot.com",
  messagingSenderId: "793954592113",
  appId: "1:793954592113:web:c18aa63a3eac37ee7882d0",
  measurementId: "G-XZNKJ15WDB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BIdpW0Ag1LA3Pb7rAtYF6NtslZWOlBHqOKKUJST-o872oJMTz0t7If4PQdRcaNXVgnphLDxF5IN28xCpLFwU8WI"
);

messaging
  .requestPermission()
  .then(() => {
    message.innerHTML = "Notifications allowed";
    return messaging.getToken();
  })
  .then((token) => {
    fetch(`https://lace-near-swordtail.glitch.me/token?token=${token}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => console.log("messaging fetch", response));
    tokenString.innerHTML = token;
  })
  .catch((err) => {
    errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
    console.log("No permission to send push", err);
  });

messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  const { title, ...options } = payload.notification;
  message.innerHTML = `${title}`;
});
