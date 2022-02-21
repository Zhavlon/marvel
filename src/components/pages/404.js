import {Link} from 'react-router-dom'
import ErrorMessage from "../errorMessage/errorMessage";

const NoMatch = () => {
	return (
		<div>
			<ErrorMessage/>
			<p
				style={{
					'textAlign': 'center',
					'fontWeight': 'bold',
					'fontSize': '24px',
					'marginTop': '20px'
				}}
			>
				Page doesn't exist
			</p>
			<Link
				style={{
					'display': 'block',
					'fontSize': '24px',
					'marginTop': '30px',
					'textAlign': 'center',
					'fontWeight': 'bold',
					'color': '#9F0013'
				}}
				to='/'
			>
				Back to main page
			</Link>
		</div>
	);
};

export default NoMatch;