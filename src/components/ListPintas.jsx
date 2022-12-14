import useGame from '../hooks/useGame';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListPintas = () => {

    const { paresEsc, ternasEsc, cuartasEsc } = useGame();

    return (
        <Row>
            <Col sm={11}>
                <div className='align-items-center my-2'>
                    <h5>Escaleras</h5>
                    <p>Pares</p>
                    {paresEsc.map((card, index) => (
                            <img
                                className='col-sm-1 col-lg-1 mx-2 my-2'
                                key={index}
                                src={card.image}
                                alt={card.value}
                            />
                        ))}
                    <p>Ternas</p>
                    {ternasEsc.map((card, index) => (
                        <img
                            className='col-sm-1 col-lg-1 mx-2 my-2'
                            key={index}
                            src={card.image}
                            alt={card.value}
                        />
                    ))}
                    <p>Cuartas</p>
                    {cuartasEsc.map((card, index) => (
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

export default ListPintas