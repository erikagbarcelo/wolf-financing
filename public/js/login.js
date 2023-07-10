const loginFormHandler = async (event) => {
	event.preventDefault();

	// collect user input
	const userEmail = document.querySelector('#user-email').value;
	const userPassword = document.querySelector('#user-password').value;

	const response = await fetch('/api/users/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: userEmail, password: userPassword }),
	});

	if (response.ok) {
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
};

document
	.querySelector('#login-form')
	.addEventListener('submit', loginFormHandler);