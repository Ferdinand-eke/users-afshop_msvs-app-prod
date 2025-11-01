import UserAccountLeads from "src/app/main/zrootclient/components/UserAccountLeads";
import AdsSlider from "./AdsSlider";

/**
 * DemoSidebar Component
 * Left sidebar split into 60% UserAccountLeads and 40% Promotional Ads
 * The ads slider takes 70% of its 40% allocation (28% of total height)
 */
function DemoSidebar() {
  return (
    <div className="h-full flex flex-col p-6 md:p-8 overflow-hidden">
      {/* User Account Leads Section - 60% */}
      <div
        className="flex-[0_0_60%] mb-6 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#ea580c #f5f5f4",
        }}
      >
        <UserAccountLeads />
      </div>

      {/* Ads Section - 40% (with slider taking 70% of this space) */}
      <div className="flex-[0_0_40%] min-h-0 flex flex-col">
        {/* Section Label - 30% of the 40% space */}
        <div className="flex-[0_0_30%] flex flex-col justify-center pb-3">
          <h3
            className="text-sm font-semibold tracking-wide uppercase"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Special Offers
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Exclusive deals just for you
          </p>
        </div>

        {/* Ads Slider - 70% of the 40% space */}
        <div className="flex-[0_0_70%] min-h-0 rounded-2xl overflow-hidden shadow-xl">
          <AdsSlider />
        </div>
      </div>
    </div>
  );
}

export default DemoSidebar;
