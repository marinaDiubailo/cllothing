import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
	auth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
	createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';
import './Signin.styles.scss';

const SignIn = () => {
	useEffect(() => {
		(async () => {
			const res = await getRedirectResult(auth);
			if (res) {
				const userDocRef = await createUserDocFromAuth(res.user);
			}
		})();
	}, []);
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocFromAuth(user);
	};

	return (
		<>
			<div className='sign'>SignIn</div>
			<button onClick={logGoogleUser}>Sign in With Google Popup</button>
			<button onClick={signInWithGoogleRedirect}>
				Sign in With Google Redirect
			</button>
		</>
	);
};

export default SignIn;
