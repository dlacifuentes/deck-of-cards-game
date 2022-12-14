import useGame from '../hooks/useGame';

const ViewComponentsTwo = () => {
    const { paresTwo, ternasTwo, cuartasTwo, uniqueTwo  } = useGame();

  return (
    <div>
		<br></br>
		<h5>Equal Suit</h5>
        <p>Unicos</p>
			{uniqueTwo.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
		<p>Pares</p>
			{paresTwo.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
		<p>Ternas</p>
			{ternasTwo.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
		<p>Cuartas</p>
			{cuartasTwo.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
    </div>
  )
}

export default ViewComponentsTwo