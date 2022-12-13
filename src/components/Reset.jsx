import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';
import useGame from '../hooks/useGame';
import App from '../App';

const Reset = () => {

    const { resetGame } = useGame();

    const navigate = useNavigate();

    const handleClick = async event => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            console.log(form);
        } else {
            await resetGame();
            navigate('/', { replace: true });
            App();
        }
        
    };

    return (
        <Stack gap={2} className='col-md-5 mx-auto'>
            <Button onClick={handleClick} variant='secondary'>
                Reset Game
            </Button>
            
        </Stack>
        
    )
}

export default Reset