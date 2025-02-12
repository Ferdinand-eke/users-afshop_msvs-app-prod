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
import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
import {
	getLgasByStateId,
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";
import useGetAllBookingProperties from 'app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo';
import  { useGetMartMenu } from 'app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo';
import { useParams } from 'react-router';

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
    innerWidth:'60%'
		
	},
	
}));

/**
 * The SimpleWithSidebarsContentScroll page.
 */
function VisitFoodMartWithContentScrollPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

  const routeParams = useParams();
  const { martId } = routeParams;
  const { data: martMenu, isLoading, isError } = useGetMartMenu(martId);

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
  // useEffect(() => {
  //   if (selectCountry?.length > 0) {
  //     console.log(`Getting stated in this country ${location?.name}`);
  //     findStatesByCountry(selectCountry);
  //   }

  //   if (selectCountry && selectState) {
  //     getLgasFromState(selectState);
  //   }

  //   if (selectCountry && selectState && selectLga) {
  //     console.log("Getting products for this partivular LGA :", selectLga);
  //   }
  // }, [selectCountry, selectState, selectLga]);
  useEffect(() => {
    if (selectCountry?._id?.length > 0) {
      findStatesByCountry(selectCountry?._id);
    }

    if (getValues()?.selectState?._id?.length > 0) {
      getLgasFromState(getValues()?.selectState?._id);
    }
  }, [selectCountry?._id, selectState?._id, selectLga?._id]);

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


  // console.log("MART_MENU", martMenu?.data)
  // console.log("stateCORDINATEs", martMenu?.data?.foodVendor?.foodMartState)

  // console.log("foodVENDOR_CORDINATES", martMenu?.data?.data?.foodVendor)


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
				products={martMenu?.data?.data}
				isLoading={isLoading}
				isError={isError}
				/>}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarContent={<DemoSidebar 
      martMenu={martMenu?.data?.data}
      />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => {
				setRightSidebarOpen(false);
			}}
			rightSidebarContent={<DemoSidebarRight 
     
        center={martMenu?.data?.foodVendor?.foodMartState} 
        items={martMenu?.data?.foodVendor} 
      />}
			scroll="content"
		/>
	);
}


export default VisitFoodMartWithContentScrollPage;
