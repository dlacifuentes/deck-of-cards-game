import useGame from '../hooks/useGame';

const ViewComponents = () => {
    const { pares, ternas, cuartas, unique, paresTwo, ternasTwo, cuartasTwo, uniqueTwo  } = useGame();

  return (
    <div>
        <p>Cuartas</p>
			{cuartas.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
        <p>Ternas</p>
			{ternas.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
        <p>Pares</p>
			{pares.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
        <p>Unicos</p>
			{unique.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
		<p>Player Two</p>
		<p>Cuartas</p>
			{cuartasTwo.map((card, index) => (
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
        <p>Pares</p>
			{paresTwo.map((card, index) => (
				<img
					className='col-sm-1 col-lg-1 mx-2 my-2'
					key={index}
					src={card.image}
				    alt={card.value}
				/>
			))}
        <p>Unicos</p>
			{uniqueTwo.map((card, index) => (
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

export default ViewComponents