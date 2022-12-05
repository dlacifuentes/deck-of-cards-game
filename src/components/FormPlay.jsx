import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
import {useEffect } from 'react';

const FormPlay = () => {
	const { requestCards } = useGame();
	
	useEffect(() => {
		const requestCard = async () => {
		await requestCards();
		}
	requestCard()
	.catch(console.error);
	}, [])
	
	const handleClick = async () => {
		await requestCards();
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
