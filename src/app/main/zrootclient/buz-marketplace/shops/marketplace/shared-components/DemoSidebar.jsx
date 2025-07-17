import FuseNavigation from '@fuse/core/FuseNavigation';
import CategoryAndTradehub from '../../components/CategoryAndTradehub';


/**
 * The DemoSidebar component.
 */
function DemoSidebar() {
	return (
		<div className="px-12 py-24 min-h-6xl">
			{/* <div className="mx-12 text-3xl font-bold tracking-tighter">Demo Sidebar</div> */}

		
		
                <CategoryAndTradehub />

                <h2 className="font-bold mt-6 mb-4">SHIPPED FROM</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from abroad
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from Nigeria
                  </label>
                </div>
                <h2 className="font-bold mt-6 mb-4">PRICE (₦)</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="6090"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="9999999"
                  />
                  <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    APPLY
                  </button>
                </div>
                <h2 className="font-bold mt-6 mb-4">DISCOUNT PERCENTAGE</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    50% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    40% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    30% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    20% or more
                  </label>
                </div>
              {/* </div> */}
		</div>
	);
}

export default DemoSidebar;
