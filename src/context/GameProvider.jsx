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

	// Cartas en juego - jugador 1
	const [currentCards, setCurrentCards] = useState([]);
	const [currentCardsEsc, setCurrentCardsEsc] = useState([]);

	// Cartas en juego - jugador 2
	const [currentCardsTwo, setCurrentCardsTwo] = useState([]);
	const [currentCardsEscTwo, setCurrentCardsEscTwo] = useState([]);

	// Nuevas cartas
	const [cardPlayerOne, setCardPlayerOne] = useState([]);
	const [cardPlayerTwo, setCardPlayerTwo] = useState([]);

	// cartas restantes en la baraja
	const [remaining, setRemaining] = useState();
	
	// array cuartas - jugador 1
	const [cuartas, setCuartas] = useState([]);
	const [cuartasEsc, setCuartasEsc] = useState([]);

	// array cuartas - jugador 2
	const [cuartasTwo, setCuartasTwo] = useState([]);
	const [cuartasEscTwo, setCuartasEscTwo] = useState([]);

	// array ternas - jugador 1
	const [ternas, setTernas] = useState([]);
	const [ternasEsc, setTernasEsc] = useState([]);

	// array ternas - jugador 2
	const [ternasTwo, setTernasTwo] = useState([]);
	const [ternasEscTwo, setTernasEscTwo] = useState([]);

	// array pares - jugador 1
	const [pares, setPares] = useState([]);
	const [paresEsc, setParesEsc] = useState([]);

	// array pares - jugador 2
	const [paresTwo, setParesTwo] = useState([]);
	const [paresEscTwo, setParesEscTwo] = useState([]);

	// array uniques
	const [unique, setUnique] = useState([]);
	const [uniqueEsc, setUniqueEsc] = useState([]);

	// array uniques
	const [uniqueTwo, setUniqueTwo] = useState([]);
	const [uniqueEscTwo, setUniqueEscTwo] = useState([]);

	// pintas
/*	const [heart, setHeart] = useState([]);
	const [diamonds, setDiamonds] = useState([]);
	const [spades, setSpades] = useState([]);
	const [clubs, setClubs] = useState([]); */

	// configuración ganador
	const [win, setWin] = useState(false);
	const [winName, setWinName] = useState('');

	// mostrar mensaje de finalización del juego - sin ganador
	const [endGame, setEndGame] = useState(false);

	// eliminar datos
	const resetGame = () => {
		setIdGame(null);
		setPlayerOne({
			name: '',
			cards: [],
		});
		setPlayerTwo({
			name: '',
			cards: [],
		});
		setCurrentCards([]);
		setCurrentCardsEsc([]);
		setCurrentCardsTwo([]);
		setCurrentCardsEscTwo([]);
		setCardPlayerOne([]);
		setCardPlayerTwo([]);
		setRemaining(0);
		setCuartas([]);
		setCuartasEsc([]);
		setCuartasTwo([]);
		setCuartasEscTwo([]);
		setTernas([]);
		setTernasEsc([]);
		setTernasTwo([]);
		setTernasEscTwo([]);
		setPares([]);
		setParesEsc([]);
		setParesTwo([]);
		setParesEscTwo([]);
		setUnique([]);
		setUniqueEsc([]);
		setUniqueTwo([]);
		setUniqueEscTwo([]);
	/*	setHeart([]);
		setDiamonds([]);
		setSpades([]);
		setClubs([]); */
		setWin(false);
		setWinName('');
		setEndGame(false);
	};
	
	// Iniciar el juego
	const playGame = async () => {
		const id = await DeckOfCardsAPI.getIdGame(); // obtener id del juego
		setIdGame(id);
		const cards1 = await DeckOfCardsAPI.initialCards(id);
		const cards2 = await DeckOfCardsAPI.initialCards(id);
		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, ...cards1] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, ...cards2] });
		setCurrentCards([...cards1]);
		setCurrentCardsEsc([...cards1]);
		setCurrentCardsTwo([...cards2]);
		setCurrentCardsEscTwo([...cards2]);
		const rem = await DeckOfCardsAPI.getRemaining(id);
		setRemaining(rem);
		splitCards([...cards1]);
		splitCardsTwo([...cards2]);

	};

	const requestTwoCards = async () => {

		if(!win) {
			const cards = await DeckOfCardsAPI.getNewCards(idGame);
			setCardPlayerOne([cards[0]]);
			setCardPlayerTwo([cards[1]]);
			const rem = await DeckOfCardsAPI.getRemaining(idGame);
			setRemaining(rem);
			addNewCard(cards[0]);
			addNewCardTwo(cards[1]);
		}
		
	};

	// dividir las cartas al iniciar el juego
	const splitCards = (cplayerOne) => { 
		const cards = cplayerOne
		const c = [];
		const t = [];
		const p = [];
		const u = []; 
		
		while(cards.length > 0){
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
				
				if (matches.length === 4) c.push(...matches)
				else if( matches.length === 3) t.push(...matches)
				else if( matches.length === 2 )	p.push(...matches)
				else u.push(...matches) 
			
				return null
			})
		}

		setCuartas([...cuartas, ...c])
		setTernas([...ternas, ...t])
		setPares([...pares, ...p])
		setUnique([...unique, ...u])
	} 

	const splitCardsTwo = (cplayerTwo) => { 

		const cards = cplayerTwo;
		const c = [];
		const t = [];
		const p = [];
		const u = []; 
			
		while(cards.length > 0){
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
		
				if (matches.length === 4) c.push(...matches)
				else if( matches.length === 3)
					 t.push(...matches)
				else if( matches.length === 2 )
					p.push(...matches)
				else u.push(...matches)
			
					return null
			})
		}
		setCuartasTwo([...cuartasTwo, ...c])
		setTernasTwo([...ternasTwo, ...t])
		setParesTwo([...paresTwo, ...p])
		setUniqueTwo([...uniqueTwo, ...u])
	}; 

	// Añadir nueva carta - jugador 1
	const addNewCard = (newCard, dataPlayer ) => {

		const cardsOne = playerOne.cards;
		const unicos = unique;
		const pairs = pares;
		const c = ({...playerOne});

		const cuarta = ternas.find(
			(card) => card.code[0] === newCard.code[0]
		);

		if(cuarta!= null && cuartas.length === 0){
			// formar cuartas
			const matches = locateCard(ternas, cuarta, newCard, cardsOne, c, unicos, pairs)
			setCuartas([...cuartas, ...matches])	
		}else{
			const terna = pares.find(
				(card) => card.code[0] === newCard.code[0]
			);
		//	if(terna != null && ternas.length < 6){
			if(terna != null){
				// formar pares
				const matches = locateCard(pares, terna, newCard, cardsOne, c, unicos, pairs)
				setTernas([...ternas, ...matches])
			}else{
				const par = unique.find(
					(card) => card.code[0] === newCard.code[0]
				);
				if(par != null  ){
					// formar pares
					const matches = locateCard(unique, par, newCard, cardsOne, c, unicos, pairs)
					setPares([...pares, ...matches])
				}
			}
		} 

		if(cuartas.length === 4 && ternas.length === 6 ) {
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartas, ...ternas] });
		}

	}; 

	// Añadir nueva carta - jugador 2
	const addNewCardTwo = (newCard) => {

		const cardsOne = playerTwo.cards;
		const unicos = uniqueTwo;
		const pairs = paresTwo;
		const c = ({...playerTwo});

		const cuarta = ternasTwo.find(
			(card) => card.code[0] === newCard.code[0]
		);

		if(cuarta != null && cuartasTwo.length === 0){
			// formar cuartas
			const matches = locateCard(ternasTwo, cuarta, newCard, cardsOne, c, unicos, pairs)
			setCuartasTwo([...cuartasTwo, ...matches])	
		}else{
			const terna = paresTwo.find(
				(card) => card.code[0] === newCard.code[0]
			);
		//	if(terna != null && ternas.length < 6){
			if(terna != null){
				// formar pares
				const matches = locateCard(paresTwo, terna, newCard, cardsOne, c, unicos, pairs)
				setTernasTwo([...ternasTwo, ...matches])
			}else{
				const par = uniqueTwo.find(
					(card) => card.code[0] === newCard.code[0]
				);
				if(par != null  ){
					// formar pares
					const matches = locateCard(uniqueTwo, par, newCard, cardsOne, c, unicos, pairs)
					setParesTwo([...paresTwo, ...matches])
				}
			}
		} 

		if(cuartasTwo.length === 4 && ternasTwo.length === 6 ) {
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasTwo, ...ternasTwo] });
		}

	}; 

	const locateCard = (cardsArray, cardToMove, newCard, cardsOne, c, unicos, pairs) =>{

		let matches = [];
				
		if(unicos.length !== 0 && cardsArray.length > 1){
			matches = cardsArray
				.filter((card) => card.code[0] === cardToMove.code[0])
				.map((card) => {						
				// index de elemento a eliminar
				const p = cardsArray.map(card1 => card1.code).indexOf(card.code)
						
				// eliminación del elemento en el array 
				cardsArray.splice(p, 1);

				return card 
			});			
			matches.push(newCard)	

			const first = unicos.shift();
			const p = cardsOne.map(card => card.code).indexOf(first.code)
			c.cards[p] = newCard
				
		}
		else if(pairs.length !== 0){

			matches = cardsArray
				.filter((card) => card.code[0] === cardToMove.code[0])
				.map((card) => {						
				// index de elemento a eliminar
				const p = cardsArray.map(card1 => card1.code).indexOf(card.code)
						
				// eliminación del elemento en el array 
				cardsArray.splice(p, 1);

				return card 
			});		
			
			matches.push(newCard)

			const first = pairs.shift();
			const second = pairs.shift();
			const p = cardsOne.map(card => card.code).indexOf(first.code)
			c.cards[p] = newCard

			unicos.push(second)
			
		} 

		return matches

	};
	
	return (
		<GameContext.Provider
			value={{
				playGame,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				requestTwoCards,
				remaining,
				cardPlayerOne,
				cardPlayerTwo,
				win,
				winName,
				setWin,
				endGame,
				setEndGame,
				resetGame,
				/* cuartas,
				ternas,
				pares,
				unique,
				paresTwo, 
				ternasTwo, 
				cuartasTwo, 
				uniqueTwo, */
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
