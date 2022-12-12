import Toast from 'react-bootstrap/Toast';
import useGame from '../hooks/useGame';
import { TfiGame } from 'react-icons/tfi';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Winner = () => {

	const { win, winName, setWinName } = useGame();
	
	return (
		<ToastContainer className='p-3' position='top-start'>
			<Toast show={win} onClose={() => setWinName(false)}>
				<Toast.Header>
					<div>
						<TfiGame />
					</div>
					<strong className='me-auto'>Deck Of cards</strong>
					<small>Winner</small>
				</Toast.Header>
				<Toast.Body>Player {winName}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default Winner;
