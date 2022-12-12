import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useGame from '../hooks/useGame';
import ListCardPlayerOne from './ListCardPlayerOne';
import ListCardPlayerTwo from './ListCardPlayerTwo';

const ListCards = () => {

	const { playerOne, playerTwo } = useGame();
	
	return (
		<Container>
			
				<Row>
					<Col sm={11}>
					{/* <div className='remaining'>
					<h3>Remainig Cards: {remaining}</h3>
					</div> */}
					<div className='align-items-center my-2'>
						<h4>Player {playerOne.name}</h4>
						<p>Cards obtained</p>
						{playerOne.cards.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
					</div>
					</Col>
					<Col sm={1}>
						<ListCardPlayerOne />
					</Col>
				</Row>
				<Row>
					<Col sm={11}>
					<div className='align-items-center my-2'>
						<h4>Player {playerTwo.name}</h4>
						<p>Cards obtained</p>
						{playerTwo.cards.map((card, index) => (
							<img
								className='col-sm-1 col-lg-1 mx-2 my-2'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
					</div>
					</Col>
					<Col sm={1}>
						<ListCardPlayerTwo />
					</Col>
				</Row>
		</Container>
	);
};

export default ListCards;
