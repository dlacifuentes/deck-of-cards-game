import useGame from '../hooks/useGame';

const ListCardPlayerOne = () => {

    const { cardPlayerOne, currentCards, setCuartas, setTernas, setPares,
            pares, ternas, cuartas, unique, setUnique  } = useGame();

    const findCuartas = () => { 
        const cards = currentCards
        const c = cuartas;
        const t = ternas;
        const p = pares;
        const u = unique;

    /*    cards.sort((card1, card2) => {
            if(card1.code[1] < card2.code[1] ) return -1
            else if (card1.code[1] > card2.code[1]) return 1;
            else return 0
        }); */

            cards.map((card) => {
                const first = cards[0].code

                const matches = cards
                .filter((card) => card.code[0] === first[0])
                .map((card) => {
                    // index de elemento a eliminar
                    const p = cards.map(card1 => card1.code).indexOf(card.code)

                    // eliminación del elemento en el array cards
                    cards.splice(p, 1);
                    return card  // retorna la carta
                });
                
                console.log(matches)
                console.log("---")
                if (matches.length === 4){
                  //  c.push(...matches)
                    console.log(c)
                   // setCuartas([...cuartas, ...matches])
                }
                else if( matches.length === 3){
                  //  t.push(...matches)
                    console.log(t)
                  //  setTernas([...ternas, ...matches])
                }
                else if( matches.length === 2 ){
                //    p.push(...matches)
                    console.log(p)
                 //   setPares([...pares, ...matches])
                }
                else{
                  //  u.push(...matches)
                  // console.log("ingreso unico")
                    console.log(u)
                //    setUnique([...unique, ...matches]) 
                }
        
                return null
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