import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useCallback, useEffect, useState } from 'react';
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
import useGetAllFoodMarts, { useAddToFoodCart, useGetMyFoodCartByUserCred, useGetSingleMenuItem } from 'app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from 'app/store/hooks';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { getFoodVendorSession, storeFoodVendorSession } from 'src/app/main/vendors-shop/pos/PosUtils';

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
function FoodMartSingleMenuWithContentScrollPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);


  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const routeParams = useParams();
  const { menuId } = routeParams;
  const { data:menu, isLoading, isError } = useGetSingleMenuItem(menuId);

  const {mutate: addToFoodCart, isLoading:addFoodCartLoading} = useAddToFoodCart()

  const { data: foodCart  } = useGetMyFoodCartByUserCred(user?.id); 

  
  const onAddToFoodCart = useCallback(() => {
    if(!user?.email){
        navigate('/sign-in')
        return;
    }

    const formData = {
      user:user?.id,
      quantity: 1,
      menu: menu?.data?._id,
      shop: menu?.data?.shop,
      foodMart: menu?.data?.foodMartVendor,
    };
    // console.log("foodCart", foodCart?.data?.foodcart)
    // console.log("foodCart_LENGTH", foodCart?.data?.foodcart.length)
    //  return addToFoodCart(formData);

     if (foodCart?.data?.foodcart.length < 1) {
      const sessionPayload = {
        shopID: menu?.data?.shop,
        shopCountryOrigin: menu?.data?.foodMartMenuCountry,
        shopStateProvinceOrigin: menu?.data?.foodMartMenuState,
        shopLgaProvinceOrigin: menu?.data?.foodMartMenuLga,
        // shopMarketId: product?.data?.market?._id,
        foodMartId:menu?.data?.foodMartVendor
      }

      const setCartSessionPayload = storeFoodVendorSession(sessionPayload);
      if(setCartSessionPayload){
        addToFoodCart(formData);
        // getCartWhenAuth()
        return
      }
      
    } else {
      const payloadData = getFoodVendorSession()
      //get shopping _client_session
      // return;
      // console.log('session_LGA', payloadData?.shopLgaProvinceOrigin)
      // console.log('menu_LGA', menu?.data?.foodMartMenuLga)
      if (payloadData?.shopLgaProvinceOrigin === menu?.data?.foodMartMenuLga) {
         addToFoodCart(formData);
        // getCartWhenAuth()
        return
      } else {
        alert("You must shop in one L.G.A/County at a time");
        return
      }
    }
  }, [
    menu?.data?._id,
    routeParams,
    user
  ]);


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
				menuData={menu?.data}
				isLoading={isLoading}
				isError={isError}
        onAddToFoodCart={onAddToFoodCart}
        addFoodCartLoading={addFoodCartLoading}
        foodCart={foodCart}
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
        // methods={methods}
      	menu={menu?.data}
      />}
			scroll="content"
		/>
	);
}

export default FoodMartSingleMenuWithContentScrollPage;
