/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
  return (
    <div className="px-12 py-24 h-screen">
      <div className="mx-12 text-xl font-bold tracking-tighter">
        Inspection Tips
      </div>
      <div className="mx-12 mt-4 text-sm text-gray-600">
        <ul className="space-y-2">
          <li>• Arrive on time for your scheduled inspection</li>
          <li>• Bring a valid ID and any necessary documents</li>
          <li>• Take notes and photos during the inspection</li>
          <li>• Ask questions about the property condition</li>
          <li>• Check all utilities and appliances</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoSidebarRight;
