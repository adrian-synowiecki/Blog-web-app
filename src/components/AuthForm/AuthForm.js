import React, { useState, useRef, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useLocation } from 'react-router-dom';

import * as S from './AuthForm.style';

import ErrorList from 'components/ErrorList/ErrorList';

function AuthForm({ error, signUpPage, signUpRequest, loginRequest }) {
	const [ isReadOnly, setReadOnly ] = useState(true);
	const formikRef = useRef(null);
	let location = useLocation();
	let { from } = location.state || { from: { pathname: '/' } };
	const handleFocus = () => {
		setReadOnly(false);
	};
	useEffect(
		() => {
			formikRef.current.setSubmitting(false);
		},
		[ error ]
	);

	return (
		<S.AuthFormContainer>
			<S.AuthFormTitle>{signUpPage ? 'SIGN UP' : 'LOG IN'}</S.AuthFormTitle>
			{signUpPage ? (
				<S.LinkToAuth to="/login">Have an account?</S.LinkToAuth>
			) : (
				<S.LinkToAuth to="/signUp">Need an account?</S.LinkToAuth>
			)}
			<Formik
				ref={formikRef}
				initialValues={{ username: '', email: '', password: '' }}
				onSubmit={(values) => {
					const userObj = {
						user: {
							username: values.username,
							email: values.email,
							password: values.password
						}
					};
					signUpPage ? signUpRequest(userObj) : loginRequest(userObj, from);
				}}
			>
				{({ isSubmitting }) => (
					<S.AuthForm>
						{error && <ErrorList error={error} />}
						{signUpPage && (
							<Field
								name="username"
								type="text"
								autocomplete="off"
								component={S.AuthFormTextField}
								label="Username"
								margin="normal"
								variant="outlined"
							/>
						)}
						<Field
							name="email"
							type="email"
							autocomplete="off"
							component={S.AuthFormTextField}
							label="Email"
							margin="normal"
							variant="outlined"
						/>
						<Field
							name="password"
							component={S.AuthFormTextField}
							type="password"
							inputProps={{
								readOnly: isReadOnly,
								autoComplete: 'off'
							}}
							onFocus={handleFocus}
							label="Password"
							margin="normal"
							variant="outlined"
						/>
						<S.AuthFormButton type="submit" disabled={isSubmitting} variant="contained">
							{signUpPage ? 'SIGN UP' : 'LOG IN'}
						</S.AuthFormButton>
					</S.AuthForm>
				)}
			</Formik>
		</S.AuthFormContainer>
	);
}

export default AuthForm;
