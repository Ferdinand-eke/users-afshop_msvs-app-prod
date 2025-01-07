import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleQuickPanel } from './quickPanelSlice';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';

/**
 * The quick panel toggle button.
 */
function CartToggleButton(props) {
	const { children = <FuseSvgIcon>heroicons-outline:shopping-cart</FuseSvgIcon> } = props;
	const dispatch = useAppDispatch();
	return (
		<IconButton
		component={NavLinkAdapter}
		to="/marketplace/cart"
			className="h-40 w-40"
			// onClick={() => dispatch(toggleQuickPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default CartToggleButton;
