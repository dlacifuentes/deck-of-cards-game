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
	const [remaining, setRemaining] = useState(12);

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

		const terna = pares.find(
			(card) => card.code[0] === cards[0].code[0]
		);
        console.log("coincidencia")
		console.log(terna)

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
