import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));
/**
 * The Profile app config.
 */
const userProfileAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'user/profile',
			element: <ProfileApp />
		}
	]
	
};
export default userProfileAppConfig;
