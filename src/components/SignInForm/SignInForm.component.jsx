import { useState } from 'react';
import {
	signInWithGooglePopup,
	createUserDocFromAuth,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../FormInput/FormInput.component';
import Button from '../Button/Button.component';
import './SignInForm.style.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = event => {
		const { name, value } = event.target;
		setFormFields(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocFromAuth(user);
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onSubmitHandler = async event => {
		event.preventDefault();

		try {
			const res = await signInAuthUserWithEmailAndPassword(email, password);
			console.log(res);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password');
					break;
				case 'auth/user-not-found':
					alert('no user found with this email');
					break;
				default:
					console.log(error.message);
			}
		}
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={onSubmitHandler}>
				<FormInput
					label='Email'
					name='email'
					type='email'
					required
					onChange={handleChange}
					value={email}
				/>
				<FormInput
					label='Password'
					name='password'
					type='password'
					required
					onChange={handleChange}
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						buttonType='google'
						onClick={signInWithGoogle}
					>
						{' '}
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
