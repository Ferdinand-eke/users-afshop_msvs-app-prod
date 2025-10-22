import SellerInformation from "src/app/main/zrootclient/components/SellerInformation";
/**
 * Navigation data
 */

/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
  const { menu } = props;

  return (
    <div className="px-12 py-24 h-screen">
      {/* min-h-6xl  */}
      {/* <div className="mx-12 text-3xl font-bold tracking-tighter">Map Location Site Views</div> */}

      <div className="w-full p-4">
        <div className="bg-white p-4 rounded">
          <h2 className="text-lg font-bold">DELIVERY & RETURNS</h2>
          <div className="mt-2 space-y-4">
            <label className="block text-gray-800">Choose your location</label>
            <select className="w-full mt-1 p-2 border rounded">
              <option>Lagos</option>
            </select>
            <select className="w-full mt-1 p-2 border rounded">
              <option>LEKKI-AJAH (SANGOTEDO)</option>
            </select>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-4">
                    <img
                      src="http://localhost:3000/assets/images/afslogo/afslogo.png"
                      width={20}
                      height={10}
                    />
                    <h3 className="font-bold">Pickup Station</h3>
                  </div>
                  <span
                    href="#"
                    className="text-orange-500 inline cursor-pointer"
                  >
                    Details
                  </span>
                </div>

                <p className="text-gray-500 text-sm">Delivery Fees ₦ 1,080</p>
                <p className="text-gray-500 text-sm">
                  Arriving between 21 November & 22 November. Order within 3mins
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-4">
                    <img
                      src="http://localhost:3000/assets/images/afslogo/afslogo.png"
                      width={20}
                      height={10}
                    />
                    <h3 className="font-bold">Door Delivery</h3>
                  </div>
                  <span
                    href="#"
                    className="text-orange-500 inline cursor-pointer"
                  >
                    Details
                  </span>
                </div>

                <p className="text-gray-500 text-sm">Delivery Fees ₦ 1,790</p>
                <p className="text-gray-500 text-sm">
                  Ready for delivery between 21 November & 22 November when you
                  order within next 3mins
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-4">
                    {/* <img
                      src="http://localhost:3000/assets/images/afslogo/afslogo.png"
                      width={20}
                      height={10}
                    /> */}
                    <h3 className="font-bold">Return Policy</h3>
                  </div>
                  <span
                    href="#"
                    className="text-orange-500 inline cursor-pointer"
                  >
                    Details
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  Free return within 7 days for ALL eligible items and items in
                  food cart
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SELLER INFORMATION Section */}
        <div className="mt-4">
          <SellerInformation
            sellerName="FoodMart Official Restaurant"
            sellerDescription="Serving delicious meals since 2019"
            sellerScore={96}
            followers={3200}
            products={450}
            shippingSpeed={{ label: "Excellent", value: 97, color: "green" }}
            qualityScore={{ label: "Excellent", value: 99, color: "green" }}
            customerRating={{ label: "Excellent", value: 95, color: "green" }}
            responseTime={{ label: "Very Fast", value: 98, color: "blue" }}
            // storePath={`/foodmarts/${menu?.slug}/visit-mart/${menu?.slug}`}
          />
        </div>
      </div>
    </div>
  );
}

export default DemoSidebarRight;
