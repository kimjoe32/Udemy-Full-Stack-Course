const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/*
	Validate that a list of emails was inputted sucessfully
	Split a comma-separated list of recipient emails
	Trim and validate with regex
*/

export default (emails) => {
	const invalidEmails = emails
	.split(',')
	.map(email => email.trim())
	.filter(email => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`
	}

	return;
};