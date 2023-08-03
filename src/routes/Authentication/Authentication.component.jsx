import {
	signInWithGooglePopup,
	createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/SignUpForm/SignUpForm.component';
import './Signin.styles.scss';

const Authentication = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocFromAuth(user);
	};

	return (
		<div>
			<div className='sign'>SignIn</div>
			<button onClick={logGoogleUser}>Sign in With Google Popup</button>
			<SignUpForm />
		</div>
	);
};

export default Authentication;
