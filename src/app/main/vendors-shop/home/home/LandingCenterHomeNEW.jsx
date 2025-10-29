import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { lighten, ThemeProvider } from "@mui/material/styles";
import { selectMainThemeDark } from "@fuse/core/FuseSettings/fuseSettingsSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/store/hooks";
import FaqList from "../faqs/FaqList";
import { useGetHelpCenterMostlyFaqsQuery } from "../HelpCenterApi";
import CategoryAndTradehub from "src/app/main/zrootclient/buz-marketplace/shops/components/CategoryAndTradehub";
import BookingsHub from "./bookingshub/BookingsHub";
import RestaurantAndSpotsHub from "./restaurantclubspotshub/RestaurantAndSpotsHub";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/**
 * REDESIGNED Landing Center Home
 * Professional, compelling, and modular design for AfricanShops platform
 * Features:
 * - Enhanced hero section with gradient background
 * - Jumia-style slider with categories (left), promotional slider (center), CTAs (right)
 * - Modular service sections for Hotels, Restaurants, Real Estate
 * - Comprehensive whitepaper/about section
 * - Future-ready structure for adding more services
 */
function LandingCenterHomeNew() {
  const mainThemeDark = useAppSelector(selectMainThemeDark);
  const { data: faqsMost } = useGetHelpCenterMostlyFaqsQuery();

  const stepsToUnboard = [
    {
      id: 1,
      hint: "Register, setup a shop and list your products",
      description: `* Register your business for free and create a product catalogue.
       Get free training on how to run your online business.
       * Our AfricanShop Advisors will help you at every step and fully assist you in taking your business online`,
    },
    {
      id: 2,
      hint: `Receive orders and sell your product`,
      description: `* Receive orders from intending buyers,
       package products ordered and make available at our order collation units within your market,
       then sit back and monitor the process as we handle delivery from here.`,
    },
    {
      id: 3,
      hint: `Package and ship with ease`,
      description: `* Sit back and monitor the process on your seller dashboard as we handle delivery from packaging,
       shipping and delivery.`,
    },
    {
      id: 4,
      hint: `Receive Payments and Withdraw.`,
      description: `* Receive Payments and on your shop dashboard and then cash out on delivered orders into your shop wallet.
      * Withdraw from your Shop wallet and receive payment into your local bank account within 1-2 working day(s)`,
    },
  ];

  return (
    <div className="flex flex-col flex-auto min-w-0 bg-gray-50">
      {/* ============================================
          ENHANCED HERO HEADER SECTION
          ============================================ */}
      <ThemeProvider theme={mainThemeDark}>
        <Box
          className="relative pt-32 pb-112 px-16 sm:pt-80 sm:pb-192 sm:px-64 overflow-hidden"
          sx={{
            background:
              "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDB827 100%)",
            color: "white",
          }}
        >
          <div className="flex flex-col items-center justify-center mx-auto w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <Typography
                color="inherit"
                className="text-8 md:text-20 text-center font-bold tracking-wide uppercase"
              >
                Africa's Premier Trade & Lifestyle Ecosystem
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Typography className="mt-8 text-32 sm:text-48 font-extrabold tracking-tight leading-tight text-center">
                Shop, Stay, Dine & Invest - All in One Place
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-8"
            >
              <Typography className="text-18 sm:text-20 text-center max-w-4xl opacity-95 leading-relaxed">
                Join thousands discovering authentic African products, premium
                accommodations, vibrant dining experiences, and investment
                opportunities
              </Typography>
            </motion.div>
          </div>

          {/* Decorative Background Elements */}
          <svg
            className="absolute inset-0 pointer-events-none opacity-10"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </g>
          </svg>
        </Box>
      </ThemeProvider>

      {/* ============================================
          MAIN PROMOTIONAL SLIDER SECTION
          Jumia-style: Left (Categories) | Center (Slider/Ads) | Right (CTAs)
          ============================================ */}
      <div className="flex flex-col items-center px-8 md:px-16 lg:px-24 mb-32">
        <div className="w-full max-w-7xl -mt-80 sm:-mt-140 z-999">
          <motion.div
            className="flex flex-col container mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Main Slider Grid: 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
              {/* LEFT: Categories Sidebar */}
              <motion.div
                className="hidden md:block md:col-span-3 bg-white p-6 rounded-2xl shadow-2xl overflow-auto max-h-[400px] border-2 border-orange-200 hover:border-orange-400 transition-all duration-300"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <CategoryAndTradehub />
              </motion.div>

              {/* CENTER: Promotional Slider (For Paid Ads or Default Content) */}
              <motion.div
                className="md:col-span-6 h-[350px] md:h-[400px]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <div className="bg-white rounded-2xl shadow-2xl h-full overflow-hidden border-2 border-orange-200">
                  <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={6000}
                    showIndicators={true}
                    showStatus={false}
                    showThumbs={false}
                    transitionTime={900}
                    swipeable={true}
                    emulateTouch={true}
                  >
                    {/* Slide 1: Shopping Deals */}
                    <div className="relative h-[350px] md:h-[400px]">
                      <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=85"
                        alt="Shopping Deals"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                        <Typography
                          variant="h3"
                          className="text-white font-extrabold mb-3"
                        >
                          Exclusive Shopping Deals
                        </Typography>
                        <Typography className="text-white/95 text-lg mb-4">
                          Up to 50% OFF on selected items
                        </Typography>
                        <Button
                          component={Link}
                          to="/marketplace"
                          variant="contained"
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-fit px-8 py-3 rounded-full"
                        >
                          Shop Now
                        </Button>
                      </div>
                    </div>

                    {/* Slide 2: Hotels & Apartments */}
                    <div className="relative h-[350px] md:h-[400px]">
                      <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85"
                        alt="Premium Hotels"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                        <Typography
                          variant="h3"
                          className="text-white font-extrabold mb-3"
                        >
                          Luxury Accommodations
                        </Typography>
                        <Typography className="text-white/95 text-lg mb-4">
                          Book your perfect stay across Africa
                        </Typography>
                        <Button
                          component={Link}
                          to="/bookings/listings"
                          variant="contained"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-fit px-8 py-3 rounded-full"
                        >
                          Explore Hotels
                        </Button>
                      </div>
                    </div>

                    {/* Slide 3: Restaurants & Dining */}
                    <div className="relative h-[350px] md:h-[400px]">
                      <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85"
                        alt="Fine Dining"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                        <Typography
                          variant="h3"
                          className="text-white font-extrabold mb-3"
                        >
                          Explore Dining Experiences
                        </Typography>
                        <Typography className="text-white/95 text-lg mb-4">
                          Discover top restaurants, clubs & spots
                        </Typography>
                        <Button
                          component={Link}
                          to="/foodmarts/listings"
                          variant="contained"
                          className="bg-green-500 hover:bg-green-600 text-white font-bold w-fit px-8 py-3 rounded-full"
                        >
                          Find Restaurants
                        </Button>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </motion.div>

              {/* RIGHT: Quick Action CTAs */}
              <motion.div
                className="flex flex-col md:col-span-3 space-y-4"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <div className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 space-y-4 shadow-lg">
                  {/* Call to Order */}
                  <Link to="/contact" className="block">
                    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-l-4 border-orange-500">
                      <div className="flex items-center">
                        <i className="fas fa-phone-alt text-orange-600 text-2xl mr-4"></i>
                        <div className="flex-1">
                          <Typography className="font-bold text-gray-800 text-sm">
                            CALL TO ORDER
                          </Typography>
                          <Typography className="text-orange-600 font-bold text-lg mt-1">
                            07003-7200-297
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Become a Merchant */}
                  <Link to="/merchant/register" className="block">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <div className="flex items-center justify-center text-white">
                        <i className="fas fa-store text-2xl mr-3"></i>
                        <Typography className="font-bold text-center text-sm">
                          Become a Merchant
                        </Typography>
                      </div>
                    </div>
                  </Link>

                  {/* Best Deals */}
                  <Link to="/deals" className="block">
                    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-l-4 border-green-500">
                      <div className="flex items-center">
                        <i className="fas fa-tags text-green-600 text-2xl mr-4"></i>
                        <Typography className="font-bold text-gray-800 flex-1">
                          Best Deals
                        </Typography>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Join Workforce */}
                <Link to="/careers" className="block">
                  <div className="hidden md:block bg-gradient-to-br from-orange-600 to-orange-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className="flex flex-col justify-center items-center h-full">
                      <i className="fas fa-star text-yellow-300 text-3xl mb-3"></i>
                      <Typography className="font-bold text-center mb-2">
                        JOIN OUR WORKFORCE
                      </Typography>
                      <Typography className="text-center font-extrabold text-xl">
                        APPLY NOW
                      </Typography>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Featured Categories Grid Below Slider */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-center mb-12">
                <Typography
                  variant="h3"
                  className="font-extrabold text-gray-800 mb-3"
                >
                  Browse by Category
                </Typography>
                <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {[
                  {
                    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&auto=format&fit=crop&q=80",
                    name: "Electronics",
                    link: "/marketplace/category/electronics",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
                    name: "Fashion",
                    link: "/marketplace/category/fashion",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop&q=80",
                    name: "Home & Living",
                    link: "/marketplace/category/home",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80",
                    name: "Phones & Tablets",
                    link: "/marketplace/category/phones",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&auto=format&fit=crop&q=80",
                    name: "Appliances",
                    link: "/marketplace/category/appliances",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&auto=format&fit=crop&q=80",
                    name: "Health & Beauty",
                    link: "/marketplace/category/health",
                  },
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    component={Link}
                    to={category.link}
                    className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                  >
                    <img
                      src={category.img}
                      alt={category.name}
                      className="rounded-xl h-[140px] w-full object-cover mb-3"
                    />
                    <Typography className="text-center font-semibold text-gray-800 text-sm">
                      {category.name}
                    </Typography>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================
          HOTELS & APARTMENTS SECTION
          ============================================ */}
      <motion.div
        className="flex flex-col w-full items-center my-32 bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-7xl px-8 md:px-16 lg:px-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center mb-5">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-hotel text-white text-3xl"></i>
                </div>
                <Typography
                  variant="h3"
                  className="font-extrabold text-gray-800"
                >
                  Hotels & Apartments
                </Typography>
              </div>
              <Typography
                variant="body1"
                className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Discover premium accommodations across Africa. From luxury
                hotels to cozy apartments, find your perfect home away from
                home.
              </Typography>
              <div className="mt-6 w-32 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>
          <BookingsHub />
        </div>
      </motion.div>

      {/* ============================================
          RESTAURANTS, CLUBS & SPOTS SECTION
          ============================================ */}
      <motion.div
        className="flex flex-col w-full items-center my-32 bg-gradient-to-b from-orange-50 via-white to-orange-50 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-7xl px-8 md:px-16 lg:px-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center mb-5">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-utensils text-white text-3xl"></i>
                </div>
                <Typography
                  variant="h3"
                  className="font-extrabold text-gray-800"
                >
                  Restaurants, Clubs & Spots
                </Typography>
              </div>
              <Typography
                variant="body1"
                className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Experience Africa's vibrant culinary scene and nightlife. Explore
                top-rated restaurants, trending clubs, and must-visit local spots.
              </Typography>
              <div className="mt-6 w-32 h-1 bg-orange-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>
          <RestaurantAndSpotsHub />
        </div>
      </motion.div>

      {/* ============================================
          REAL ESTATE SECTION (Placeholder for Future Development)
          ============================================ */}
      <motion.div
        className="flex flex-col w-full items-center my-32 bg-gradient-to-b from-green-50 via-white to-green-50 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-7xl px-8 md:px-16 lg:px-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center mb-5">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-building text-white text-3xl"></i>
                </div>
                <Typography
                  variant="h3"
                  className="font-extrabold text-gray-800"
                >
                  Real Estate & Investments
                </Typography>
              </div>
              <Typography
                variant="body1"
                className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Coming Soon! Invest in premium African properties. Residential,
                commercial, and land opportunities across the continent.
              </Typography>
              <div className="mt-6 w-32 h-1 bg-green-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          {/* Placeholder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: "fa-home",
                title: "Residential",
                desc: "Find your dream home across Africa",
              },
              {
                icon: "fa-briefcase",
                title: "Commercial",
                desc: "Business properties & office spaces",
              },
              {
                icon: "fa-map-marked-alt",
                title: "Land",
                desc: "Prime land for development",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-lg text-center border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <i
                  className={`fas ${item.icon} text-6xl text-green-600 mb-6`}
                ></i>
                <Typography
                  variant="h5"
                  className="font-bold text-gray-800 mb-3"
                >
                  {item.title}
                </Typography>
                <Typography className="text-gray-600 leading-relaxed">
                  {item.desc}
                </Typography>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              variant="outlined"
              size="large"
              disabled
              className="border-2 border-green-600 text-green-600 px-16 py-4 text-lg font-bold rounded-full"
            >
              <i className="fas fa-clock mr-2"></i>
              Launching Soon
            </Button>
          </div>
        </div>
      </motion.div>

      {/* ============================================
          WHITEPAPER & PROJECT DOCUMENTATION SECTION
          Comprehensive information for partners & investors
          ============================================ */}
      <motion.div
        className="flex flex-col w-full items-center my-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9 }}
      >
        <div className="w-full max-w-7xl px-8 md:px-16 lg:px-24">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center mb-6">
                <i className="fas fa-file-contract text-orange-400 text-5xl mr-4"></i>
                <Typography variant="h3" className="font-extrabold">
                  About AfricanShops Ecosystem
                </Typography>
              </div>
              <Typography
                variant="body1"
                className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed"
              >
                Discover our vision, mission, and roadmap for transforming
                Africa's digital commerce landscape. Join us in building the
                future of African trade.
              </Typography>
              <div className="mt-6 w-32 h-1 bg-orange-400 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-2xl shadow-2xl border-2 border-orange-400/40 hover:border-orange-400 transition-all duration-300"
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <i className="fas fa-eye text-orange-400 text-5xl mb-6"></i>
              <Typography variant="h4" className="font-bold mb-5">
                Our Vision
              </Typography>
              <Typography className="text-gray-300 leading-relaxed text-lg">
                To become Africa's leading integrated digital ecosystem,
                connecting buyers, sellers, travelers, and investors across the
                continent. We envision a platform where African commerce thrives,
                local businesses flourish, and opportunities are accessible to
                all.
              </Typography>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-2xl shadow-2xl border-2 border-orange-400/40 hover:border-orange-400 transition-all duration-300"
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <i className="fas fa-bullseye text-orange-400 text-5xl mb-6"></i>
              <Typography variant="h4" className="font-bold mb-5">
                Our Mission
              </Typography>
              <Typography className="text-gray-300 leading-relaxed text-lg">
                To empower African entrepreneurs and businesses with cutting-edge
                digital tools, providing seamless access to markets,
                accommodation booking systems, dining experiences, and investment
                opportunities. We're committed to fostering economic growth and
                digital inclusion.
              </Typography>
            </motion.div>
          </div>

          {/* How It Works Section */}
          <motion.div
            className="bg-gradient-to-br from-orange-600 to-orange-700 p-12 rounded-3xl shadow-2xl mb-20"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h4"
              className="font-extrabold text-center mb-16 text-white"
            >
              <i className="fas fa-cogs mr-3"></i>
              How AfricanShops Works
            </Typography>
            <FaqList className="w-full" list={stepsToUnboard} />
          </motion.div>

          {/* Future Roadmap */}
          <motion.div
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-12 rounded-3xl shadow-2xl border-2 border-orange-400/40 mb-16"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h4"
              className="font-extrabold text-center mb-12 text-white"
            >
              <i className="fas fa-road mr-3"></i>
              Future Services & Roadmap
            </Typography>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "fa-heartbeat",
                  title: "Health Services",
                  desc: "Telemedicine & health marketplace",
                },
                {
                  icon: "fa-wallet",
                  title: "Digital Wallet",
                  desc: "Secure payments & transactions",
                },
                {
                  icon: "fa-graduation-cap",
                  title: "Education Hub",
                  desc: "Online courses & skill development",
                },
                {
                  icon: "fa-truck",
                  title: "Logistics Network",
                  desc: "Pan-African delivery services",
                },
                {
                  icon: "fa-handshake",
                  title: "B2B Platform",
                  desc: "Wholesale & bulk trading",
                },
                {
                  icon: "fa-chart-line",
                  title: "Analytics Suite",
                  desc: "Business intelligence tools",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 p-8 rounded-xl text-center border-2 border-orange-400/20 hover:border-orange-400 transition-all duration-300 hover:shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <i
                    className={`fas ${service.icon} text-orange-400 text-4xl mb-4`}
                  ></i>
                  <Typography variant="h6" className="font-bold mb-3">
                    {service.title}
                  </Typography>
                  <Typography className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </Typography>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partnership CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <Typography variant="h4" className="font-bold mb-6">
              <i className="fas fa-users mr-3 text-orange-400"></i>
              Interested in Partnering or Investing?
            </Typography>
            <Typography className="text-gray-300 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
              Join us in revolutionizing African commerce. We're seeking
              strategic partners and investors who share our vision of digital
              transformation.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                component={Link}
                to="/partnership"
                variant="contained"
                size="large"
                className="bg-orange-500 hover:bg-orange-600 text-white px-14 py-4 text-lg font-bold rounded-full shadow-lg transform transition hover:scale-105"
              >
                <i className="fas fa-handshake mr-2"></i>
                Partner With Us
              </Button>
              <Button
                component={Link}
                to="/whitepaper"
                variant="outlined"
                size="large"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-14 py-4 text-lg font-bold rounded-full transition"
              >
                <i className="fas fa-download mr-2"></i>
                Download Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingCenterHomeNew;
