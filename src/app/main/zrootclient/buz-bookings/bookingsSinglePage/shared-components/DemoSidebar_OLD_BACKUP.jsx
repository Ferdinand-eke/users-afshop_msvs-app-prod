

/**
 * The DemoSidebar component.
 * OLD BACKUP - This is the original component before redesign
 */
function DemoSidebar() {
	return (
		<div className="px-12 py-24 h-screen">
		{/* min-h-6xl */}
		 <h2 className="font-bold mb-4 p-4">FEEDS</h2>
                <div className="space-y-2">

                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                	 No Feeds Yet
                  </label>
                </div>

		</div>
	);
}

export default DemoSidebar;
