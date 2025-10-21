import FoodMartFilterList from './FoodMartFilterList';

/**
 * The DemoSidebar component.
 */
function DemoSidebar({ onFilterChange }) {
  return (
   <>
    <div className="flex flex-col gap-16 px-12 py-24 h-screen">

      <FoodMartFilterList onFilterChange={onFilterChange} />


    </div>
   </>
  );
}

export default DemoSidebar;
