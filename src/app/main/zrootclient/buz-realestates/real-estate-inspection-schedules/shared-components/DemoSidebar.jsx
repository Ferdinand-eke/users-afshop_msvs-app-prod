import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

/**
 * The DemoSidebar component - Real Estate Navigation.
 */
function DemoSidebar() {
  const location = useLocation();

  const realEstateMenuItems = [
    {
      id: 1,
      title: "Browse Properties",
      description: "Explore available properties",
      icon: "fa-building",
      path: "/realestate/listings",
      color: "orange",
    },
    {
      id: 2,
      title: "Inspection Schedules",
      description: "View & manage inspections",
      icon: "fa-calendar-check",
      path: "/realestate/my-inspection-schedules",
      color: "blue",
    },
    {
      id: 3,
      title: "My Offers",
      description: "Track submitted offers",
      icon: "fa-tag",
      path: "/realestate/my-offers",
      color: "green",
    },
    {
      id: 4,
      title: "Saved Properties",
      description: "Your favorite listings",
      icon: "fa-heart",
      path: "/realestate/saved-properties",
      color: "red",
    },
    {
      id: 5,
      title: "Property Alerts",
      description: "Manage notifications",
      icon: "fa-bell",
      path: "/realestate/alerts",
      color: "purple",
    },
    {
      id: 6,
      title: "Transactions",
      description: "View purchase history",
      icon: "fa-receipt",
      path: "/realestate/transactions",
      color: "indigo",
    },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getIconColor = (color) => {
    const colors = {
      orange: "text-orange-500",
      blue: "text-blue-500",
      green: "text-green-500",
      red: "text-red-500",
      purple: "text-purple-500",
      indigo: "text-indigo-500",
    };
    return colors[color] || "text-gray-500";
  };

  const getActiveColor = (color) => {
    const colors = {
      orange: "border-orange-500 bg-orange-50",
      blue: "border-blue-500 bg-blue-50",
      green: "border-green-500 bg-green-50",
      red: "border-red-500 bg-red-50",
      purple: "border-purple-500 bg-purple-50",
      indigo: "border-indigo-500 bg-indigo-50",
    };
    return colors[color] || "border-gray-500 bg-gray-50";
  };

  return (
    <div className="px-6 py-8 h-screen overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <Typography variant="h6" className="font-bold text-gray-800 mb-2">
          <i className="fas fa-home text-orange-500 mr-2"></i>
          Real Estate Hub
        </Typography>
        <Typography variant="caption" className="text-gray-600">
          Manage your property journey
        </Typography>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-3">
        {realEstateMenuItems.map((item) => {
          const isActive = isActivePath(item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`block p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${
                isActive
                  ? getActiveColor(item.color) + " shadow-sm"
                  : "border-transparent bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive ? "bg-white shadow-sm" : "bg-gray-100"
                  }`}
                >
                  <i className={`fas ${item.icon} ${getIconColor(item.color)} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="body2"
                    className={`font-semibold mb-0.5 ${
                      isActive ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={isActive ? "text-gray-700" : "text-gray-500"}
                  >
                    {item.description}
                  </Typography>
                </div>
                {isActive && (
                  <div className="flex-shrink-0">
                    <i className={`fas fa-chevron-right ${getIconColor(item.color)} text-sm`}></i>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Typography variant="caption" className="text-gray-600 font-semibold mb-3 block">
          QUICK ACTIONS
        </Typography>
        <div className="space-y-2">
          <Link
            to="/realestate"
            className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
          >
            <i className="fas fa-search text-xs"></i>
            <span>Search Properties</span>
          </Link>
          <Link
            to="/realestate/contact-agent"
            className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
          >
            <i className="fas fa-user-tie text-xs"></i>
            <span>Contact Agent</span>
          </Link>
          <Link
            to="/realestate/calculator"
            className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
          >
            <i className="fas fa-calculator text-xs"></i>
            <span>Mortgage Calculator</span>
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <i className="fas fa-question-circle text-orange-600 text-xl"></i>
          </div>
          <div>
            <Typography variant="caption" className="font-semibold text-orange-900 block mb-1">
              Need Help?
            </Typography>
            <Typography variant="caption" className="text-orange-800 text-xs">
              Our support team is here to assist you with any questions.
            </Typography>
            <button className="mt-2 text-xs font-semibold text-orange-600 hover:text-orange-700 underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoSidebar;
