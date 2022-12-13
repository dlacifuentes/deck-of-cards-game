import Toast from 'react-bootstrap/Toast';
import useGame from '../hooks/useGame';
import { TfiGame } from 'react-icons/tfi';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from 'react-router-dom';
import App from '../App';

const EndGame = () => {

	const { endGame, setEndGame, resetGame } = useGame();
	const navigate = useNavigate();

	return (
		<ToastContainer className='p-3' position='top-center'>
			<Toast show={endGame} onClose={() => {
					setEndGame(false)
					resetGame();
					navigate('/', { replace: true });
					App();}
				}>
				<Toast.Header>
					<div>
						<TfiGame />
					</div>
					<strong className='me-auto'>Deck of cards game</strong>
					<small>End game</small>
				</Toast.Header>
				<Toast.Body>
					Game ended without any winner
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default EndGame;
