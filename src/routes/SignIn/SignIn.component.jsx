import {
	signInWithGooglePopup,
	createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';
import './Signin.styles.scss';

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocFromAuth(user);
	};

	return (
		<>
			<div className='sign'>SignIn</div>
			<button onClick={logGoogleUser}>Sign in With Google Popup</button>
		</>
	);
};

export default SignIn;
