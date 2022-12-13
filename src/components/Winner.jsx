import Toast from 'react-bootstrap/Toast';
import useGame from '../hooks/useGame';
import { TfiGame } from 'react-icons/tfi';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from 'react-router-dom';
import App from '../App';

const Winner = () => {

	const { win, setWin, winName, resetGame } = useGame();
	const navigate = useNavigate();

	return (
		<ToastContainer className='p-3' position='top-center'>
			<Toast show={win} onClose={() => {
					setWin(false)
					resetGame();
					navigate('/', { replace: true });
					App();
					}
				}>
				<Toast.Header>
					<div>
						<TfiGame />
					</div>
					<strong className='me-auto'>Deck of cards game</strong>
					<small>Winner</small>
				</Toast.Header>
				<Toast.Body>
					Player {winName}
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default Winner;
