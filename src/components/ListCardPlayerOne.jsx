import useGame from '../hooks/useGame';

const ListCardPlayerOne = () => {

    const { cardPlayerOne} = useGame();

    return (
        <div className='align-items-center my-2'>
            <p>New card</p>
            {cardPlayerOne.map((card, index) => (
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

export default ListCardPlayerOne