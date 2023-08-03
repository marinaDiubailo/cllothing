import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../FormInput/FormInput.component';
import './SignUpForm.style.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = event => {
		const { name, value } = event.target;
		setFormFields(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onSubmitHandler = async event => {
		event.preventDefault();
		if (password !== confirmPassword) {
			return alert('password do not match!!');
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log(error.message);
			}
		}
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={onSubmitHandler}>
				<FormInput
					label='Display Name'
					name='displayName'
					type='text'
					required
					onChange={handleChange}
					value={displayName}
				/>
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
				<FormInput
					label='Confirm Password'
					name='confirmPassword'
					type='password'
					required
					onChange={handleChange}
					value={confirmPassword}
				/>
				<button type='submit'>Sign In</button>
			</form>
		</div>
	);
};

export default SignUpForm;
