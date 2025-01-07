import DemoContent from '@fuse/core/DemoContent';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')({
	padding: 24
});

/**
 * The MarketplacePaymenSuccess page.
 */
function MarketplacePaymenSuccess() {

    /****Perform a get request to find the paymentresucult => success status */
	return (
		<Root className="bg-gray-400 flex items-center justify-center min-h-screen">
            

			<div className="bg-gray-800 text-center p-6 sm:p-10 rounded-lg shadow-lg max-w-xs sm:max-w-md mx-auto">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-500 rounded-full p-4">
								<FuseSvgIcon className="fas fa-check text-white text-2xl">heroicons-outline:check</FuseSvgIcon>
						
                        </div>
                    </div>
                    <h1 className="text-white text-xl sm:text-2xl font-bold mb-2">Payment successful!</h1>
                    <p className="text-gray-400 mb-6 text-xs sm:text-base">Hi Ferdi!. </p>
                    <p className="text-gray-400 mb-6 text-sm sm:text-base">Your transaction was completed successfully. Thank you for your purchase!</p>
                    <br/>
                    <p className='text-gray-400  text-[10px] justify-start'>An email has been sent to with an invoice to confirm this purchase.</p>
                    <Button size='sm' className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-orange-800"
                    component={NavLinkAdapter}
                    to='/marketplace/shop'
                    >
                        Go to Your Dashboard
                    </Button>
                </div>
		</Root>
	);
}

export default MarketplacePaymenSuccess;
