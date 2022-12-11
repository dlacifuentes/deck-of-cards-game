import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormPlay from '../components/FormPlay';
import ListCards from '../components/ListCards';
import EndGame from '../components/EndGame';
import ViewComponents from '../components/ViewComponents';

const GamePage = () => {
	return (
		<>
			<Container className='my-4'>
				<Row className='justify-content-md-center'>
					<Row xs={16} md={16}>
						<FormPlay />
					</Row>
					<Row>
						<ListCards />
					</Row>
				</Row>
				<Row>
					<Col>
						<EndGame />
					</Col>
				</Row>
				<Row>
					<Col>
						<ViewComponents />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default GamePage;
