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
	// const [moveCards, setMoveCards] = useState([]);

	// Nuevas cartas
	const [cardPlayerOne, setCardPlayerOne] = useState([]);
	const [cardPlayerTwo, setCardPlayerTwo] = useState([]);

	// cartas restantes en la baraja
	const [remaining, setRemaining] = useState(32);
	
	// array cuartas
	const [cuartas, setCuartas] = useState([]);

	// array ternas
	const [ternas, setTernas] = useState([]);

	// array pares
	const [pares, setPares] = useState([]);

	// array uniques
	const [unique, setUnique] = useState([]);

	// configuración ganador
	const [win, setWin] = useState(false);
	const [winName, setWinName] = useState('');

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
	//	setMoveCards([...cards1]);
		// console.log('current cards')
		// console.log(currentCards)  

	};


	// Obtener nuevas cartas para ambos jugadores
	const requestCard = async () => {
		const cards = await DeckOfCardsAPI.getNewCards(idGame);
	//	console.log(cards)
		setCardPlayerOne([cards[0]]);
		setCardPlayerTwo([cards[1]]);

		const cardsOne = playerOne.cards;
		const unicos = unique;
		const c = playerOne;

		const cuarta = ternas.find(
			(card) => card.code[0] === cards[0].code[0]
		);

		if(cuarta!= null && cuartas.length === 0){
			// formar cuartas
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

				if(unique.length !== 0){

					const first = unicos.shift();
					console.log("item a eliminar")
					console.log(first)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
					console.log(p)

					c.cards[p] = cards[0]
					console.log(c)
				
				/*	setPlayerOne({ ...playerOne, cards: [...playerOne.cards,
						[p]: ...cards[0] ]}) */
					
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

				if(unique.length !== 0){

					const first = unicos.shift();
					console.log("item a eliminar")
					console.log(first)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
					console.log(p)

					c.cards[p] = cards[0]
					console.log(c)
				
				/*	setPlayerOne({ ...playerOne, cards: [...playerOne.cards,
						[p]: ...cards[0] ]}) */
					
					// setUnique(...unicos)
				}

			}else{

				const par = unique.find(
					(card) => card.code[0] === cards[0].code[0]
				);
	
				if(par != null){
					// formar pares
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

					if(unique.length !== 0){

						const unicos = unique;
	
						const first = unicos.shift();
						console.log("item a eliminar")
						console.log(first)
	
						const p = cardsOne.map(card => card.code).indexOf(first.code)
						console.log(p)

						c.cards[p] = cards[0]
						console.log(c)
						setPlayerOne({...c})
					
					/*	setPlayerOne({ ...playerOne, cards: [...playerOne.cards,
							[p]: ...cards[0] ]}) */
						
						// setUnique(...unicos)
					}

				}
			}
		}

		if(cuartas.length === 1 && ternas.length === 6 ) {
			setWin(true);
			setWinName(playerOne.name);
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
				win,
				winName,
				setWinName,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
