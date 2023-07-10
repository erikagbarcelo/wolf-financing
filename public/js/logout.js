const logoutHandler = async () => {
<<<<<<< HEAD
	const response = await fetch('/api/users/logout', {
		method: 'POST',
	});

	if (response.ok) {
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
=======
    const response = await fetch('/api/users/logout', {
        method: 'POST',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
        alert(response.statusText);
    }
>>>>>>> 1bf731d375c271c00251dda9693510d2a35b7d59
};

document.querySelector('#logout').addEventListener('click', logoutHandler);