import FilterList from './FilterList';
import ApartmentAdsSlider from './ApartmentAdsSlider';

/**
 * The DemoSidebar component.
 * Split layout: 70% filters, 30% advertising slider
 */
function DemoSidebar({ onFilterChange }) {
  return (
    <div
      className="flex flex-col h-screen p-6"
      style={{
        background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
      }}
    >
      {/* Filter Section - 70% */}
      <div className="flex-[7] overflow-y-auto overflow-x-hidden mb-4">
        <FilterList onFilterChange={onFilterChange} />
      </div>

      {/* Ads Slider Section - 30% */}
      <div
        className="flex-[3] min-h-0 rounded-2xl overflow-hidden shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          padding: '4px',
        }}
      >
        <div className="h-full rounded-xl overflow-hidden bg-white">
          <ApartmentAdsSlider />
        </div>
      </div>
    </div>
  );
}

export default DemoSidebar;
