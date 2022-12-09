import React from 'react'
import useGame from '../hooks/useGame';

const ListNewCards = () => {

    const { newCard } = useGame();

    return (
        <div className='align-items-center my-2'>
            <p>New card</p>
            {newCard.map((card, index) => (
            <img
                className='col-sm-12 col-lg-12 mx-2 my-4'
                key={index}
                src={card.image}
                alt={card.value}
            />
            ))}
        </div>
  )
}

export default ListNewCards