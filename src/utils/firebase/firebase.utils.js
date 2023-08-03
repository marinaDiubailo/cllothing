import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCFluJ1rohfb8S_XSpOTziLW_faOgOdYjE',
	authDomain: 'crwn-clothing-850d2.firebaseapp.com',
	projectId: 'crwn-clothing-850d2',
	storageBucket: 'crwn-clothing-850d2.appspot.com',
	messagingSenderId: '316005690953',
	appId: '1:316005690953:web:db7fc9fab9f6095c0dd998',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = cb => onAuthStateChanged(auth, cb);
