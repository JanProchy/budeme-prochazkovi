importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBTq22Zcc_z8hRj1JLGcf-YcgeckQ5Oouc",
  authDomain: "budeme-prochazkovi.firebaseapp.com",
  projectId: "budeme-prochazkovi",
  messagingSenderId: "635400757513",
  appId: "1:635400757513:web:20d6526b7fb3515981b3d8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/assets/favicon-32x32.png",
  });
});
