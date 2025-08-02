import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import { useForm } from 'react-hook-form';
import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
import {
	getLgasByStateId,
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";
import useGetAllBookingProperties from 'app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo';

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


function BookingsPageWithSidebarsContentScrollComponent() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);


  const { data: bookingprops, isLoading, isError } = useGetAllBookingProperties();

  console.log("bookingprops", bookingprops?.data?.bookingLists);
  

  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [blgas, setBlgas] = useState([]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      selectCountry: "",
      selectState: "",
      selectLga: "",
    },
    // resolver: zodResolver(schema)
  });
  const { reset, watch, control, formState, getValues } = methods;

  const { selectCountry, selectState, selectLga } = watch();

  const { data: countries } = useSellerCountries();

  

  /****Use-EFFECT to manage request for Country=>state=>LGA fetch */
  useEffect(() => {
    if (selectCountry?.length > 0) {
      findStatesByCountry(selectCountry);
    }

    if (selectCountry && selectState) {
      getLgasFromState(selectState);
    }

    if (selectCountry && selectState && selectLga) {
      console.log("Getting products for this partivular LGA :", selectLga);
    }
  }, [selectCountry, selectState, selectLga]);

  async function findStatesByCountry(countryId) {
    setLoading(true);
    const stateResponseData = await getStateByCountryId(countryId);

    if (stateResponseData) {
      setStateData(stateResponseData?.data);

      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  //**Get L.G.As from state_ID data */
  async function getLgasFromState(sid) {
    setLoading(true);
    const responseData = await getLgasByStateId(sid);

    if (responseData) {
      setBlgas(responseData?.data);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }






	return (
		<Root
	
			header={
				<DemoHeader
				countries={countries?.data?.data}
				stateData={stateData}
				blgas={blgas}
				methods={methods}

					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={<DemoContent
				products={bookingprops?.data?.bookingLists}
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
      	bookingsData={bookingprops?.data?.bookingLists}
      />}
			scroll="content"
		/>
	);
}

export default BookingsPageWithSidebarsContentScrollComponent;
