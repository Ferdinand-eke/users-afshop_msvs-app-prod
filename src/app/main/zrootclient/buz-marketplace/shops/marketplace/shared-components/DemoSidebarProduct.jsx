import FuseNavigation from "@fuse/core/FuseNavigation";
import CategoryAndTradehub from "../../components/CategoryAndTradehub";
import ProductFilter from "./ProductFilter";

/**
 * The DemoSidebar component.
 */
function DemoSidebar({ onFilterChange }) {
  return (
    <div className="flex flex-col gap-2 px-12 py-24 h-screen">
      <div className="max-h-[300px] overflow-y-auto">
        <CategoryAndTradehub />
      </div>

      <ProductFilter onFilterChange={onFilterChange} />
    </div>
  );
}

export default DemoSidebar;
