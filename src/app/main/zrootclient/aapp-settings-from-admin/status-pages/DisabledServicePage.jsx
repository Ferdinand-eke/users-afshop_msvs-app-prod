import { Box, Container, Typography, Button, Paper, useTheme, useMediaQuery, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import BlockIcon from "@mui/icons-material/Block";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";

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
    color: theme.palette.error.main,
    opacity: 0.9,
  },
  [theme.breakpoints.down("sm")]: {
    "& > .main-icon": {
      fontSize: "4rem",
    },
  },
}));

const StatusBadge = styled(Chip)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  padding: theme.spacing(2.5, 2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.error.light + "20",
  color: theme.palette.error.main,
  border: `2px solid ${theme.palette.error.main}`,
}));

const AlternativeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1.5),
  marginTop: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const DisabledServicePage = ({ serviceName = "Service" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const exploreAlternatives = [
    {
      title: "Marketplace",
      description: "Browse and shop from thousands of products",
      path: "/marketplace",
    },
    {
      title: "Food Marts",
      description: "Order delicious meals from local restaurants",
      path: "/food-marts",
    },
    {
      title: "Estate Properties",
      description: "Explore properties for sale or rent",
      path: "/estate-properties",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.error.light}10 0%, ${theme.palette.grey[100]} 100%)`,
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <StyledPaper elevation={0}>
          <IconWrapper>
            <BlockIcon className="main-icon" />
          </IconWrapper>

          <StatusBadge
            icon={<InfoOutlinedIcon />}
            label="Service Unavailable"
          />

          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            {serviceName} Service is Currently Disabled
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.7 }}
          >
            We apologize, but the {serviceName.toLowerCase()} service is temporarily unavailable.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            We're working on bringing this service back. In the meantime, explore our other amazing services!
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <ExploreIcon /> Explore Other Services
            </Typography>

            {exploreAlternatives.map((alternative, index) => (
              <AlternativeBox
                key={index}
                onClick={() => navigate(alternative.path)}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, textAlign: "left" }}>
                    {alternative.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
                    {alternative.description}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 100 }}
                >
                  Explore
                </Button>
              </AlternativeBox>
            ))}
          </Box>

          <Box sx={{ mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Return to Home
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
              Questions? Reach out to us at support@africanshops.com
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default DisabledServicePage;
