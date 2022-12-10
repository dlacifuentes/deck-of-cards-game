import useGame from '../hooks/useGame';

const ListCardPlayerOne = () => {

    const { cardPlayerOne, playerOne } = useGame();

    const findCuartas = () => { 
        const cards = playerOne.cards

        cards.map((card) => {
            const first = card.code
            console.log("primer")
            console.log(first)

            const cuartas = cards
            .filter((card) => card.code[0] === first[0])
            .map((card) => {
                const p = cards.map(card1 => card1.code).indexOf(card.code)
                console.log('prueba ' + p)
                console.log('new')
                cards.splice(p, 1);
                console.log(cards)
                return card
            });

            console.log("coincidencia")
            console.log(cuartas); 
            console.log(cards)
            return console.log("works!")

        })

    }
    findCuartas()

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