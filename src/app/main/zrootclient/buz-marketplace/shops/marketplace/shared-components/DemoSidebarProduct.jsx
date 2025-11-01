import CategoryAndTradehub from "../../components/CategoryAndTradehub";
import ProductFilter from "./ProductFilter";

/**
 * The DemoSidebar component.
 * Split layout: 40% categories, 60% filters
 * Responsive design preventing horizontal overflow
 */
function DemoSidebar({ onFilterChange }) {
  return (
    <div
      className="flex flex-col h-screen p-6"
      style={{
        background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
      }}
    >
      {/* Category Section - 40% */}
      <div
        className="flex-[4] overflow-y-auto overflow-x-hidden mb-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
          padding: '4px',
          boxShadow: '0 4px 15px rgba(234, 88, 12, 0.2)',
        }}
      >
        <div className="h-full rounded-xl overflow-hidden bg-white">
          <CategoryAndTradehub />
        </div>
      </div>

      {/* Filter Section - 60% */}
      <div className="flex-[6] overflow-y-auto overflow-x-hidden">
        <ProductFilter onFilterChange={onFilterChange} />
      </div>
    </div>
  );
}

export default DemoSidebar;
