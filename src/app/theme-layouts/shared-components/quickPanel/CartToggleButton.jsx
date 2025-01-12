import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleQuickPanel } from './quickPanelSlice';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useEffect, useState } from 'react';
import { useGetMyMarketplaceCartByUserCred } from 'app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { Typography, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

/**
 * The quick panel toggle button.
 */
function CartToggleButton(props) {
	const user = useAppSelector(selectUser);
	// const { data: foodCart, isLoading: foodCartLoading } = useGetMyFoodCart();
    const {data:cart, isLoading:loadingCart} = useGetMyMarketplaceCartByUserCred(user?.id)

	// const { children = <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon> } = props;
	const { children = <FuseSvgIcon>heroicons-outline:shopping-cart 
		{/* <Typography>{cart?.data?.cartItems?.length}</Typography> */}
	</FuseSvgIcon> } = props;
	// const { data: notifications } = useGetAllNotificationsQuery();
	const [animate, setAnimate] = useState(false);
	// const prevNotificationCount = useRef(notifications?.length);
	const theme = useTheme();
	// const dispatch = useAppDispatch();
	const controls = useAnimation();
	useEffect(() => {
		if (animate) {
			controls.start({
				rotate: [0, 20, -20, 0],
				color: [theme.palette.secondary.main],
				transition: { duration: 0.2, repeat: 5 }
			});
		} else {
			controls.start({ rotate: 0, scale: 1, color: theme.palette.text.secondary });
		}
	}, [animate, controls]);
	useEffect(() => {
		if (cart?.data?.cartItems?.length > 0) {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 1000); // Reset after 1 second
			return () => clearTimeout(timer);
		}

		// prevNotificationCount.current = notifications?.length;
		return undefined;
	}, [cart?.data?.cartItems?.length]);


	
	// const dispatch = useAppDispatch();
	return (
		<IconButton
		component={NavLinkAdapter}
		to="/marketplace/cart"
			className="h-40 w-40"
			// onClick={() => dispatch(toggleQuickPanel())}
			size="large"

		>
				<Badge
				color="secondary"
				variant="dot"
				invisible={cart?.data?.cartItems?.length === 0}
			>
				<motion.div animate={controls}>{children}</motion.div>
				
			</Badge>
			{/* {children} */}
		</IconButton>
	);
}

export default CartToggleButton;
