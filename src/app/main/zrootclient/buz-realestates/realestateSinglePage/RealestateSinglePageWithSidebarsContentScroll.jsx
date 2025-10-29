import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
// import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
// import { useForm } from 'react-hook-form';
// import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
// import {
// 	getLgasByStateId,
// 	getStateByCountryId,
//   } from "app/configs/data/client/RepositoryClient";
// import useGetAllBookingProperties, { useGetBookingProperty } from 'app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from 'app/store/hooks';
import { selectFuseCurrentLayoutConfig } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { selectUser } from 'src/app/auth/user/store/userSlice';
// import { useCreateReservation, useGetReservations } from 'app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations';
// import useCountries from "src/app/hooks/useCountries";
// import {
//   differenceInCalendarDays,
//   differenceInDays,
//   eachDayOfInterval,

// } from "date-fns";
import { toDate } from "date-fns-tz";
import { useGetEstateProperty } from 'app/configs/data/server-calls/auth/userapp/a_estates/useEstatePropertiesRepo';
import GlobalChat from '../realestate-components/GlobalChat';


const Root = styled(FusePageSimpleWithMargin)(({ theme }) => ({

	// marginLeft:'100px',
	// marginRight:'100px',
	
	
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-toolbar': {

	},
	'& .FusePageSimple-content': {
		// marginLeft:'100px',
		// marginRight:'100px',
	},
	'& .FusePageSimple-sidebarHeader': {
		
	},
	'& .FusePageSimple-sidebarContent': {
		
	},
	
}));


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};


const parseDateString = (dateString) => {

  const dateTimeRegex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9](:([0-5][0-9]|60))?(\.[0-9]{1,9})?)?)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)?)?)?$/

  
  if (dateTimeRegex.test(dateString)) {
    return toDate(dateString)
  }
  return new Date(dateString)
}
/**
 * The SimpleWithSidebarsContentScroll page.
 */

function RealestateSinglePageWithSidebarsContentScroll() {
  const [isChatOpen, setIsChatOpen] = useState(false);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

  /***
   * 
   * REAL-ESTATE SINGLE PAGE STARTS
   */

  // const navigate = useNavigate();
  const routeParams = useParams();
  const { slug } = routeParams;
  const {
    data: estateList,
    isLoading,
    isError,
  } = useGetEstateProperty(slug);

  const currentUser = useAppSelector(selectUser)
  
	return (
		<>
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
				estatePropertyData={ estateList?.data?.propertyListing}
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


			rightSidebarContent=
      
      {estateList?.data?.propertyListing?.id && <DemoSidebarRight 
        isLoading={isLoading}
        listing={estateList?.data?.propertyListing}
        // locationValue={estateList?.data?.propertyListing?.locationValue}
        // coordinates={coordinates}
        // price={estateList?.data?.propertyListing?.price}
        // totalPrice={totalPrice}
        // onChangeDate={(value) => setDateRange(value)}
        // dateRange={dateRange}
        // onSubmit={onCreateReservation}
        // disabled={reservationLoading}
        // disabledDates={disabledDates}
      />}
			scroll="content"
		/>

     {/* Chat Component - Fixed at the bottom */}
     {currentUser?.id &&  <GlobalChat
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          realtorName={estateList?.data?.propertyListing?.realtor?.name || 'Realtor'}
        />}
       
    </>
	);
}



export default RealestateSinglePageWithSidebarsContentScroll;
