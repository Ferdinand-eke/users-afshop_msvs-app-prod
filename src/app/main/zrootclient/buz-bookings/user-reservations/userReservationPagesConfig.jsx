import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const ModernReversedResetPasswordPage = lazy(() => import('./ModernReversedResetPasswordPage'));
const ReviewReservation = lazy(() => import('./ReviewReservation'));
const UserReservations = lazy(() => import('./UserReservations'));
const UserReservationsDetail = lazy(() => import('./UserReservationsDetail'));
const ReviewReservationPaymentSucces = lazy(() => import('./ReviewReservationPaymentSucces'));

/**
 * The reset password pages config.
 */
const userReservationPagesConfig = {
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
			path: 'bookings/reservation/review/:reservationId',
			element: <ReviewReservation />
		},
		
		{
			path: 'bookings/my-reservations',
			element: <UserReservations />
		},
		
		{
			path: 'bookings/:reservationId/reservation-detail',
			element: <UserReservationsDetail />
		},
		{
			path: 'bookings/:reservationId/payment-success',
			element: <ReviewReservationPaymentSucces />
		},

		
	]
	
};
export default userReservationPagesConfig;
