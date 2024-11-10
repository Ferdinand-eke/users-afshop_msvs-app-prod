import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ManagedBookingListingApp = lazy(() => import('./ManagedBookingListingApp'));
const BookingPropertyListing = lazy(() => import('./bookingsproperty/BookingPropertyListing'));
const BookingProperties = lazy(() => import('./properties/BookingProperties'));
const BookingProfileApp = lazy(() => import('./manageprofile/BookingProfileApp'));
// const Order = lazy(() => import('./order/Order'));
// const Orders = lazy(() => import('./orders/Orders'));
/**
 * The E-Commerce app configuration.
 */

const ManagedBookingsListingsAppConfig = {
	settings: {
		layout: {}
	},
	
	routes: [
		{
			path: 'bookings',
			element: <ManagedBookingListingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="managed-listings" />
				},
				{
					path: 'managed-listings',
					element: <BookingProperties />
				},
				{
					path: 'managed-listings/:productId/*',
					element: <BookingPropertyListing />
				},
				{
					path: 'managed-listings/:productId/manage',
					element: <BookingProfileApp />
				},

			]
		}
	]
};

export default ManagedBookingsListingsAppConfig;
