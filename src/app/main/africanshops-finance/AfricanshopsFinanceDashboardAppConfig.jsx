import { lazy } from 'react';

const FinanceDashboardApp = lazy(() => import('./FinanceDashboardApp'));
const FinanceDashboardAppWithdarwals = lazy(() => import('./FinanceDashboardAppWithdarwals'));
/**
 * The finance dashboard app config.
 */

const AfricanshopsFinanceDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	
	routes: [
		{
			path: 'africanshops/finance',
			element: <FinanceDashboardApp />
		},

		{
			path: 'africanshops/withdrawals',
			element: <FinanceDashboardAppWithdarwals />
			// element: <FinanceDashboardApp />
		}
	],

	
};
export default AfricanshopsFinanceDashboardAppConfig;
