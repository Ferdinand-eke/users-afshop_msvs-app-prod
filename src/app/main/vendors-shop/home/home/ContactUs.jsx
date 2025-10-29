import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

/**
 * Contact Us Page - Professional layout with map integration
 */
function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div
        className="relative min-h-[50vh] flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-8 md:px-16 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Chip
              label="Let's Connect"
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
                marginBottom: "16px",
                color: "white",
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "rgba(255, 255, 255, 0.95)",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Our communications lines are open. We'd be glad to partner and share ideas with you.
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Contact Information & Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <motion.div variants={fadeInUp}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.4)",
                  }}
                >
                  <CardContent sx={{ padding: "32px" }}>
                    <Typography variant="h5" className="font-black text-white mb-6">
                      Get In Touch
                    </Typography>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <PhoneIcon sx={{ color: "white", fontSize: "1.5rem" }} />
                        </div>
                        <div>
                          <Typography className="text-white/80 text-sm font-semibold mb-1">
                            Call Us
                          </Typography>
                          <Typography className="text-white text-xl font-bold">
                            +234-803-5868-983
                          </Typography>
                          <Typography className="text-white text-lg font-bold">
                            +234-708-7200-297
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <EmailIcon sx={{ color: "white", fontSize: "1.5rem" }} />
                        </div>
                        <div>
                          <Typography className="text-white/80 text-sm font-semibold mb-1">
                            Email Us
                          </Typography>
                          <Typography className="text-white text-lg font-bold">
                            africanshops@africanshops.org
                           
                          </Typography>
                          <Typography className="text-white text-lg">
                             info@africanshops.org
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <LocationOnIcon sx={{ color: "white", fontSize: "1.5rem" }} />
                        </div>
                        <div>
                          <Typography className="text-white/80 text-sm font-semibold mb-1">
                            Office Address
                          </Typography>
                          <Typography className="text-white text-lg">
                            Abuja, Nigeria
                          </Typography>
                          <Typography className="text-white text-sm mt-2">
                            Serving customers across Africa
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <LanguageIcon sx={{ color: "white", fontSize: "1.5rem" }} />
                        </div>
                        <div>
                          <Typography className="text-white/80 text-sm font-semibold mb-1">
                            Website
                          </Typography>
                          <Typography className="text-white text-lg font-bold">
                            www.africanshops.org
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Business Hours */}
              <motion.div variants={fadeInUp}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    boxShadow: "0 10px 40px -12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <CardContent sx={{ padding: "32px" }}>
                    <div className="flex items-center mb-6">
                      <AccessTimeIcon
                        sx={{ fontSize: "2rem", color: "#f97316", marginRight: "12px" }}
                      />
                      <Typography variant="h6" className="font-bold text-gray-900">
                        Business Hours
                      </Typography>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <Typography className="text-gray-700 font-semibold">
                          Monday - Friday
                        </Typography>
                        <Typography className="text-orange-600 font-bold">
                          8:00 AM - 6:00 PM
                        </Typography>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <Typography className="text-gray-700 font-semibold">Saturday</Typography>
                        <Typography className="text-orange-600 font-bold">
                          9:00 AM - 4:00 PM
                        </Typography>
                      </div>
                      <div className="flex justify-between items-center">
                        <Typography className="text-gray-700 font-semibold">Sunday</Typography>
                        <Typography className="text-gray-400 font-bold">Closed</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map */}
              <motion.div variants={fadeInUp}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 10px 40px -12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div className="relative h-[400px] bg-gray-200">
                    {/* Embedded Google Map - Lagos, Nigeria coordinates */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62283296106!2d3.119184996093754!3d6.548055000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Africanshops Office Location"
                    ></iframe>
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
                      <div className="flex items-center space-x-2">
                        <LocationOnIcon sx={{ color: "#f97316" }} />
                        <Typography className="font-bold text-gray-900">
                          Abuja, Nigeria
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <CardContent sx={{ padding: "40px" }}>
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                      <SendIcon sx={{ color: "white", fontSize: "1.75rem" }} />
                    </div>
                    <div>
                      <Typography variant="h4" className="font-black text-gray-900">
                        Send us a Message
                      </Typography>
                      <Typography className="text-gray-600">
                        We'll get back to you within 24 hours
                      </Typography>
                    </div>
                  </div>

                  {submitStatus === "success" && (
                    <Alert severity="success" className="mb-6">
                      <Typography className="font-semibold">
                        Message sent successfully! We'll be in touch soon.
                      </Typography>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#f97316",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#f97316",
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#f97316",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#f97316",
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#f97316",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#f97316",
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#f97316",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#f97316",
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#f97316",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#f97316",
                          },
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                      startIcon={
                        isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />
                      }
                      sx={{
                        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.125rem",
                        padding: "16px",
                        borderRadius: "12px",
                        textTransform: "none",
                        boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.5)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                          boxShadow: "0 15px 40px -10px rgba(249, 115, 22, 0.6)",
                        },
                        "&:disabled": {
                          background: "#9ca3af",
                        },
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Typography className="text-center text-gray-600 mb-4">
                      Or reach out directly at
                    </Typography>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Chip
                        icon={<PhoneIcon />}
                        label="+234-708-7200-297"
                        sx={{
                          backgroundColor: "#fef3c7",
                          color: "#92400e",
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                          padding: "8px 4px",
                        }}
                      />
                      <Chip
                        icon={<EmailIcon />}
                        label="africanshops@africanshops.org"
                        sx={{
                          backgroundColor: "#fef3c7",
                          color: "#92400e",
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                          padding: "8px 4px",
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Partnership CTA Section */}
      <div
        className="py-20"
        style={{
          background: 'linear-gradient(90deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
        }}
      >
        <div className="container mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <BusinessIcon sx={{ fontSize: "4rem", color: "white", marginBottom: "16px" }} />
            <Typography variant="h3" className="font-black text-white mb-6">
              Become a Part of Our Community
            </Typography>
            <Typography className="text-xl text-white/95 mb-8 max-w-3xl mx-auto">
              Millions of shoppers can't wait to see what you have in store. Join Africanshops as we
              drive Africa's digital trade hub to new heights.
            </Typography>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="contained"
                size="large"
                startIcon={<BusinessIcon />}
                sx={{
                  backgroundColor: "white",
                  color: "#ea580c",
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  padding: "16px 40px",
                  borderRadius: "9999px",
                  textTransform: "none",
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                  },
                }}
              >
                Become a Merchant
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PhoneIcon />}
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
                Call Us Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
