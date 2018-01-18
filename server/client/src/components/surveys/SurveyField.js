import React from 'react';

/*
	Contains logic to render single label and text input
	Customize label and where value of user input is saved in props
	Receives the props object, but only care about the inputfield of props

	Notes:
	- {...input} is the same as:
		onBlur={input.onBlur} onChange={input.onChange} ...
	- label is custom forwarded by <Field />
*/
export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom:'5px' }} />
			<div className="red-text" style = {{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};