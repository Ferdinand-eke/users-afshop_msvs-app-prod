import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useForm } from 'react-hook-form';
import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
import {
	getLgasByStateId,
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";
import useGetAllBookingProperties, { useGetBookingProperty } from 'app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from 'app/store/hooks';
import { selectFuseCurrentLayoutConfig } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { useCreateReservation, useGetReservations } from 'app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations';
import useCountries from "src/app/hooks/useCountries";
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,

} from "date-fns";
import { toDate } from "date-fns-tz";


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

function BookingsSinglePageWithSidebarsContentScroll() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

  /***
   * 
   * BOOKING SINGLE PAGE STARTS
   */

  const navigate = useNavigate();
  const routeParams = useParams();
  const { bookingId } = routeParams;
  const {
    data: booking,
    isLoading,
    isError,
  } = useGetBookingProperty(bookingId);

// console.log("Slug", bookingId);
//   console.log("bookingSingle", booking?.data?.listing);



  const config = useAppSelector(selectFuseCurrentLayoutConfig);
  const currentUser = useAppSelector(selectUser)
  const { mutate: createReservation, isLoading: reservationLoading } =  useCreateReservation();
  const { getByValue } = useCountries();

  const { data: reservatons, isLoading: getReservationLoading } =
    useGetReservations(booking?.data?.listing?.id);

    // console.log("reservatons", reservatons?.data?.reservations);

  const coordinates = getByValue(booking?.data?.listing?.locationValue)?.latlng;
  
  const disabledDates = useMemo(() => {
    let dates = [];

    reservatons?.data?.reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation?.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservatons?.data?.reservations]);


  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(booking?.data?.listing?.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if(!currentUser?.name){
        navigate('/sign-in')
        return;
    }

    const formData = {
      totalPrice,
      startDate: parseDateString(dateRange?.startDate),
      endDate: parseDateString(dateRange?.endDate),
      listingId: booking?.data?.listing?._id,
    };

   
     return createReservation(formData);
  }, [
    totalPrice,
    dateRange,
    booking?.data?.listing,
    routeParams,
    // currentUser
  ]);

  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange?.startDate,
        dateRange?.endDate
      );
      if (dayCount && booking?.data?.listing?.price) {
        setTotalPrice(dayCount * booking?.data?.listing?.price * -1);
      } else {
        setTotalPrice(booking?.data?.listing?.price);
      }
    }
  }, [dateRange, booking?.data?.listing?.price]);


	return (
		<Root
	
			header={
				<DemoHeader
				// countries={countries?.data?.data}
				// stateData={stateData}
				// blgas={blgas}
				// methods={methods}

					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={<DemoContent
				bookingData={ booking?.data?.listing}
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
      
      {booking?.data?.listing?.id && <DemoSidebarRight 
        isLoading={isLoading}
        listing={booking?.data?.listing}
        locationValue={booking?.data?.listing?.locationValue}
        coordinates={coordinates}
        price={booking?.data?.listing?.price}
        totalPrice={totalPrice}
        onChangeDate={(value) => setDateRange(value)}
        dateRange={dateRange}
        onSubmit={onCreateReservation}
        disabled={reservationLoading}
        disabledDates={disabledDates}
      />}
			scroll="content"
		/>
	);
}


export default BookingsSinglePageWithSidebarsContentScroll;
