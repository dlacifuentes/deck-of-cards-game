import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
import {useEffect } from 'react';
import EndGame from './EndGame';

const FormPlay = () => {
	const { requestCards, requestCard, requestRemaining, remaining } = useGame();
	
	useEffect(() => {
		const requestCard = async () => {
		await requestCards();
		await requestRemaining();
		}
	requestCard()
	.catch(console.error);
	}, [])
	
	const handleClick = async () => {
	//	const cant = await DeckOfCardsAPI.getRemaining(idGame);
		await requestRemaining();
		console.log(remaining)
		if(remaining > 0) {
			await requestCard();
		} else{
			return <EndGame />
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
