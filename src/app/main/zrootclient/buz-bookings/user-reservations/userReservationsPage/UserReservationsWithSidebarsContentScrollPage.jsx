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
import { useUserCancelledTrips, useUserTrips } from 'app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations';

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
function UserReservationsWithSidebarsContentScrollPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

  // const { data: AllFoodMarts, isLoading, isError } = useGetAllFoodMarts();

  // const [loading, setLoading] = useState(false);
  // const [stateData, setStateData] = useState([]);
  // const [blgas, setBlgas] = useState([]);

  // const methods = useForm({
  //   mode: "onChange",
  //   defaultValues: {
  //     selectCountry: "",
  //     selectState: "",
  //     selectLga: "",
  //   },
  //   // resolver: zodResolver(schema)
  // });
  // const { reset, watch, control, formState, getValues } = methods;

  // const { selectCountry, selectState, selectLga } = watch();

  // const { data: countries } = useSellerCountries();

  // useEffect(() => {
  //   if (selectCountry?._id?.length > 0) {
  //     findStatesByCountry(selectCountry?._id);
  //   }

  //   if (getValues()?.selectState?._id?.length > 0) {
  //     getLgasFromState(getValues()?.selectState?._id);
  //   }
  // }, [selectCountry?._id, selectState?._id, selectLga?._id]);

  // async function findStatesByCountry(countryId) {
  //   setLoading(true);
  //   const stateResponseData = await getStateByCountryId(countryId);

  //   if (stateResponseData) {
  //     setStateData(stateResponseData?.data);

  //     setTimeout(
  //       function () {
  //         setLoading(false);
  //       }.bind(this),
  //       250
  //     );
  //   }
  // }

  // //**Get L.G.As from state_ID data */
  // async function getLgasFromState(sid) {
  //   setLoading(true);
  //   const responseData = await getLgasByStateId(sid);

  //   if (responseData) {
  //     setBlgas(responseData?.data);
  //     setTimeout(
  //       function () {
  //         setLoading(false);
  //       }.bind(this),
  //       250
  //     );
  //   }
  // }

  const { data: myreservations, isLoading, isError } = useUserTrips();
  const {data:cancelledReservations, isLoading:isLoadingCanclled, isError:isCancelledError} = useUserCancelledTrips()

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
				products={myreservations?.data?.myreservations}
				isLoading={isLoading}
				isError={isError}

        // cancelled reservations
        cancelledReservations={cancelledReservations?.data?.myreservations}
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
			rightSidebarContent={<DemoSidebarRight/>}
			scroll="content"
		/>
	);
}

export default UserReservationsWithSidebarsContentScrollPage;
