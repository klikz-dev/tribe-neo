importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyAOg7DiR0iacQPO7jlix_6MgWe3JXhfGtg',
  authDomain: 'tribeplatform.firebaseapp.com',
  projectId: 'tribeplatform',
  storageBucket: 'tribeplatform.appspot.com',
  messagingSenderId: '1081893321319',
  appId: '1:1081893321319:web:baed5f30cea3272be9f2c2',
  measurementId: 'G-VQ1KRW18TJ',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
  //   console.log(
  //     '[firebase-messaging-sw.js] Received background message ',
  //     payload,
  //   )

  const {
    notification: { title, body, image },
  } = payload

  self.registration.showNotification(title, { body, icon: image })
})
