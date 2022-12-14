import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';

const FormPlay = () => {

	const { requestTwoCards, remaining, setEndGame, win } = useGame();
	
	const handleClick = async () => {
		if(remaining > 0 && win === false) await requestTwoCards();
		else if(!win) setEndGame(true);
	};

	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button onClick={handleClick} variant='secondary'>
				Draw Cards
			</Button>
		</Stack>
	);
};

export default FormPlay;
