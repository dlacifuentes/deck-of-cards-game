import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null); // Id del juego

	// información de los usuario y sus cartas
	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});

	// Cartas en juego
	const [currentCards, setCurrentCards] = useState([]);
	const [moveCards, setMoveCards] = useState([]);

	// Nuevas cartas
	const [cardPlayerOne, setCardPlayerOne] = useState([]);
	const [cardPlayerTwo, setCardPlayerTwo] = useState([]);

	// cartas restantes en la baraja
	const [remaining, setRemaining] = useState(32);

	// const [win, setWin] = useState(false);
	// const [winName, setWinName] = useState('');
	
	// array cuartas
	const [cuartas, setCuartas] = useState([]);

	// array ternas
	const [ternas, setTernas] = useState([]);

	// array pares
	const [pares, setPares] = useState([]);

	// array uniques
	const [unique, setUnique] = useState([]);

	// mostrar mensaje de finalización del juego - sin ganador
	const [endGame, setEndGame] = useState(false);
	
	// Obtener id de juego
	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	// Solicitar cartas iniciales para ambos jugadores
	const requestCards = async () => {
		const cards1 = await DeckOfCardsAPI.getCards(idGame);
		const cards2 = await DeckOfCardsAPI.getCards(idGame);
		console.log(cards1)
		console.log(cards2)
		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, ...cards1] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, ...cards2] });

		setCurrentCards([...cards1]);
		setMoveCards([...card1]);
		// console.log('current cards')
		// console.log(currentCards)  

	};

	const findCuartas = () => { 
		const cards = currentCards
		const c = [];
		const t = [];
		const p = [];
		const u = [];

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
				console.log("longitud " + matches.length)
				if (matches.length === 4){
					console.log("cuarta")
					c.push(...matches)
					console.log(c)
					setCuartas([...cuartas, ...matches])}
				else if( matches.length === 3){
					console.log("terna")
					t.push(...matches)
					console.log(t)
					setTernas([...ternas, ...matches])}
				else if( matches.length === 2 ){
					console.log("par")
					p.push(...matches)
					console.log(p)
					setPares([...pares, ...matches])}
				else{
					u.push(...matches)
					console.log("ingreso unico")
					setUnique([...unique, ...matches])
					console.log(u)
				}
		
				return null
			}) 

	}

	// findCuartas()


	// Obtener nuevas cartas para ambos jugadores
	const requestCard = async () => {
		const cards = await DeckOfCardsAPI.getNewCards(idGame);
	//	console.log(cards)
		setCardPlayerOne([cards[0]]);
		setCardPlayerTwo([cards[1]]);

		const cardsOne = playerOne.cards

		const cuarta = ternas.find(
			(card) => card.code[0] === cards[0].code[0]
		);

		if(cuarta!= null && cuartas.length === 0){
			//formar cuartas
			const cardsTerna = ternas;
				
			const matches = cardsTerna
				.filter((card) => card.code[0] === cuarta.code[0])
				.map((card) => {						
					// index de elemento a eliminar
					const p = cardsTerna.map(card => card.cards.code).indexOf(card.code)
					
					// eliminación del elemento en el array 
					cardsTerna.splice(p, 1);

					return card 
			});	
				
				matches.push(cards[0])
				setCuartas([...cuartas, ...matches])

				if(unique != null){

					const unicos = unique;

					const first = unicos.shift();
					console.log("item a eliminar")
					console.log(first)
					
				//	console.log(cardsOne)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
					console.log(p)

					const c = playerOne
					c.cards[p] = cards[0]
					console.log(c)

				/*	setPlayerOne({ ...playerOne, cards: [...playerOne.cards
						.map(card => card.code === cards[0].code ? first : card) ]}) */
					
					// setUnique(...unicos)
				}

		}else{
			const terna = pares.find(
				(card) => card.code[0] === cards[0].code[0]
			);

			if(terna != null && ternas.length < 6){
				// formar pares
				const cardsPar = pares;

				const matches = cardsPar
					.filter((card) => card.code[0] === terna.code[0])
					.map((card) => {			
						// index de elemento a eliminar
						const p = cardsPar.map(card1 => card1.code).indexOf(card.code)

						// eliminación del elemento en el array 
						cardsPar.splice(p, 1);

						return card 
					});	
				
				matches.push(cards[0])
				setTernas([...ternas, ...matches])

				if(unique != null){

					const unicos = unique;

					const first = unicos.shift();
					console.log("item a eliminar")
					console.log(first)
					//console.log(cardsOne)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
					console.log(p)

					const c = playerOne
					c.cards[p] = cards[0]
					console.log(c)

				/*	setPlayerOne({ ...playerOne, cards: [playerOne.cards
						.map(card => card.code === cards[0].code ? first : card) ]}) */
					
					// setUnique(...unicos)
				}

			}else{

				const par = unique.find(
					(card) => card.code[0] === cards[0].code[0]
				);
	
				if(par != null){
					//formar pares
					const cardsU = unique;
					
					const matches = cardsU
						.filter((card) => card.code[0] === par.code[0])
						.map((card) => {					
							// index de elemento a eliminar
							const p = cardsU.map(card1 => card1.code).indexOf(card.code)

							// eliminación del elemento en el array 
							cardsU.splice(p, 1);	
							return card 
						});	
					
					matches.push(cards[0])
					setPares([...pares, ...matches])

					if(unique != null){

						const unicos = unique;
	
						const first = unicos.shift();
						console.log("item a eliminar")
						console.log(first)
						//console.log(cardsOne)
	
						const p = cardsOne.map(card => card.code).indexOf(first.code)
						console.log(p)

						const c = playerOne
						c.cards[p] = cards[0]
						console.log(c)
					
					/*	setPlayerOne({ ...playerOne, cards: [...playerOne.cards,
							[p]: ...cards[0] ]}) */
						
						// setUnique(...unicos)
					}

				}
			}
		}
	};

	// Obtener cartas restantes
	const requestRemaining = () => {
		setRemaining(remaining - 2);
	}

	
	return (
		<GameContext.Provider
			value={{
				playGame,
				requestCards,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				requestCard,
				cardPlayerOne,
				cardPlayerTwo,
				requestRemaining,
				remaining,
				endGame,
				setEndGame,
				cuartas,
				setCuartas,
				currentCards,
				setTernas,
				setPares,
				ternas,
				pares,
				setUnique,
				unique,
				findCuartas,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
