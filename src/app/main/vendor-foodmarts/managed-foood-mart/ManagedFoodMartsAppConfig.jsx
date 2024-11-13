import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ManagedFoodMartApp = lazy(() => import('./ManagedFoodMartApp'));
const FoodMartListing = lazy(() => import('./foodmart/FoodMartListing'));
const FoodMerchants = lazy(() => import('./foodmarts/FoodMerchants'));
const FoodMartProfileApp = lazy(() => import('./manageprofile/FoodMartProfileApp'));
/**
 * The E-Commerce app configuration.
 */

const ManagedFoodMartsAppConfig = {
	settings: {
		layout: {}
	},
	
	routes: [
		{
			path: 'foodmarts',
			element: <ManagedFoodMartApp />,
			children: [
				{
					path: '',
					element: <Navigate to="managed-foodmerchants" />
				},
				{
					path: 'managed-foodmerchants',
					element: <FoodMerchants />
				},
				{
					path: 'managed-foodmerchants/:productId/*',
					element: <FoodMartListing />
				},
				{
					path: 'management-portal/:foodMartId/manage',
					element: <FoodMartProfileApp />
				},

			]
		}
	]
};

export default ManagedFoodMartsAppConfig;
