import useGame from '../hooks/useGame';

const ListCardPlayerTwo = () => {

    const { cardPlayerTwo } = useGame();

    return (
        <div className='align-items-center my-2'>
            <p>New card</p>
            {cardPlayerTwo.map((card, index) => (
            <img
                className='col-sm-12 col-lg-12 mx-0 my-4'
                key={index}
                src={card.image}
                alt={card.value}
            />
            ))}
        </div>
  )
}

export default ListCardPlayerTwo