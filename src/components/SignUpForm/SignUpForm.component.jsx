import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';

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
		<div>
			<h1>Sign up with your email and password</h1>
			<form onSubmit={onSubmitHandler}>
				<label htmlFor='name'>Display Name</label>
				<input
					name='displayName'
					id='name'
					type='text'
					required
					onChange={handleChange}
					value={displayName}
				/>
				<label htmlFor='email'>Email</label>
				<input
					name='email'
					id='email'
					type='email'
					required
					onChange={handleChange}
					value={email}
				/>
				<label htmlFor='password'>Password</label>
				<input
					name='password'
					id='password'
					type='password'
					required
					onChange={handleChange}
					value={password}
				/>
				<label htmlFor='confirm'>Confirm Password</label>
				<input
					name='confirmPassword'
					id='confirm'
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
