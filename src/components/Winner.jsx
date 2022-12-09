import Toast from 'react-bootstrap/Toast';
// import useGame from '../hooks/useGame';
import { TfiGame } from 'react-icons/tfi';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Winner = () => {
	
	return (
		<ToastContainer className='p-3' position='top-start'>
			<Toast>
				<Toast.Header>
					<div>
						<TfiGame />
					</div>
					<strong className='me-auto'>Deck Of cards</strong>
					<small>Winner</small>
				</Toast.Header>
				<Toast.Body>Winner X</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default Winner;
