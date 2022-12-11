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
		// console.log('current cards')
		// console.log(currentCards)  

	};

	// Obtener nuevas cartas para ambos jugadores
	const requestCard = async () => {
		const cards = await DeckOfCardsAPI.getNewCards(idGame);
		console.log(cards)
		setCardPlayerOne([cards[0]]);
		setCardPlayerTwo([cards[1]]);

		const cuarta = ternas.find(
			(card) => card.code[0] === cards[0].code[0]
		);

		if(cuarta!= null && cuartas.length === 0){
			//formar cuartas
			const cardsTerna = ternas;
				
			const matches = cardsTerna
				.filter((card) => card.code[0] === cuarta.code[0])
				.map((card) => {
					console.log("card terna")
					console.log(card)
						
					// index de elemento a eliminar
					const p = cardsTerna.map(card1 => card1.code).indexOf(card.code)
					// eliminación del elemento en el array 
					cardsTerna.splice(p, 1);

			//		console.log("card terna")
					console.log(cardsTerna)

					return card 
			});	
				
				matches.push(cards[0])
				console.log("formar cuarta")
				setCuartas([...cuartas, ...matches])

				let primerItem = setUnique((unique) => unique.shift());
				console.log(primerItem)

		}else{
			const terna = pares.find(
				(card) => card.code[0] === cards[0].code[0]
			);
			console.log("t")

			if(terna != null && ternas.length < 6){
				// formar pares
				const cardsPar = pares;

				const matches = cardsPar
					.filter((card) => card.code[0] === terna.code[0])
					.map((card) => {
						console.log("card par")
						console.log(card)
						
						// index de elemento a eliminar
						const p = cardsPar.map(card1 => card1.code).indexOf(card.code)
						// eliminación del elemento en el array 
						cardsPar.splice(p, 1);

						console.log("card par")
						console.log(cardsPar)

						return card 
					});	
				
				matches.push(cards[0])
				console.log("formar ternas")
				setTernas([...ternas, ...matches])

			}else{

				console.log("formar pares")
				console.log(unique)
				const par = unique.find(
					(card) => card.code[0] === cards[0].code[0]
				);
	
				if(par != null){
					//formar pares
					const cardsU = unique;
					
					const matches = cardsU
						.filter((card) => card.code[0] === par.code[0])
						.map((card) => {
							console.log("card unica")
							console.log(card)
							
							// index de elemento a eliminar
							const p = cardsU.map(card1 => card1.code).indexOf(card.code)
							// eliminación del elemento en el array 
							cardsU.splice(p, 1);
	
							console.log("card par")
							console.log(cardsU)
	
							return card 
						});	
					
					matches.push(cards[0])
					setPares([...pares, ...matches])

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
				unique
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
