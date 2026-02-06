import { Box, Container, Typography, Button, Paper, useTheme, useMediaQuery, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  maxWidth: 800,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "inline-block",
  position: "relative",
  marginBottom: theme.spacing(4),
  "& > .main-icon": {
    fontSize: "5rem",
    color: theme.palette.success.main,
    animation: "launch 2s ease-in-out infinite",
  },
  "@keyframes launch": {
    "0%, 100%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(-20px)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > .main-icon": {
      fontSize: "4rem",
    },
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.success.light + "10",
  borderRadius: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  border: `1px solid ${theme.palette.success.light}50`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const NotifyBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  border: `2px dashed ${theme.palette.success.main}`,
}));

const StarsWrapper = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  pointerEvents: "none",
  "& .star": {
    position: "absolute",
    color: "#FFD700",
    animation: "twinkle 3s ease-in-out infinite",
    opacity: 0.6,
  },
  "@keyframes twinkle": {
    "0%, 100%": {
      opacity: 0.3,
      transform: "scale(1)",
    },
    "50%": {
      opacity: 0.8,
      transform: "scale(1.2)",
    },
  },
});

const ComingSoonPage = ({ serviceName = "Service" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");

  const handleNotifyMe = () => {
    if (email) {
      // Handle notification signup logic here
      console.log("Notify email:", email);
      // Show success message
      alert("Thank you! We'll notify you when we launch.");
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.success.light}15 0%, ${theme.palette.success.main}10 100%)`,
        padding: { xs: 2, sm: 3, md: 4 },
        position: "relative",
      }}
    >
      <StarsWrapper>
        <StarIcon className="star" sx={{ top: "10%", left: "15%", fontSize: "1.5rem" }} />
        <StarIcon className="star" sx={{ top: "20%", right: "20%", fontSize: "1rem" }} />
        <StarIcon className="star" sx={{ bottom: "30%", left: "10%", fontSize: "1.2rem" }} />
        <StarIcon className="star" sx={{ bottom: "15%", right: "15%", fontSize: "1.8rem" }} />
        <StarIcon className="star" sx={{ top: "50%", left: "5%", fontSize: "1rem" }} />
        <StarIcon className="star" sx={{ top: "40%", right: "10%", fontSize: "1.3rem" }} />
      </StarsWrapper>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <StyledPaper elevation={0}>
          <IconWrapper>
            <RocketLaunchIcon className="main-icon" />
          </IconWrapper>

          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {serviceName} Coming Soon!
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.7 }}
          >
            We're building something amazing! Our new {serviceName.toLowerCase()} service will revolutionize your experience.
          </Typography>

          <FeatureCard>
            <CalendarTodayIcon sx={{ color: theme.palette.success.main, fontSize: "2rem" }} />
            <Box sx={{ flex: 1, textAlign: "left" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Launching Very Soon
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We're putting the finishing touches on an incredible experience
              </Typography>
            </Box>
          </FeatureCard>

          <FeatureCard>
            <RocketLaunchIcon sx={{ color: theme.palette.success.main, fontSize: "2rem" }} />
            <Box sx={{ flex: 1, textAlign: "left" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Exciting Features Ahead
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get ready for innovative tools and seamless user experience
              </Typography>
            </Box>
          </FeatureCard>

          <NotifyBox>
            <NotificationsActiveIcon
              sx={{
                color: theme.palette.success.main,
                fontSize: "2.5rem",
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Be the First to Know
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your email to get notified when we launch
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  flex: 1,
                  maxWidth: { sm: 350 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleNotifyMe}
                sx={{
                  px: 4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: { xs: "100%", sm: 140 },
                }}
              >
                Notify Me
              </Button>
            </Box>
          </NotifyBox>

          <Box sx={{ mt: 5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              In the meantime, explore our other services
            </Typography>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                },
              }}
            >
              Explore Home
            </Button>
          </Box>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Stay connected: support@africanshops.com
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default ComingSoonPage;
