const logoutHandler = async () => {
	const response = await fetch('/api/users/logout', {
		method: 'POST',
	});

	if (response.ok) {
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
};

document.querySelector('#logout').addEventListener('click', logoutHandler);