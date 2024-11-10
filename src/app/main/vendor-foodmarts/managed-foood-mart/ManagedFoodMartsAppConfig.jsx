import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ManagedFoodMartApp = lazy(() => import('./ManagedFoodMartApp'));
const BookingPropertyListing = lazy(() => import('./foodmart/FoodMartListing'));
const FoodMerchants = lazy(() => import('./foodmarts/FoodMerchants'));
const BookingProfileApp = lazy(() => import('./manageprofile/BookingProfileApp'));
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
					element: <BookingPropertyListing />
				},
				{
					path: 'managed-foodmerchants/:productId/manage',
					element: <BookingProfileApp />
				},

			]
		}
	]
};

export default ManagedFoodMartsAppConfig;
