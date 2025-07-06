import FuseNavigation from "@fuse/core/FuseNavigation";
// import CategoryAndTradehub from '../../components/CategoryAndTradehub';
// import CategoryAndTradehub from '../../buz-marketplace/shops/components/CategoryAndTradehub';
/**
 * Navigation data
 */
const navigationData = [
  {
    id: "1",
    title: "Actions",
    subtitle: "Task, project & team",
    type: "group",
    children: [
      {
        id: "1.1",
        title: "Create task",
        type: "item",
        icon: "heroicons-outline:plus-circle",
      },
      {
        id: "1.2",
        title: "Create team",
        type: "item",
        icon: "heroicons-outline:user-group",
      },
      {
        id: "1.3",
        title: "Create project",
        type: "item",
        icon: "heroicons-outline:briefcase",
      },
      {
        id: "1.4",
        title: "Create user",
        type: "item",
        icon: "heroicons-outline:user-add",
      },
      {
        id: "1.5",
        title: "Assign user or team",
        subtitle: "Assign to a task or a project",
        type: "item",
        icon: "heroicons-outline:badge-check",
      },
    ],
  },
  {
    id: "2",
    title: "Tasks",
    type: "group",
    children: [
      {
        id: "2.1",
        title: "All tasks",
        type: "item",
        icon: "heroicons-outline:clipboard-list",
        badge: {
          title: "49",
          classes: "px-2 bg-primary text-on-primary rounded-full",
        },
      },
      {
        id: "2.2",
        title: "Ongoing tasks",
        type: "item",
        icon: "heroicons-outline:clipboard-copy",
      },
      {
        id: "2.3",
        title: "Completed tasks",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
      },
      {
        id: "2.4",
        title: "Abandoned tasks",
        type: "item",
        icon: "heroicons-outline:clipboard",
      },
      {
        id: "2.5",
        title: "Assigned to me",
        type: "item",
        icon: "heroicons-outline:user",
      },
      {
        id: "2.6",
        title: "Assigned to my team",
        type: "item",
        icon: "heroicons-outline:users",
      },
    ],
  },
  {
    id: "3",
    title: "Settings",
    type: "group",
    children: [
      {
        id: "3.1",
        title: "General",
        type: "collapse",
        icon: "heroicons-outline:cog",
        children: [
          {
            id: "3.1.1",
            title: "Tasks",
            type: "item",
          },
          {
            id: "3.1.2",
            title: "Users",
            type: "item",
          },
          {
            id: "3.1.3",
            title: "Teams",
            type: "item",
          },
        ],
      },
      {
        id: "3.2",
        title: "Account",
        type: "collapse",
        icon: "heroicons-outline:user-circle",
        children: [
          {
            id: "3.2.1",
            title: "Personal",
            type: "item",
          },
          {
            id: "3.2.2",
            title: "Payment",
            type: "item",
          },
          {
            id: "3.2.3",
            title: "Security",
            type: "item",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    type: "divider",
  },
];

/**
 * The DemoSidebar component.
 */
function DemoSidebar(props) {
  const { martMenu } = props;

  return (
    // <div className="px-12 py-24 min-h-6xl">
	<div className="px-12 py-24 h-screen">
      <div className="w-full md:w-full bg-white p-4">
        <div className="flex flex-col items-center">
          <img
            src={martMenu?.imageSrc}
            alt="Store logo"
            className="rounded-full mb-4 h-[100px]"
          />
          <div className="text-center">
            <p className="text-gray-500">Since 2023</p>
            <h2 className="text-xl font-bold">{martMenu?.title}</h2>
            {/* <p className="text-gray-500">
              {martMenu?.menu?.length} items in menu
            </p> */}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <i className="fas fa-ticket-alt text-xl"></i>
            <span className="ml-2">Coupons</span>
          </button>
          <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <i className="fas fa-address-book text-xl"></i>
            <span className="ml-2">Contact</span>
          </button>
          <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <i className="fas fa-globe text-xl"></i>
            <span className="ml-2">Website</span>
          </button>
          <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <i className="fas fa-file-alt text-xl"></i>
            <span className="ml-2">Terms</span>
          </button>
          <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <i className="fas fa-question-circle text-xl"></i>
            <span className="ml-2">FAQs</span>
          </button>
        </div>
        <div className="mt-6">
          <h3 className="font-bold">Address</h3>
          <p className="text-gray-500">
            {martMenu?.address}
          </p>
        </div>
        <div className="mt-4">
          {martMenu?.phone && <h3 className="font-bold">{martMenu?.phone}</h3>}
          
        </div>
      </div>
    </div>
  );
}

export default DemoSidebar;
