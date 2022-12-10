import useGame from '../hooks/useGame';

const ListCardPlayerOne = () => {

    const { cardPlayerOne, currentCards, setCuartas, setTernas } = useGame();

    const findCuartas = () => { 
        const cards = currentCards

        cards.map((card) => {
            const first = cards[0].code

            const coincidencias = cards
            .filter((card) => card.code[0] === first[0])
            .map((card) => {
                // index de elemento a eliminar
                const p = cards.map(card1 => card1.code).indexOf(card.code)

                // eliminación del elemento en el array cards
                cards.splice(p, 1);

                return card  // retorna la carta
            });

            console.log("coincidencias")
            console.log(coincidencias)
         /*   if (coincidencias.length === 4){
                console.log("cuarta")
             setCuartas(coincidencias)}
            else if( coincidencias.length === 3){
                console.log("ternas")
             setTernas(coincidencias)}
            else{
                console.log("unica")
            } */

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