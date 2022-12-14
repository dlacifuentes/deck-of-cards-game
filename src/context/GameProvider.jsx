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

	// array uniques
	const [uniqueTwo, setUniqueTwo] = useState([]);

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
		setUniqueTwo([]);
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

		const rem = await DeckOfCardsAPI.getRemaining(id);
		setRemaining(rem);

		divideHearts([...cards1], paresEsc, ternasEsc, cuartasEsc);
		divideClubs([...cards1], paresEsc, ternasEsc, cuartasEsc);
		divideDiamonds([...cards1], paresEsc, ternasEsc, cuartasEsc);
		divideSpades([...cards1], paresEsc, ternasEsc, cuartasEsc);

		divideHearts([...cards2], paresEscTwo, ternasEscTwo, cuartasEscTwo);
		divideClubs([...cards2], paresEscTwo, ternasEscTwo, cuartasEscTwo);
		divideDiamonds([...cards2], paresEscTwo, ternasEscTwo, cuartasEscTwo);
		divideSpades([...cards2], paresEscTwo, ternasEscTwo, cuartasEscTwo); 

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
			addNewCardEsc(cards[0]);
			addNewCardEscTwo(cards[1]);
		}
		
	};

	// dividir las cartas al iniciar el juego - misma pinta - escaleras
	const divideHearts = (c, pr, tr, cr) => {
		const cards = c;
		const escH = ["2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H", "JH", "QH", "KH", "AH"];
		const hearts = [...cards.filter((card) => card.suit === 'HEARTS')];
		escaleras(hearts, escH, pr, tr, cr);
	};

	const divideClubs = (c, pr, tr, cr) => {
		const cards = c;
		const escC = ["2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C", "JC", "QC", "KC", "AC"];
		const clb = [...cards.filter((card) => card.suit === 'CLUBS')];
		escaleras(clb, escC, pr, tr, cr);
	};

	const divideDiamonds = (c, pr, tr, cr) => {
		const cards = c;
		const escD = ["2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D", "JD", "QD", "KD", "AD"];
		const diam = [...cards.filter((card) => card.suit === 'DIAMONDS')];
		escaleras(diam, escD, pr, tr, cr);
	};

	const divideSpades = (c, pr, tr, cr) => {
		const cards = c;
		const escS = ["2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S", "JS", "QS", "KS", "AS"];
		const espadas = [...cards.filter((card) => card.suit === 'SPADES')];
		escaleras(espadas, escS, pr, tr, cr);
	};

	const escaleras = (vec, pinta, pr, tr, cr) => {
		const esc = pinta;
		const ban = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		const newPar = [];
		const newTerna = [];
		const newCuarta = [];

		if (vec.length > 1) {
			vec.forEach(element => {
				for (let i = 0; i < esc.length; i++) {
					if (element.code == esc[i]) {
						ban[i] = 1;
					}
				}
			});
		}
		// console.log(ban);
		if (ban[ban.length - 1] == 1) {
			const val = [];
			if (ban[0] == 1) {
				if (ban[0] == 1 && ban[ban.length - 2] == 0 && ban[ban.length - 1] == 1) {
					val.push(vec.find(
						(card) => card.code === esc[ban.length - 1]
					));
					ban[ban.length - 1] = 0;
					val.push(vec.find(
						(card) => card.code === esc[0]
					));
					ban[0] = 0;

					if (ban[1] == 1) {
						val.push(vec.find(
							(card) => card.code === esc[1]
						));
						ban[1] = 0;
						if (ban[2] == 1) {
							val.push(vec.find(
								(card) => card.code === esc[2]
							));
							ban[2] = 0;
							let z = 4;
							do {
								z--;
								newCuarta.unshift(val.pop());
							} while (z > 0)
							// A 2 3 4
						}
						else {
							let z = 3;
							do {
								z--;
								newTerna.unshift(val.pop());
							} while (z > 0)
							// A 2 3
						}
					}
					else {
						let z = 2;
						do {
							z--;
							newPar.unshift(val.pop());
						} while (z > 0)
						// A 2
					}
				}
			} else {
				if (ban[1] == 1 && ban[ban.length - 1] == 1 && ban[2] == 0 && ban[3] == 0) {
					val.push(vec.find(
						(card) => card.code === esc[ban.length - 1]
					));
					ban[ban.length - 1] = 0;
					val.push(vec.find(
						(card) => card.code === esc[1]
					));
					ban[1] = 0;
					let z = 2;
					do {
						z--;
						newPar.unshift(val.pop());
					} while (z > 0)// A 3
				}


			}
			// si es K o Q
			if (ban[ban.length - 2] == 1) {
				// si es K
				if (ban[ban.length - 2] == 1 && ban[ban.length - 1] == 1) {
					val.push(vec.find(
						(card) => card.code === esc[ban.length - 1]
					));
					ban[ban.length - 1] = 0;
					val.unshift(vec.find(
						(card) => card.code === esc[ban.length - 2]
					));
					ban[ban.length - 2] = 0;

					if (ban[ban.length - 3] == 1) {
						val.unshift(vec.find(
							(card) => card.code === esc[ban.length - 3]
						));
						ban[ban.length - 3] = 0;
						if (ban[0] == 1) {
							val.push(vec.find(
								(card) => card.code === esc[0]
							));
							ban[0] = 0;
							let z = 4;
							do {
								z--;
								newCuarta.unshift(val.pop());
							} while (z > 0)
							// Q K A 2
						}
						else {
							let z = 3;
							do {
								z--;
								newTerna.unshift(val.pop());
							} while (z > 0)
							// Q K A
						}
					}
					else if (ban[0] == 1) {
						val.push(vec.find(
							(card) => card.code === esc[0]
						));
						ban[0] = 0;
						if (ban[1] == 1) {
							val.push(vec.find(
								(card) => card.code === esc[1]
							));
							ban[1] = 0;
							let z = 4;
							do {
								z--;
								newCuarta.unshift(val.pop());
							} while (z > 0)
							// K A 2 3
						}
						else {
							let z = 3;
							do {
								z--;
								newTerna.unshift(val.pop());
							} while (z > 0)
							// K A 2
						}


					} else {
						let z = 2;
						do {
							z--;
							newPar.unshift(val.pop());
						} while (z > 0)
						// K A
					}
				}

			} else {
				// si es Q
				if (ban[ban.length - 3] == 1 && ban[ban.length - 1] == 1) {
					val.push(vec.find(
						(card) => card.code === esc[ban.length - 1]
					));
					ban[ban.length - 1] = 0;
					val.unshift(vec.find(
						(card) => card.code === esc[ban.length - 3]
					));
					ban[ban.length - 3] = 0;
					let z = 2;
					do {
						z--;
						newPar.unshift(val.pop());
					} while (z > 0)
				}
				// Q A
			}

		}
		// else {

		if (ban[11] == 1 && ban[10] == 1 && ban[12] == 0 && ban[9] == 0) {
			newPar.unshift(vec.find(
				(card) => card.code === esc[11]
			));
			ban[11] = 0;
			newPar.unshift(vec.find(
				(card) => card.code === esc[10]
			));
			ban[10] = 0;
		}

		for (let i = 0; i < 10; i++) {
			const val = [];
			if (ban[i] == 1) {
				if (ban[i + 1] == 1) {

					if (ban[i + 1] == 1) {
						val.push(vec.find(
							(card) => card.code === esc[i]
						));
						ban[i] = 0;
						val.push(vec.find(
							(card) => card.code === esc[i + 1]
						));
						ban[i + 1] = 0;

						if (ban[i + 2] == 1) {
							val.push(vec.find(
								(card) => card.code === esc[i + 2]
							));
							ban[i + 2] = 0;
							if (ban[i + 3] == 1) {
								val.push(vec.find(
									(card) => card.code === esc[i + 3]
								));
								ban[i + 3] = 0;
								let z = 4;
								do {
									z--;
									newCuarta.unshift(val.pop());
								} while (z > 0)
								// 1 2 3 4
							}
							else {
								let z = 3;
								do {
									z--;
									newTerna.unshift(val.pop());
								} while (z > 0)
								// 1 2 3
							}
						}
						else {
							let z = 2;
							do {
								z--;
								newPar.unshift(val.pop());
							} while (z > 0)
							// 1 2
						}
					}
				}
				else {

					if (ban[i] == 1 && ban[i + 2] == 1 && ban[i+3] == 0 ) {
						val.push(vec.find(
							(card) => card.code === esc[i]
						));
						ban[i] = 0;
						val.push(vec.find(
							(card) => card.code === esc[i + 2]
						));
						ban[i + 2] = 0;

						let z = 2;
						do {
							z--;
							newPar.unshift(val.pop());
						} while (z > 0)
						// 1 3
					}

				}
			}
		}

		pr.push(...newPar)
		tr.push(...newTerna)
		cr.push(...newCuarta)

	};

	// dividir las cartas al iniciar el juego - diferentes pintas - jugador 1
	const splitCards = (cplayerOne) => { 
		const cards = cplayerOne
		const c = [];
		const t = [];
		const p = [];
		const u = []; 

		deleteEsc(paresEsc, cards)
		deleteEsc(ternasEsc, cards)
		deleteEsc(cuartasEsc, cards)
		
		// console.log("longitud: " + cards.length)
		
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
	};

	// dividir las cartas al iniciar el juego - diferentes pintas - jugador 2
	const splitCardsTwo = (cplayerTwo) => { 

		const cards = cplayerTwo
		const c = [];
		const t = [];
		const p = [];
		const u = []; 

		deleteEsc(paresEscTwo, cards)
		deleteEsc(ternasEscTwo, cards)
		deleteEsc(cuartasEscTwo, cards)

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
				else if( matches.length === 2 ) p.push(...matches)
				else u.push(...matches)
			
					return null
			})
		}
		setCuartasTwo([...cuartasTwo, ...c])
		setTernasTwo([...ternasTwo, ...t])
		setParesTwo([...paresTwo, ...p])
		setUniqueTwo([...uniqueTwo, ...u])
	}; 
	
	const deleteEsc = (arrayEsc, arrayToModify) =>{
		for(let i= 0; i < arrayEsc.length; i++){
			arrayToModify.filter((card) => card.code === arrayEsc[i].code)
				.map((card) => {
				// index de elemento a eliminar
				const p = arrayToModify.map(card1 => card1.code).indexOf(card.code)
				// eliminación del elemento en el array cards
				arrayToModify.splice(p, 1);
					return null
			}); 
		}
	};	
	 
	const checkMatch = (str, options) =>{
		const cadena = options.find(
				(option) => option === str
		);
		return cadena
	}

	// Añadir nueva carta - jugador 1
	const addNewCardEsc = (newCard) => {
		let banCard = 0;
		const cardsOne = playerOne.cards;
		const unicos = unique;
		const pairs = pares;
		const pairsEsc = paresEsc;
		const c = ({...playerOne});
		
		const crts = ['A234', '2345', '3456', '4567', '5678', '6789', '7890', '890J', '90JQ', '0JQK', 'JQKA','QKA2', 'KA23' ]
		const trns = ['A23', '234', '345', '456', '567', '678', '789', '890', '90J', '0JQ', 'JQK', 'QKA', 'KA2']
	/*	const trns = ['A24', 'A23', 'A34', '234', '245', '345', '356', '346', '456', '467', '457', '567', '578', '568', '678',
		 				'679', '689', '789', '790', '780', '890', '80J', '89J', '90J', '9JQ', '90Q', '0JQ', '0QK', '0JK', 'JQK',
						'JKA', 'JQA', 'QKA', 'QA2', 'QK2', 'KA2', 'K23', 'KA3'] */
		// const prs =  ['A2', '23', '34', '45', '56', '67', '78', '89', '90', '0J', 'JQ','QK', 'KA' ]
		let str;
		let ban = 0;
		let cuartaEsc;
		let ternaEsc;
		const cu = [];
		const te = [];
		
		if(ternasEsc.length !== 0){

			for(let i=0; i< ternasEsc.length && ban === 0; i++){

				if(ternasEsc[i].code[1] === newCard.code[1]){
					str = ternasEsc[i].code[0] + ternasEsc[i + 1].code[0] + ternasEsc[i + 2].code[0] + newCard.code[0]
					cuartaEsc = checkMatch(str, crts)
					if(cuartaEsc!= null){
						cu.push(ternasEsc[i], ternasEsc[i + 1], ternasEsc[i + 2], newCard)
					}

					if (cuartaEsc == null){
						str = ternasEsc[i].code[0] + ternasEsc[i + 1].code[0] + newCard.code[0] + ternasEsc[i + 2].code[0]
						cuartaEsc = checkMatch(str, crts)
						if(cuartaEsc!= null){
							cu.push(ternasEsc[i], ternasEsc[i + 1], newCard, ternasEsc[i + 2])
						}

						if(cuartaEsc == null){
							str = ternasEsc[i].code[0] + newCard.code[0] + ternasEsc[i + 1].code[0] + ternasEsc[i + 2].code[0] 
							cuartaEsc = checkMatch(str, crts)
							if(cuartaEsc!= null){
								cu.push(ternasEsc[i], newCard, ternasEsc[i + 1], ternasEsc[i + 2])
							}

							if(cuartaEsc == null){
								str = newCard.code[0] + ternasEsc[i].code[0] + ternasEsc[i + 1].code[0] + ternasEsc[i + 2].code[0]
								cuartaEsc = checkMatch(str, crts)
								if(cuartaEsc!= null){
									cu.push( newCard, ternasEsc[i], ternasEsc[i + 1], ternasEsc[i + 2])
								}
							}
						}
					}
					if(cuartaEsc!= null) ban = 1;
				}
				i+=2
			}
		}

		if(cuartaEsc != null && cuartasEsc.length === 0 && cuartas.length === 0){
			deleteEsc(cu, ternasEsc)
			// formar cuartas
			setCuartasEsc([...cuartasEsc, ...cu])
			locateCardEsc(newCard, cardsOne, c, unicos, pairs, pairsEsc)
			banCard = 1;
			// banCard = true;
		}else{
			if(paresEsc.length !== 0){
				for(let i=0; i< paresEsc.length && ban === 0; i++){
					if(paresEsc[i].code[1] === newCard.code[1]){
						str = paresEsc[i].code[0] + paresEsc[i + 1].code[0] + newCard.code[0]
						ternaEsc = checkMatch(str, trns)
						if(ternaEsc!= null){
							te.push(paresEsc[i], paresEsc[i + 1], newCard)
						}
	
						if (ternaEsc == null){
							str = paresEsc[i].code[0] + newCard.code[0] + paresEsc[i + 1].code[0]
							ternaEsc = checkMatch(str, trns)
							if(ternaEsc!= null){
								te.push(paresEsc[i], newCard, paresEsc[i + 1])
							}
	
							if(ternaEsc == null){
								str = newCard.code[0] + paresEsc[i].code[0] + paresEsc[i + 1].code[0]
								ternaEsc = checkMatch(str, trns)
								if(ternaEsc!= null){
									te.push(newCard, paresEsc[i], paresEsc[i + 1])
								}
							}
						}
						if(ternaEsc != null) ban = 1;
					}
					i++
				}
			}

			if(ternaEsc != null){
				// formar pares
				deleteEsc(te, paresEsc)
				setTernasEsc([...ternasEsc, ...te])
				locateCardEsc(newCard, cardsOne, c, unicos, pairs, pairsEsc)
				banCard = 1;
				 // banCard = true;
			}
		}
		// console.log(banCard)
		if(banCard === 0) addNewCard(newCard);

		if(cuartas.length === 4 && ternas.length === 6 ) {
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartas, ...ternas] });
		}else if(cuartas.length === 4 && ternasEsc.length === 6){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartas, ...ternasEsc] });
		}else if(cuartasEsc.length === 4 && ternas.length === 6){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartasEsc, ...ternas] });
		}else if(cuartasEsc.length === 4 && ternasEsc.length === 6){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartasEsc, ...ternasEsc] });
		} else if(cuartas.length === 4 && ternas.length === 3 && ternasEsc.length === 3){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartas, ...ternas, ...ternasEsc] });
		}else if(cuartasEsc.length === 4 && ternas.length === 3 && ternasEsc.length === 3){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartasEsc, ...ternas, ...ternasEsc] });
		}

	};
	
	const addNewCardEscTwo = (newCard, addCardTwo) => {
		let banCard = 0;
		const cardsTwo = playerTwo.cards;
		const unicos = uniqueTwo;
		const pairs = paresTwo;
		const pairsEsc = paresEscTwo;
		const c = ({...playerTwo});
		
		const crts = ['A234', '2345', '3456', '4567', '5678', '6789', '7890', '890J', '90JQ', '0JQK', 'JQKA','QKA2', 'KA23' ]
		const trns = ['A23', '234', '345', '456', '567', '678', '789', '890', '90J', '0JQ', 'JQK', 'QKA', 'KA2']
	/*	const trns = ['A24', 'A23', 'A34', '234', '245', '345', '356', '346', '456', '467', '457', '567', '578', '568', '678',
		 				'679', '689', '789', '790', '780', '890', '80J', '89J', '90J', '9JQ', '90Q', '0JQ', '0QK', '0JK', 'JQK',
						'JKA', 'JQA', 'QKA', 'QA2', 'QK2', 'KA2', 'K23', 'KA3'] */
		// const prs =  ['A2', '23', '34', '45', '56', '67', '78', '89', '90', '0J', 'JQ','QK', 'KA' ]
		let str;
		let ban = 0;
		let cuartaEsc;
		let ternaEsc;
		const cu = [];
		const te = [];
		
		if(ternasEscTwo.length !== 0){

			for(let i=0; i< ternasEscTwo.length && ban === 0; i++){

				if(ternasEscTwo[i].code[1] === newCard.code[1]){
					str = ternasEscTwo[i].code[0] + ternasEscTwo[i + 1].code[0] + ternasEscTwo[i + 2].code[0] + newCard.code[0]
					cuartaEsc = checkMatch(str, crts)
					if(cuartaEsc!= null){
						cu.push(ternasEscTwo[i], ternasEscTwo[i + 1], ternasEscTwo[i + 2], newCard)
					}

					if (cuartaEsc == null){
						str = ternasEscTwo[i].code[0] + ternasEscTwo[i + 1].code[0] + newCard.code[0] + ternasEscTwo[i + 2].code[0]
						cuartaEsc = checkMatch(str, crts)
						if(cuartaEsc!= null){
							cu.push(ternasEscTwo[i], ternasEscTwo[i + 1], newCard, ternasEscTwo[i + 2])
						}

						if(cuartaEsc == null){
							str = ternasEscTwo[i].code[0] + newCard.code[0] + ternasEscTwo[i + 1].code[0] + ternasEscTwo[i + 2].code[0] 
							cuartaEsc = checkMatch(str, crts)
							if(cuartaEsc!= null){
								cu.push(ternasEscTwo[i], newCard, ternasEscTwo[i + 1], ternasEscTwo[i + 2])
							}

							if(cuartaEsc == null){
								str = newCard.code[0] + ternasEscTwo[i].code[0] + ternasEscTwo[i + 1].code[0] + ternasEscTwo[i + 2].code[0]
								cuartaEsc = checkMatch(str, crts)
								if(cuartaEsc!= null){
									cu.push( newCard, ternasEscTwo[i], ternasEscTwo[i + 1], ternasEscTwo[i + 2])
								}
							}
						}
					}
					if(cuartaEsc!= null) ban = 1;
				}
				i+=2
			}
		}

		if(cuartaEsc != null && cuartasEscTwo.length === 0 && cuartasTwo.length === 0){
			deleteEsc(cu, ternasEscTwo)
			// formar cuartas
			setCuartasEscTwo([...cuartasEscTwo, ...cu])
			locateCardEsc(newCard, cardsTwo, c, unicos, pairs, pairsEsc)
			banCard = 1;
			// banCardTwo = true
		}else{
			if(paresEscTwo.length !== 0){
				for(let i=0; i< paresEscTwo.length && ban === 0; i++){
					if(paresEscTwo[i].code[1] === newCard.code[1]){
						str = paresEscTwo[i].code[0] + paresEscTwo[i + 1].code[0] + newCard.code[0]
						ternaEsc = checkMatch(str, trns)
						if(ternaEsc!= null){
							te.push(paresEscTwo[i], paresEscTwo[i + 1], newCard)
						}
	
						if (ternaEsc == null){
							str = paresEscTwo[i].code[0] + newCard.code[0] + paresEscTwo[i + 1].code[0]
							ternaEsc = checkMatch(str, trns)
							if(ternaEsc!= null){
								te.push(paresEscTwo[i], newCard, paresEscTwo[i + 1])
							}
	
							if(ternaEsc == null){
								str = newCard.code[0] + paresEscTwo[i].code[0] + paresEscTwo[i + 1].code[0]
								ternaEsc = checkMatch(str, trns)
								if(ternaEsc!= null){
									te.push(newCard, paresEscTwo[i], paresEscTwo[i + 1])
								}
							}
						}
						if(ternaEsc != null) ban = 1;
					}
					i++
				}
			}

			if(ternaEsc != null){
				// formar pares
				deleteEsc(te, paresEscTwo)
				setTernasEscTwo([...ternasEscTwo, ...te])
				locateCardEsc(newCard, cardsTwo, c, unicos, pairs, pairsEsc)
				banCard = 1;
			}
		}
		// console.log(banCard)
		if(banCard === 0) addNewCardTwo(newCard);

		if(cuartasTwo.length === 4 && ternasTwo.length === 6 ) {
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasTwo, ...ternasTwo] });
		}else if(cuartasTwo.length === 4 && ternasEscTwo.length === 6){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasTwo, ...ternasEscTwo] });
		}else if(cuartasEscTwo.length === 4 && ternasTwo.length === 6){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasEscTwo, ...ternasTwo] });
		}else if(cuartasEscTwo.length === 4 && ternasEscTwo.length === 6){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasEscTwo, ...ternasEscTwo] });
		} else if(cuartasTwo.length === 4 && ternasTwo.length === 3 && ternasEscTwo.length === 3){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasTwo, ...ternasTwo, ...ternasEscTwo] });
		}else if(cuartasEscTwo.length === 4 && ternasTwo.length === 3 && ternasEscTwo.length === 3){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasEscTwo, ...ternasTwo, ...ternasEscTwo] });
		}

	};  

	const addNewCard = (newCard) => {

		const cardsOne = playerOne.cards;
		const unicos = unique;
		const pairs = pares;
		const c = ({...playerOne});

		const cuarta = ternas.find(
			(card) => card.code[0] === newCard.code[0]
		);

		if(cuarta!= null && cuartas.length === 0 && cuartasEsc.length === 0){
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
		}else if(cuartas.length === 4 && ternasEsc.length === 6){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartas, ...ternasEsc] });
		}else if(cuartasEsc.length === 4 && ternas.length === 6){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartasEsc, ...ternas] });
		}else if(cuartasEsc.length === 4 && ternasEsc.length === 6){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartasEsc, ...ternasEsc] });
		} else if(cuartas.length === 4 && ternas.length === 3 && ternasEsc.length === 3){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartas, ...ternas, ...ternasEsc] });
		}else if(cuartasEsc.length === 4 && ternas.length === 3 && ternasEsc.length === 3){
			setWin(true);
			setWinName(playerOne.name);
			setPlayerOne({ ...playerOne, cards: [...cuartasEsc, ...ternas, ...ternasEsc] });
		}

	}; 

	// Añadir nueva carta - jugador 2
	const addNewCardTwo = (newCard) => {

		const cardsTwo = playerTwo.cards;
		const unicos = uniqueTwo;
		const pairs = paresTwo;
		const c = ({...playerTwo});

		const cuarta = ternasTwo.find(
			(card) => card.code[0] === newCard.code[0]
		);

		if(cuarta != null && cuartasTwo.length === 0 && cuartasEscTwo.length === 0){
			// formar cuartas
			const matches = locateCard(ternasTwo, cuarta, newCard, cardsTwo, c, unicos, pairs)
			setCuartasTwo([...cuartasTwo, ...matches])	
		}else{
			const terna = paresTwo.find(
				(card) => card.code[0] === newCard.code[0]
			);
		//	if(terna != null && ternas.length < 6){
			if(terna != null){
				// formar pares
				const matches = locateCard(paresTwo, terna, newCard, cardsTwo, c, unicos, pairs)
				setTernasTwo([...ternasTwo, ...matches])
			}else{
				const par = uniqueTwo.find(
					(card) => card.code[0] === newCard.code[0]
				);
				if(par != null  ){
					// formar pares
					const matches = locateCard(uniqueTwo, par, newCard, cardsTwo, c, unicos, pairs)
					setParesTwo([...paresTwo, ...matches])
				}
			}
		} 

		if(cuartasTwo.length === 4 && ternasTwo.length === 6 ) {
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasTwo, ...ternasTwo] });
		}else if(cuartasTwo.length === 4 && ternasEscTwo.length === 6){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasTwo, ...ternasEscTwo] });
		}else if(cuartasEscTwo.length === 4 && ternasTwo.length === 6){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasEscTwo, ...ternasTwo] });
		}else if(cuartasEscTwo.length === 4 && ternasEscTwo.length === 6){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasEscTwo, ...ternasEscTwo] });
		} else if(cuartasTwo.length === 4 && ternasTwo.length === 3 && ternasEscTwo.length === 3){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasTwo, ...ternasTwo, ...ternasEscTwo] });
		}else if(cuartasEscTwo.length === 4 && ternasTwo.length === 3 && ternasEscTwo.length === 3){
			setWin(true);
			setWinName(playerTwo.name);
			setPlayerTwo({ ...playerTwo, cards: [...cuartasEscTwo, ...ternasTwo, ...ternasEscTwo] });
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

	const locateCardEsc = (newCard, cardsOne, c, unicos, pairs, pairsEsc) =>{
		// console.log(unicos)
		// console.log(c)
		if(unicos.length !== 0){
			const first = unicos.shift();
			const p = cardsOne.map(card => card.code).indexOf(first.code)
			c.cards[p] = newCard		
		}
		else if(pairs.length !== 0){
			const first = pairs.shift();
			const second = pairs.shift();
			const p = cardsOne.map(card => card.code).indexOf(first.code)
			c.cards[p] = newCard
			unicos.push(second)
		}else if(pairsEsc.length !== 0){
			const first = pairsEsc.shift();
			const second = pairsEsc.shift();
			const p = cardsOne.map(card => card.code).indexOf(first.code)
			c.cards[p] = newCard
			unicos.push(second)
		}  

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
				paresEsc, ternasEsc, cuartasEsc,
				cuartas,
				ternas,
				pares,
				unique,
				paresTwo, 
				ternasTwo, 
				cuartasTwo, 
				uniqueTwo,
				paresEscTwo, ternasEscTwo, cuartasEscTwo,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
