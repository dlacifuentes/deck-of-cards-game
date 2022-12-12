import { useEffect } from 'react';
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
	const [remaining, setRemaining] = useState();
	
	// array cuartas
	const [cuartas, setCuartas] = useState([]);

	// array ternas
	const [ternas, setTernas] = useState([]);

	// array pares
	const [pares, setPares] = useState([]);

	// array uniques
	const [unique, setUnique] = useState([]);

	// pintas
	const [heart, setHeart] = useState([]);
	const [diamonds, setDiamonds] = useState([]);
	const [spades, setSpades] = useState([]);
	const [clubs, setClubs] = useState([]);

	// configuración ganador
	const [win, setWin] = useState(false);
	const [winName, setWinName] = useState('');

	// mostrar mensaje de finalización del juego - sin ganador
	const [endGame, setEndGame] = useState(false);
	
	// Iniciar el juego
	const playGame = async () => {
		const id = await DeckOfCardsAPI.getIdGame(); // obtener id del juego
		setIdGame(id);
		const cards1 = await DeckOfCardsAPI.initialCards(id);
		const cards2 = await DeckOfCardsAPI.initialCards(id);
	//	console.log(cards1);
	//	console.log(cards2);
		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, ...cards1] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, ...cards2] });
		setCurrentCards([...cards1]);
		// console.log(cards1);
		const rem = await DeckOfCardsAPI.getRemaining(id);
		setRemaining(rem);
	//	divideCards(cards1);
		splitCards([...cards1]);

	};

	const requestTwoCards = async () => {
		const cards = await DeckOfCardsAPI.getNewCards(idGame);
		setCardPlayerOne([cards[0]]);
		setCardPlayerTwo([cards[1]]);
		const rem = await DeckOfCardsAPI.getRemaining(idGame);
		setRemaining(rem);

		addNewCard(cards[0])
	};

	const divideCards = (c) => {
		const cards = c;
		const hearts = cards.filter((card) => card.suit === 'HEARTS');
		const clb = cards.filter((card) => card.suit === 'CLUBS');
		const diam = cards.filter((card) => card.suit === 'DIAMONDS');
		const espadas = cards.filter((card) => card.suit === 'SPADES');
		const esc =["2","3","4","5","6","7","8","9","0","JACK","QUEEN","KING","ACE","2","3","4"];
		hearts.map((card) => {
			for (let i = 0; i < esc.length; i++) {
				console.log('')
			
			}
			return card  // retorna la carta
		});
		
		setHeart([...heart, ...hearts]);
		setDiamonds([...diamonds,...diam]);
		setClubs([...clubs,...clb]);
		setSpades([...spades,...espadas]);
	};

	const escaleras = () =>{
		const cH = heart;
		console.log(cH);
		cH.forEach(element => {
			console.log(element.suit)	
		});
	};

	// dividir las cartas al iniciar el juego
	const splitCards = (cplayerOne) => { 
	//	console.log(cplayerOne)
		const cards = cplayerOne
	//	console.log(cards)
		const c = [];
		const t = [];
		const p = [];
		const u = []; 
		
		while(cards.length > 0){
			cards.map((card) => {
				const first = cards[0].code
				console.log("first: " + first )

				const matches = cards
				.filter((card) => card.code[0] === first[0])
				.map((card) => {
					console.log("eliminar del array: ")
					console.log(card)
					// index de elemento a eliminar
					const p = cards.map(card1 => card1.code).indexOf(card.code)
					console.log("pos: " + p)

					// eliminación del elemento en el array cards
					cards.splice(p, 1);
					console.log("cartas: ")
					console.log(cards)
					console.log("longitud" + cards.length)
					return card  // retorna la carta
				});
				
				console.log("coincidencias")
				console.log(matches)
			// console.log("longitud " + matches.length)
				if (matches.length === 4){
				//	console.log("cuarta")
					 c.push(...matches)
				}
				else if( matches.length === 3){
				//	console.log("terna")
					 t.push(...matches)
				}
				else if( matches.length === 2 ){
				//	console.log("par")
				    p.push(...matches)
				}
				else{
					u.push(...matches)
				//	console.log("ingreso unico")			   
				} 
			
				return null
			})
		}
		// console.log(cards)
		// console.log(c)
		setCuartas([...cuartas, ...c])
		// console.log(t)
		setTernas([...ternas, ...t])
		// console.log(p)
		setPares([...pares, ...p])
		// console.log(u)
		setUnique([...unique, ...u])

	} 

	// Obtener nuevas cartas para ambos jugadores
	const addNewCard = (newCard) => {

		const cardsOne = playerOne.cards;
		const unicos = unique;
		// const pairs = pares;
		const c = ({...playerOne});

		const cuarta = ternas.find(
			(card) => card.code[0] === newCard.code[0]
		);
		let l = cuartas.length + ternas.length + pares.length + unique.length
		console.log("longitud4: " + l)

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
				
				matches.push(newCard)
				setCuartas([...cuartas, ...matches])

				if(unique.length !== 0){

					const first = unicos.shift();
				//	console.log("item a eliminar")
				//	console.log(first)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
				//	console.log(p)

					c.cards[p] = newCard
				//	console.log(c)
				
				}
				/* else if(pares.length !== 0){
					const first = pairs.shift();
					console.log("item a eliminar")
					console.log(first)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
					console.log(p)

					c.cards[p] = newCard
					console.log(c)
				} */

			
		}else{
			const terna = pares.find(
				(card) => card.code[0] === newCard.code[0]
			);

		//	if(terna != null && ternas.length < 6){
			if(terna != null){
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
				
				matches.push(newCard)
				setTernas([...ternas, ...matches])

				if(unique.length !== 0){

					const first = unicos.shift();
				//	console.log("item a eliminar")
				//	console.log(first)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
				//	console.log(p)

					c.cards[p] = newCard
				//	console.log(c)
				
				}
				/* else if(pares.length !== 0){
					const first = pairs.shift();
					console.log("item a eliminar")
					console.log(first)

					const p = cardsOne.map(card => card.code).indexOf(first.code)
					console.log(p)

					c.cards[p] = newCard
					console.log(c)
				} */

			}else{

				const par = unique.find(
					(card) => card.code[0] === newCard.code[0]
				);

//if(l + 1 === 11) 
	
				if(par != null  ){
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
					
					matches.push(newCard)
					setPares([...pares, ...matches])

					if(unique.length !== 0){

						const unicos = unique;
	
						const first = unicos.shift();
					//	console.log("item a eliminar")
					//	console.log(first)
	
						const p = cardsOne.map(card => card.code).indexOf(first.code)
					//	console.log(p)

						c.cards[p] = newCard
					//	console.log(c)
						// setPlayerOne({...c})
					
					} /*
					else if(pares.length !== 0){
						const first = pairs.shift();
						console.log("item a eliminar")
						console.log(first)
	
						const p = cardsOne.map(card => card.code).indexOf(first.code)
						console.log(p)
	
						c.cards[p] = newCard
						console.log(c)
					} */

				}
			}
		} 

		if(cuartas.length === 1 && ternas.length === 6 ) {
			setWin(true);
			setWinName(playerOne.name);
		}


	}; 
	

	// Obtener cartas restantes
	/* const requestRemaining = () => {
		setRemaining(remaining - 2);
	} */

	
	return (
		<GameContext.Provider
			value={{
				playGame,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				requestTwoCards,
				cardPlayerOne,
				cardPlayerTwo,
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
				divideCards,
				heart,
				clubs,
				diamonds,
				spades,
				escaleras,
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
