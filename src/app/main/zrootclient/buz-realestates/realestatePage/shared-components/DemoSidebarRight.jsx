import { useAppSelector } from "app/store/hooks";
import OfferDemoLeftSidebar from "../../real-estate-offers/shared-components/OfferDemoSidebar";
import { selectUser } from "src/app/auth/user/store/userSlice";


/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
	const currentUser = useAppSelector(selectUser);

	return (
		<div className="px-12 py-24 h-screen">
			{/* min-h-6xl  */}
			{currentUser?.id && <OfferDemoLeftSidebar />}

		</div>
	);
}

export default DemoSidebarRight;
