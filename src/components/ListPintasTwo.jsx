import useGame from '../hooks/useGame';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListPintasTwo = () => {

    const { paresEscTwo, ternasEscTwo, cuartasEscTwo } = useGame();


    return (
        <Row>
            <Col sm={11}>
                <div className='align-items-center my-2'>
                    <br></br>
                    <h5>Escaleras</h5>
                    <p>Pares</p>
                    {paresEscTwo.map((card, index) => (
                            <img
                                className='col-sm-1 col-lg-1 mx-2 my-2'
                                key={index}
                                src={card.image}
                                alt={card.value}
                            />
                        ))}
                    <p>Ternas</p>
                    {ternasEscTwo.map((card, index) => (
                        <img
                            className='col-sm-1 col-lg-1 mx-2 my-2'
                            key={index}
                            src={card.image}
                            alt={card.value}
                        />
                    ))}
                    <p>Cuartas</p>
                    {cuartasEscTwo.map((card, index) => (
                        <img
                            className='col-sm-1 col-lg-1 mx-2 my-2'
                            key={index}
                            src={card.image}
                            alt={card.value}
                        />
                    ))}
                </div>
                </Col>
        </Row>
    )
}

export default ListPintasTwo