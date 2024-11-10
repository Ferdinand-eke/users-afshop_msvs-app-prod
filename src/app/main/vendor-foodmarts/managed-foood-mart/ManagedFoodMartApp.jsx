import { useGetMyShopAndPlan } from 'app/configs/data/server-calls/shopdetails/useShopDetails';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * The E-Commerce app.
 */
function ManagedFoodMartApp() {

	// const {data:myshopData, isLoading} = useGetMyShopAndPlan()
	// if(myshopData?.data?.shopplan?.plankey !== 'HOTELSANDAPARTMENTS'){
	// 	return <Navigate to={`/shop-dashboard`} />
	// }

	return <Outlet />;
}


export default ManagedFoodMartApp;
