import { FormLabel } from 'react-bootstrap';
import cartSlice from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import express from 'express';

const PlaceOrderScreen = () => {
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate('/shipping');
		} else if (!cart.paymentMethod) {
			navigate('/payment');
		}
	}, [cart.shippingAddress.address, cart.PaymentMethod, navigate]);

	const { cartItems } = cart;
	const shippingAddress = useSelector((state) => state.cart.shippingAddress);
	const paymentMethod = useSelector((state) => state.cart.paymentMethod);

	const subtotalPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);
	const shippingPrice = subtotalPrice > 100 ? 0 : 10;
	const taxPrice = Number((0.15 * subtotalPrice).toFixed(2));
	const totalPrice = (subtotalPrice + shippingPrice + taxPrice).toFixed(2);

	return (
		<FormLabel>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={12}>
					<h3>Order Summary</h3>
				</Col>
				<Col md={12}>
					<h5 className='my-1'>Shipping Address:</h5>
					<FormLabel>
						<p className='mb-1'>{shippingAddress.address}</p>
						<p className='mb-1'>
							{shippingAddress.city}, {shippingAddress.state}{' '}
							{shippingAddress.postalCode}
						</p>
						<p className='mb-1'>{shippingAddress.country}</p>
						<Link to='/shipping'>Edit</Link>
					</FormLabel>
				</Col>
			</Row>
			<FormLabel>
				<h5 className='mt-4'>Payment Method:</h5> <p>{paymentMethod}</p>
				<h5>Items:</h5>
				<Link to='/cart'>Edit</Link>
				{cartItems.length === 0 ? (
					<>
						Your cart is empty <Link to='/'>Go Back</Link>
					</>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item._id}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={4}>
										<Link to={`/product/${item._id}`}>{item.name}</Link>
									</Col>
									<Col md={3}>Qty: {item.qty}</Col>
									<Col md={3} className='d-flex justify-content-end'>
										${item.price}
									</Col>
								</Row>
							</ListGroup.Item>
						))}
						<ListGroup.Item>
							<Row>
								<Col md={12}>
									<Row>
										<Col md={6}>
											<h5>Subtotal:</h5>
										</Col>
										<Col md={6} className='d-flex justify-content-end'>
											${subtotalPrice.toFixed(2)}
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<Row>
										<Col md={6}>
											<h5>Tax:</h5>
										</Col>
										<Col md={6} className='d-flex justify-content-end'>
											${taxPrice.toFixed(2)}
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<Row>
										<Col md={6}>
											<h5>Shipping:</h5>
										</Col>
										<Col md={6} className='d-flex justify-content-end'>
											${shippingPrice.toFixed(2)}
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<Row>
										<Col md={6}>
											<h5>Total:</h5>
										</Col>
										<Col md={6} className='d-flex justify-content-end'>
											${totalPrice}
										</Col>
									</Row>
								</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
				)}
				<Button type='button'>Place Order</Button>
			</FormLabel>
		</FormLabel>
	);
};

export default PlaceOrderScreen;
