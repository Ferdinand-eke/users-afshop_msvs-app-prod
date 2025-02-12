import FuseNavigation from '@fuse/core/FuseNavigation';
// import FoodMartMap from '../../components/maps/FoodMartMap';
/**
 * Navigation data
 */


/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
	// const {methods, listingsData} = props
	// // console.log("Bookin_DATA", bookingsData)
	// const { watch } = methods;
	// const { selectCountry } = watch();
	return (
		<div className="px-12 py-24 h-screen">
			{/* min-h-6xl  */}
			<div className="mx-12 text-3xl font-bold tracking-tighter">Map Location Site Views</div>

		
			 {/* <BookingsMap items={bookingsData}/> */}
			 {/* {selectCountry?._id && 
                  <FoodMartMap
                    center={selectCountry}
                    items={listingsData}
                  />} */}
		</div>
	);
}



export default DemoSidebarRight;
