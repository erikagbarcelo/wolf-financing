module.exports = {
	format_date: (date) =>
		`${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
			date
		).getFullYear()}`,
};
