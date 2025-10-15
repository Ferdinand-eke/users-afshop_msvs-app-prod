import FilterList from './FilterList';

/**
 * The DemoSidebar component.
 */
function DemoSidebar({ onFilterChange }) {
  return (
   <>
    <div className="flex flex-col gap-16 px-12 py-24 h-screen">

      <FilterList onFilterChange={onFilterChange} />

     
      
    </div>
   </>
  );
}

export default DemoSidebar;
