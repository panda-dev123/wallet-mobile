export const getContrastYIQ = hexcolor => {
	if (hexcolor === undefined || hexcolor === null) {
		return '#444';
	}
	let r = parseInt(hexcolor.substring(1, 3), 16);
	let g = parseInt(hexcolor.substring(3, 5), 16);
	let b = parseInt(hexcolor.substring(5, 7), 16);
	let yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? '#444' : '#fff';
};
