import { Typography, Card, CardContent, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HandshakeIcon from "@mui/icons-material/Handshake";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";

/**
 * About Us Page - Professional layout with scrollable whitepaper
 */
function AboutUs() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div
        className="relative min-h-[60vh] flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-8 md:px-16 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Chip
              label="Our Story"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                padding: "8px 16px",
                marginBottom: "24px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
              size="large"
            />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "3rem", md: "5rem" },
                fontWeight: 900,
                marginBottom: "24px",
                color: "white",
              }}
            >
              About Africanshops
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "rgba(255, 255, 255, 0.95)",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Building Africa's Digital Future - Empowering businesses and consumers across the continent
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section - Split Layout */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Scrollable Whitepaper */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="sticky top-24"
            >
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  background: "linear-gradient(to bottom, #fff, #fef3c7)",
                  maxHeight: "700px",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ padding: "40px" }}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-file-alt text-white text-2xl"></i>
                    </div>
                    <Typography variant="h4" className="font-black text-gray-900">
                      Whitepaper
                    </Typography>
                  </div>

                  <div
                    className="overflow-y-auto pr-4"
                    style={{ maxHeight: "550px", scrollbarWidth: "thin" }}
                  >
                    <Typography variant="h5" className="font-bold text-orange-600 mb-4">
                      About Africanshops.org
                    </Typography>
                    <Typography className="text-gray-700 text-lg mb-6 leading-relaxed">
                      Africanshops.org is a vibrant online marketplace dedicated to showcasing and
                      celebrating the beauty and diversity of African businesses and products. Our
                      platform provides a convenient and accessible space for customers worldwide to
                      discover and purchase a wide range of authentic African goods and services.
                    </Typography>

                    <Typography variant="h5" className="font-bold text-orange-600 mb-4 mt-8">
                      Our Mission
                    </Typography>
                    <Typography className="text-gray-700 text-lg mb-6 leading-relaxed">
                      We believe in empowering African artisans, manufacturers and businesses by
                      connecting them with global audiences and fostering economic growth for SMEs.
                      Our mission is to provide world-class digital infrastructure that enables
                      African businesses to reach global markets, while helping consumers access
                      quality products, services, and experiences across the continent.
                    </Typography>

                    <Typography variant="h5" className="font-bold text-orange-600 mb-4 mt-8">
                      Core Services
                    </Typography>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                        <Typography className="font-bold text-xl text-gray-900 mb-2">
                          <ShoppingCartIcon className="mr-2 text-orange-600" />
                          Marketplace Web App
                        </Typography>
                        <Typography className="text-gray-700 leading-relaxed">
                          Explore African markets from countries, to states, down to counties and
                          local government areas. Source products of your choice and become a
                          merchant on our platform with flexible commission-based charges.
                        </Typography>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                        <Typography className="font-bold text-xl text-gray-900 mb-2">
                          <HotelIcon className="mr-2 text-blue-600" />
                          Bookings Web App
                        </Typography>
                        <Typography className="text-gray-700 leading-relaxed">
                          List and manage your hotels, apartments and allow us to broadcast them as
                          you sit back and watch your reservations and earnings grow across Africa.
                        </Typography>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                        <Typography className="font-bold text-xl text-gray-900 mb-2">
                          <ApartmentIcon className="mr-2 text-purple-600" />
                          Real Estate Web App
                        </Typography>
                        <Typography className="text-gray-700 leading-relaxed">
                          List your properties for lease and sale, lands/plots, emerging estates and
                          receive offers from potential buyers anywhere in the world.
                        </Typography>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                        <Typography className="font-bold text-xl text-gray-900 mb-2">
                          <RestaurantIcon className="mr-2 text-green-600" />
                          Restaurants, Clubs & Spots
                        </Typography>
                        <Typography className="text-gray-700 leading-relaxed">
                          Find a spot, club or restaurant to visit with friends when you are new in
                          town or need a local guide to have a good time.
                        </Typography>
                      </div>
                    </div>

                    <Typography variant="h5" className="font-bold text-orange-600 mb-4 mt-8">
                      The Team
                    </Typography>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg">
                        <Typography className="font-bold text-lg text-gray-900">
                          Eke Ferdinand U.
                        </Typography>
                        <Typography className="text-orange-600 font-semibold">
                          CEO, CTO / Co-Founder
                        </Typography>
                      </div>
                      <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg">
                        <Typography className="font-bold text-lg text-gray-900">
                          Ronald Emeruwa
                        </Typography>
                        <Typography className="text-orange-600 font-semibold">
                          COO / Co-Founder
                        </Typography>
                      </div>
                      <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg">
                        <Typography className="font-bold text-lg text-gray-900">
                          Virtue Egerega
                        </Typography>
                        <Typography className="text-orange-600 font-semibold">
                          STO
                        </Typography>
                      </div>
                      <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg">
                        <Typography className="font-bold text-lg text-gray-900">
                          Eke Immaculata E.
                        </Typography>
                        <Typography className="text-orange-600 font-semibold">
                          HR
                        </Typography>
                      </div>
                    </div>

                    <div
                      className="mt-8 p-6 rounded-xl text-white"
                      style={{
                        background: 'linear-gradient(90deg, #f97316 0%, #dc2626 100%)',
                      }}
                    >
                      <Typography className="font-bold text-xl mb-2">
                        Join Our Community
                      </Typography>
                      <Typography className="mb-4">
                        Millions of shoppers can't wait to see what you have in store. Become a part
                        of our community as we drive Africa's trade hub.
                      </Typography>
                     
                     <Typography className="text-lg font-bold">
                        <EmailIcon className="mr-2" />
                        africanshops@africanshops.org
                      </Typography>
                      <Typography className="text-lg font-bold">
                        <EmailIcon className="mr-2" />
                        info@africanshops.org
                      </Typography>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right: Compelling Images and Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Hero Image */}
              <motion.div variants={fadeInUp}>
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=85"
                  alt="African Business"
                  className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>

              {/* Vision & Mission Cards */}
              <motion.div variants={fadeInUp}>
                <Card
                  sx={{
                    background: "linear-gradient(to bottom right, #ea580c, #dc2626)",
                    borderRadius: "24px",
                    color: "white",
                  }}
                >
                  <CardContent sx={{ padding: "40px" }}>
                    <VisibilityIcon sx={{ fontSize: "3.5rem", marginBottom: "16px" }} />
                    <Typography variant="h4" className="font-black mb-4">
                      Our Vision
                    </Typography>
                    <Typography className="text-lg leading-relaxed opacity-95">
                      To become Africa's leading integrated digital ecosystem, empowering millions
                      of businesses and consumers to thrive in the digital economy. We envision a
                      connected continent where commerce knows no boundaries.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card
                  sx={{
                    background: "linear-gradient(to bottom right, #2563eb, #9333ea)",
                    borderRadius: "24px",
                    color: "white",
                  }}
                >
                  <CardContent sx={{ padding: "40px" }}>
                    <GpsFixedIcon sx={{ fontSize: "3.5rem", marginBottom: "16px" }} />
                    <Typography variant="h4" className="font-black mb-4">
                      Our Mission
                    </Typography>
                    <Typography className="text-lg leading-relaxed opacity-95">
                      To provide world-class digital infrastructure that enables African businesses
                      to reach global markets, while helping consumers access quality products,
                      services, and experiences across the continent.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Coming Soon Services */}
              <motion.div variants={fadeInUp}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    background: "linear-gradient(to bottom, #1f2937, #111827)",
                    color: "white",
                  }}
                >
                  <CardContent sx={{ padding: "32px" }}>
                    <div className="flex items-center mb-6">
                      <RocketLaunchIcon
                        sx={{ fontSize: "2.5rem", color: "#f97316", marginRight: "12px" }}
                      />
                      <Typography variant="h5" className="font-black">
                        Coming Soon
                      </Typography>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { IconComponent: FavoriteIcon, label: "Healthcare" },
                        { IconComponent: AccountBalanceWalletIcon, label: "Digital Wallet" },
                        { IconComponent: SchoolIcon, label: "Education" },
                        { IconComponent: LocalShippingIcon, label: "Logistics" },
                        { IconComponent: HandshakeIcon, label: "B2B Trading" },
                        { IconComponent: TrendingUpIcon, label: "Analytics" },
                      ].map((service, i) => (
                        <div
                          key={i}
                          className="bg-gray-800 p-4 rounded-xl text-center border border-orange-500/20 hover:border-orange-500 transition-all"
                        >
                          <service.IconComponent
                            sx={{ fontSize: "2rem", color: "#f97316", marginBottom: "8px" }}
                          />
                          <Typography className="font-semibold text-sm">
                            {service.label}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Another Image */}
              <motion.div variants={fadeInUp}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=85"
                  alt="Team Collaboration"
                  className="w-full h-[350px] object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="py-20"
        style={{
          background: 'linear-gradient(90deg, #111827 0%, #1f2937 50%, #000000 100%)',
        }}
      >
        <div className="container mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Typography variant="h3" className="font-black text-white mb-6">
              Ready to Partner With Us?
            </Typography>
            <Typography className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Investors and partners are invited to join our journey in building Africa's digital
              future
            </Typography>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                startIcon={<HandshakeIcon />}
                sx={{
                  backgroundColor: "#f97316",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  padding: "16px 40px",
                  borderRadius: "9999px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#ea580c",
                  },
                }}
              >
                Contact Us
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<DownloadIcon />}
                sx={{
                  borderColor: "white",
                  borderWidth: "2px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  padding: "16px 40px",
                  borderRadius: "9999px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "white",
                    borderWidth: "2px",
                  },
                }}
              >
                Download Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
