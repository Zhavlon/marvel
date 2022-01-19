import React from 'react';
import img from '../../resources/img/error.gif'

const ErrorMessage = () => {
	return <img
		style={{display: 'block', margin: '0 auto', height: '250px', objectFit: 'contain'}}
		src={img}
		alt="error image"
	/>;
};

export default ErrorMessage;