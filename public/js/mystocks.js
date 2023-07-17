const inputHandler = async (event) => {
	event.preventDefault();

	// collect user input
	const username = document.querySelector('#ticker').value;
	const userPassword = document.querySelector('#nShares').value;

	const response = await fetch('/api/vsRoutes/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ stockTicker: username, nShares: userPassword }),
	});

	if (response.ok) {
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
};

document
	.querySelector('#shareInput')
	.addEventListener('submit', inputHandler);