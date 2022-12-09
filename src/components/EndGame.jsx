import Toast from 'react-bootstrap/Toast';
// import useGame from '../hooks/useGame';
import { TfiGame } from 'react-icons/tfi';
import ToastContainer from 'react-bootstrap/ToastContainer';

const EndGame = () => {

	return (
		<ToastContainer className='p-3' position='top-center'>
			<Toast bg='dark'>
				<Toast.Header>
					<div>
						<TfiGame />
					</div>
					<strong className='me-auto'>Deck of cards game</strong>
					<small>End game</small>
				</Toast.Header>
				<Toast.Body className='text-white'>
					Game ended without any winner
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default EndGame;
