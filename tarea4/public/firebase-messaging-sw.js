importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js");


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

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notification = JSON.parse(payload.data.notification);
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
  };
  //Show the notification :)
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
