import BookingsMap from '../../components/maps/BookingsMap';

/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
	const {bookingsData} = props
	return (
		<div className="px-12 py-24 h-screen">
			{/* min-h-6xl  */}
			<div className="mx-12 text-3xl font-bold tracking-tighter">Map Location Site Views</div>

			 <BookingsMap items={bookingsData}/>
		</div>
	);
}

export default DemoSidebarRight;
