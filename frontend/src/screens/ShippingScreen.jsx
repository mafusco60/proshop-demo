import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [shippingName, setShippingName] = useState(
		shippingAddress?.shippingName || ''
	);
	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [state, setState] = useState(shippingAddress?.state || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || ''
	);
	const [country, setCountry] = useState(shippingAddress?.country || '');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddress({
				shippingName,
				address,
				city,
				state,
				postalCode,
				country,
			})
		);
		navigate('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />

			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className='my-2' controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Name'
						value={shippingName}
						onChange={(e) => setShippingName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='state'>
					<Form.Label>STATE</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter state'
						value={state}
						onChange={(e) => setState(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary' className='my-2'>
					{' '}
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
