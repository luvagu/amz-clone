import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyDGxHaGeReMV4ZYbSroiD-XwdQ-Dv3gzdc',
	authDomain: 'amz-react-clone.firebaseapp.com',
	databaseURL: 'https://amz-react-clone.firebaseio.com',
	projectId: 'amz-react-clone',
	storageBucket: 'amz-react-clone.appspot.com',
	messagingSenderId: '12733003364',
	appId: '1:12733003364:web:4e598a05342e659f1a5171',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth } 