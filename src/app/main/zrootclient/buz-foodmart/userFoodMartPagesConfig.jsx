import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';
import BlankSample from '../../user-interface/page-layouts/blank';
const FoodCartReview = lazy(() => import('./FoodCartReview'));
const PaymenSuccess = lazy(() => import('./PaymenSucces'));
const FoodmartOrders = lazy(() => import('./FoodmartOrders'));
const FoodMartOrdersDetail = lazy(() => import('./FoodMartOrdersDetail'));

/**
 * The reset password pages config.
 */
const userFoodMartPagesConfig = {
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
			path: 'foodmarts/review-food-cart',
			element: <FoodCartReview />
		},

		{
			path: 'foodmarts/:orderId/payment-success',
			element: <PaymenSuccess />
		},

		{
			path: 'foodmarts/user/food-orders',
			element: <FoodmartOrders />
		},

		{
			path: 'foodmarts/user/food-orders/:foodOrderId/view',
			element: <FoodMartOrdersDetail />
		},

		
		
	]
};
export default userFoodMartPagesConfig;


