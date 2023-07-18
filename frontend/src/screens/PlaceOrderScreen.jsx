//import { Card, FormLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { clearShippingPrice } from '../slices/cartSlice';
const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const [createOrder, { isLoading, error }] = useCreateOrderMutation();

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate('/shipping');
		} else if (!cart.paymentMethod) {
			navigate('/payment');
		}
	}, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();
			dispatch(clearCartItems());
			dispatch(clearShippingPrice());
			navigate(`/order/${res._id}`);
		} catch (err) {
			toast.error(err);
		}
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={12}>
					<h2>
						<strong>Shipping</strong>
					</h2>
					<ListGroup variant='flush'>
						<h5>
							<strong>Address:</strong>
						</h5>
						<ListGroup.Item>
							<p className='mb-1'>{cart.shippingAddress.shippingName}</p>
							<p className='mb-1'>{cart.shippingAddress.address}</p>
							<p className='mb-1'>
								{cart.shippingAddress.city}
								{', '}
								{cart.shippingAddress.state} {cart.shippingAddress.postalCode}
							</p>
							<p className='mb-1'>{cart.shippingAddress.country}</p>
							<p className='mb-1'>
								<Link to='/shipping'>Edit Address</Link>
							</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={12}>
					<ListGroup.Item>
						<h2>
							<strong>Payment</strong>
						</h2>
						<ListGroup.Item>
							<h5 className='mt-3'>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</h5>{' '}
						</ListGroup.Item>
					</ListGroup.Item>
					<ListGroup.Item>
						<h2>
							<strong>Order Details</strong>
						</h2>
						<h5 className='mt-4'>
							<strong>Items: </strong>
						</h5>{' '}
						{cart.cartItems.length === 0 ? (
							<Message>Your cart is empty</Message>
						) : (
							//<Link to='/'>Go Back</Link>)
							<ListGroup variant='flush'>
								{cart.cartItems.map((item, index) => (
									<ListGroup.Item key={index}>
										<Row>
											<Col md={2}>
												<Image src={item.image} alt={item.name} fluid rounded />
											</Col>

											<Col md={4}>
												<Link to={`/product/${item._id}`}>{item.name}</Link>
											</Col>
											<Col md={3}>Qty: {item.qty}</Col>
											<Col md={3} className='d-flex justify-content-end'>
												${item.price * item.qty}
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Link to={'/cart'}>Edit Cart</Link>
							</ListGroup.Item>
						</ListGroup>
					</ListGroup.Item>
				</Col>

				<Col md={12}>
					<h2>
						<strong>Order Summary</strong>
					</h2>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<Row>
								<Col md={6}>
									<h5>Items:</h5>
								</Col>
								<Col md={6} className='d-flex justify-content-end'>
									${cart.itemsPrice}
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col md={6}>
									<h5>Tax:</h5>
								</Col>
								<Col md={6} className='d-flex justify-content-end'>
									${cart.taxPrice}
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col md={6}>
									<h5>Shipping:</h5>
								</Col>
								<Col md={6} className='d-flex justify-content-end'>
									${cart.shippingPrice}
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col md={6}>
									<h5>Total:</h5>
								</Col>
								<Col md={6} className='d-flex justify-content-end'>
									${cart.totalPrice}
								</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<ListGroup.Item>
					{error ? (
						<Message variant='danger'>{error.data.message}</Message>
					) : null}
				</ListGroup.Item>

				<Button
					type='button'
					className='btn-block'
					disabled={cart.cartItems.length === 0}
					onClick={placeOrderHandler}
				>
					Place Order
				</Button>
				{isLoading && <Loader />}
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
