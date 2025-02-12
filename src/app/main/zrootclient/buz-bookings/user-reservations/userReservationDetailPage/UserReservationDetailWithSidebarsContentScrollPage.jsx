import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useForm } from 'react-hook-form';
// import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
// import {
// 	getLgasByStateId,
// 	getStateByCountryId,
//   } from "app/configs/data/client/RepositoryClient";
// import useGetAllBookingProperties from 'app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo';
// import useGetAllFoodMarts from 'app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo';
import { useGetUserSingleTrip, useUserTrips } from 'app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations';
import { useParams } from 'react-router';

const Root = styled(FusePageSimpleWithMargin)(({ theme }) => ({
	
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-toolbar': {

	},
	'& .FusePageSimple-content': {
	},
	'& .FusePageSimple-sidebarHeader': {
		
	},
	'& .FusePageSimple-sidebarContent': {
		
	},
	
}));

/**
 * The SimpleWithSidebarsContentScroll page.
 */
function UserReservationDetailWithSidebarsContentScrollPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);


	const routeParams = useParams();
	const { reservationId } = routeParams;
  
	const {
	  data: reservation,
	  isLoading,
	  isError,
	} = useGetUserSingleTrip(reservationId);
  
  
//   const { data: myreservations, isLoading, isError } = useUserTrips();


	return (
		<Root
	
			header={
				<DemoHeader

					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={<DemoContent
				reservation={reservation?.data?.reservation}
				isLoading={isLoading}
				isError={isError}
				/>}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarContent={<DemoSidebar />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => {
				setRightSidebarOpen(false);
			}}
			rightSidebarContent={<DemoSidebarRight 
   
      />}
			scroll="content"
		/>
	);
}


export default UserReservationDetailWithSidebarsContentScrollPage;
