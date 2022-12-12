const cardsApi = 'https://deckofcardsapi.com/api/deck'

// obtener id
const getIdGame = async () => {
	const url = `${cardsApi}/new/shuffle/?deck_count=1`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.deck_id;
};

// obtener cartas iniciales
const initialCards = async deckId => {
	const url = `${cardsApi}/${deckId}/draw/?count=10`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

const getCards = async deckId => {
	const url =  `${cardsApi}/${deckId}/draw/?count=10`;
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

// obtener nuevas cartas
const getNewCards = async deckId => {
	const url = `${cardsApi}/${deckId}/draw/?count=2`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

// obtener cantidad de cartas restantes
const getRemaining = async deckId => {
	const url = `${cardsApi}/${deckId}/draw/?count=0`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.remaining;
};

const DeckOfCardsAPI = {
	getIdGame,
	initialCards,
	getCards,
	getRemaining,
	getNewCards,	
};

export default DeckOfCardsAPI;
