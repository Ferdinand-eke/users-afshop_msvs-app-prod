import MerchantProfile from './MerchantProfile';
import PropertyLocationMap from './PropertyLocationMap';

/**
 * The DemoSidebar component.
 * 60% Merchant Profile, 40% Property Location Map
 */
function DemoSidebar({ merchantData, coordinates, propertyName, propertyAddress }) {
	
	return (
		<div
			className="flex flex-col h-screen p-6"
			style={{
				background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
			}}
		>
			{/* Merchant Profile Section - 60% */}
			<div className="flex-[6] overflow-y-auto mb-4">
				<MerchantProfile merchantData={merchantData} />
			</div>

			{/* Property Location Map Section - 40% */}
			<div className="flex-[4] min-h-0">
				<PropertyLocationMap
					coordinates={coordinates}
					propertyName={propertyName}
					propertyAddress={propertyAddress}
				/>
			</div>
		</div>
	);
}

export default DemoSidebar;

/*
 * OLD COMPONENT BACKUP (before redesign)
 * Located at: DemoSidebar_OLD_BACKUP.jsx
 */
