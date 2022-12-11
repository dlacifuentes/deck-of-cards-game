import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
import {useEffect } from 'react';
// import EndGame from '../components/EndGame';

const FormPlay = () => {
	const { requestCards, requestCard, requestRemaining, remaining, setEndGame,
		findCuartas } = useGame();
	
	useEffect(() => {
		const requestCard = async () => {
		await requestCards();
		}
	requestCard()
	.catch(console.error);
	}, [])
	
	const handleClick = async () => {
		requestRemaining();
		findCuartas();

		if(remaining > 0) {
			await requestCard();
		} else{
			setEndGame(true);
			// return (<EndGame />);
		}
		
	};



	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button onClick={handleClick} variant='secondary'>
				Cards
			</Button>
		</Stack>
	);
};

export default FormPlay;
