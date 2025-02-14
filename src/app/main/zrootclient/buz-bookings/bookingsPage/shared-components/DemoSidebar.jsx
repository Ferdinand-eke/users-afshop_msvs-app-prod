/**
 * The DemoSidebar component.
 */
function DemoSidebar() {
  return (
    <div className="flex flex-col gap-16 px-12 py-24 h-screen">
      <div className="mb-10">
        <h2 className="font-bold mb-2 p-4">SORT BY</h2>
        <ul className="space-y-2 p-4">
          {/* build structure categories */}
          <li className="flex items-center  px-4 space-y-2 rounded-4 hover:bg-orange-500 cursor-pointer">
            <i className="fas fa-blender-phone mr-2"></i>
            <span>Beach </span>
          </li>
          <li className="flex items-center  px-4 space-y-2 rounded-4 hover:bg-orange-500 cursor-pointer">
            <i className="fas fa-blender-phone mr-2"></i>
            <span>Country side</span>
          </li>
          <li className="flex items-center  px-4 space-y-2 rounded-4 hover:bg-orange-500 cursor-pointer">
            <i className="fas fa-blender-phone mr-2"></i>
            <span>Hill</span>
          </li>
          <li className="flex items-center  px-4 space-y-2 rounded-4 hover:bg-orange-500 cursor-pointer">
            <i className="fas fa-blender-phone mr-2"></i>
            <span>Urban</span>
          </li>
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="font-bold mt-6 mb-4">PROPERTY TYPE</h2>
        <div className="space-y-4">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" />
            BUNGALOW
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" />
            TERRACE
          </label>
		  <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" />
            DUPLEX
          </label>
        </div>
      </div>
      <div className="mb-10">
        <h3 className="font-bold mt-6 mb-4">PRICE (₦)</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="border rounded p-2 w-60"
            placeholder="6090"
          />
          <span>-</span>
          <input
            type="number"
            className="border rounded p-2 w-60"
            placeholder="9999999"
          />
          <button className="bg-orange-500 hover:bg-orange-800 text-white px-4 py-2 rounded">
            APPLY
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="font-bold mt-6 mb-4">DISCOUNT PERCENTAGE</h2>
        <div className="space-y-4">
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="discount" className="mr-2" />
            50% or more
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="discount" className="mr-2" />
            40% or more
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="discount" className="mr-2" />
            30% or more
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="discount" className="mr-2" />
            20% or more
          </label>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default DemoSidebar;
