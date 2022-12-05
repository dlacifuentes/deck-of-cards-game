const cardsApi = 'https://deckofcardsapi.com/api/deck'

const getIdGame = async () => {
	const url = `${cardsApi}/new/shuffle/?deck_count=1`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.deck_id;
};

const getCards = async deckId => {
	const url = `${cardsApi}/${deckId}/draw/?count=10`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

const getCard = async deckId => {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

const DeckOfCardsAPI = {
	getIdGame,
	getCards,
	getCard,
};

export default DeckOfCardsAPI;
