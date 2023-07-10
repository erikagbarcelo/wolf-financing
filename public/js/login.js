const loginFormHandler = async (event) => {
<<<<<<< HEAD
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
=======
    event.preventDefault();

    // collect user input
    const email = document.querySelector('#user-email').value;
    const password = document.querySelector('#user-password').value;

    const response = await fetch('/api/users/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password}),
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
>>>>>>> 1bf731d375c271c00251dda9693510d2a35b7d59
