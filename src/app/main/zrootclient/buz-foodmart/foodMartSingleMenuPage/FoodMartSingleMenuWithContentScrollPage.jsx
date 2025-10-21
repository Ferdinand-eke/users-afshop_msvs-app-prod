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
import useGetAllFoodMarts, { useAddToFoodCart, useGetMyFoodCart, useGetMyFoodCartByUserCred, useGetSingleMenuItem } from 'app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from 'app/store/hooks';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { getFoodVendorSession, storeFoodVendorSession } from 'src/app/main/vendors-shop/PosUtils';

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
  const {rcsId, menuSlug } = routeParams;
  const { data:menu, isLoading, isError } = useGetSingleMenuItem(rcsId, menuSlug);
  // console.log("FOOD___MENU_ITEM", menu?.data?.menu)


  const {mutate: addToFoodMenuToCart, isLoading:addFoodCartLoading} = useAddToFoodCart()

  const { data: foodCart  } = useGetMyFoodCart(user?.id); 

 

  const onAddToFoodCart = useCallback(() => {
      if (!user?.email) {
        navigate("/sign-in");
        return;
      }
  
      const formData = {
        user: user?.id,
        quantity: 1,
        foodMenuItem: menu?.data?.menu?.id,
        foodMart: menu?.data?.menu?.foodMartVendor,
        shopID: menu?.data?.menu?.shop,
        countryId: menu?.data?.menu?.foodMartMenuCountry,
        stateId: menu?.data?.menu?.foodMartMenuState,
        lgaId: menu?.data?.menu?.foodMartMenuLga,
        // shopMarketId: menu?.data?.menu?.market,
        // shoppingSession:''
      };
      if (foodCart?.data?.userFoodCartSession?.cartProducts?.length === 0) {
   
        if (foodCart?.data?.userFoodCartSession?.lgaId) {
          addToFoodMenuToCart(formData);
          // getCartWhenAuth()
          return;
        }
      } else {
  
        if (
          foodCart?.data?.userFoodCartSession?.lgaId ===
          menu?.data?.menu?.foodMartMenuLga  || !foodCart?.data?.userFoodCartSession?.lgaId
        ) {
          addToFoodMenuToCart(formData);
          // getCartWhenAuth()
          return;
        } else {
          alert("You must shop in one L.G.A/County at a time");
          return;
        }
      }
    }, [
      menu?.data?.menu?.id,
      routeParams,
      user,
      foodCart?.data?.userFoodCartSession?.cartProducts,
      foodCart?.data?.userFoodCartSession?.cartProducts?.length,
    ]);


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
				menuData={menu?.data?.menu}
				isLoading={isLoading}
				isError={isError}
        onAddToFoodCart={onAddToFoodCart}
        addFoodCartLoading={addFoodCartLoading}
        foodCart={foodCart?.data?.userFoodCartSession}
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

      	menu={menu?.data?.menu}
      />}
			scroll="content"
		/>
	);
}

export default FoodMartSingleMenuWithContentScrollPage;
