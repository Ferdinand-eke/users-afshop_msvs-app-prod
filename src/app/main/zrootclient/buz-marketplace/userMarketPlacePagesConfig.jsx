import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const Cart = lazy(() => import('./shops/Cart'));
const CartReview = lazy(() => import('./shops/CartReview'));
const MarketplacePaymenSuccess = lazy(() => import('./shops/MarketplacePaymenSuccess'));
const MarketplaceOrders = lazy(() => import('./shops/MarketplaceOrders'));
const MarketplaceOrdersDetail = lazy(() => import('./shops/MarketplaceOrdersDetail'));

/**
 * The reset password pages config.
 */
const userMarketPlacePagesConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: true
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	

	routes: [

		{
			path: 'marketplace/cart',
			element: <Cart />
		},
		{
			path: 'marketplace/review-cart',
			element: <CartReview />
		},

		{
			path: 'marketplace/order/:marketplaceOrderId/payment-success',
			element: <MarketplacePaymenSuccess />
		},

		{
			path: 'marketplace/user/orders',
			element: <MarketplaceOrders />
		},

		{
			path: 'marketplace/user/orders/:orderId/view-order',
			element: <MarketplaceOrdersDetail />
		},

	


		
	]
};


export default userMarketPlacePagesConfig;


