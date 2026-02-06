import { Box, Container, Typography, Button, Paper, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import BuildIcon from "@mui/icons-material/Build";
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
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  "& svg": {
    fontSize: "3rem",
    color: theme.palette.warning.main,
    animation: "pulse 2s infinite",
  },
  "@keyframes pulse": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
    "& svg": {
      fontSize: "2.5rem",
    },
  },
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const DevelopmentModePage = ({ serviceName = "Service" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.warning.light}15 0%, ${theme.palette.warning.main}15 100%)`,
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <StyledPaper elevation={0}>
          <IconWrapper>
            <CodeIcon />
            <BugReportIcon />
            <BuildIcon />
          </IconWrapper>

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
            {serviceName} in Development
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.7 }}
          >
            We're actively working on exciting new features and improvements for our {serviceName.toLowerCase()} service.
          </Typography>

          <FeatureBox>
            <BuildIcon sx={{ color: theme.palette.warning.main }} />
            <Typography variant="body1" color="text.secondary">
              Our development team is building and testing new features
            </Typography>
          </FeatureBox>

          <FeatureBox>
            <BugReportIcon sx={{ color: theme.palette.warning.main }} />
            <Typography variant="body1" color="text.secondary">
              We're squashing bugs and optimizing performance
            </Typography>
          </FeatureBox>

          <Box sx={{ mt: 5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Check back soon for updates!
            </Typography>

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
              Need help? Contact our support team at support@africanshops.com
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default DevelopmentModePage;
