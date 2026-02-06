import { Box, Container, Typography, Button, Paper, useTheme, useMediaQuery, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import ConstructionIcon from "@mui/icons-material/Construction";
import UpdateIcon from "@mui/icons-material/Update";
import SettingsIcon from "@mui/icons-material/Settings";
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
  position: "relative",
  display: "inline-block",
  marginBottom: theme.spacing(4),
  "& svg": {
    fontSize: "5rem",
    color: theme.palette.info.main,
    animation: "rotate 3s linear infinite",
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& svg": {
      fontSize: "4rem",
    },
  },
}));

const StatusChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.info.light + "20",
  borderRadius: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: `2px solid ${theme.palette.info.main}`,
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  textAlign: "left",
  borderLeft: `4px solid ${theme.palette.info.main}`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
    borderLeft: "none",
    borderTop: `4px solid ${theme.palette.info.main}`,
  },
}));

const MaintenanceModePage = ({ serviceName = "Service" }) => {
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
        background: `linear-gradient(135deg, ${theme.palette.info.light}15 0%, ${theme.palette.info.main}15 100%)`,
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <StyledPaper elevation={0}>
          <IconWrapper>
            <SettingsIcon />
          </IconWrapper>

          <StatusChip>
            <ConstructionIcon sx={{ fontSize: "1.2rem", color: theme.palette.info.main }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.info.main }}>
              Under Maintenance
            </Typography>
          </StatusChip>

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
            We'll Be Back Shortly
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.7 }}
          >
            Our {serviceName.toLowerCase()} service is currently undergoing scheduled maintenance to improve your experience.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.palette.info.light + "30",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: theme.palette.info.main,
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          <InfoBox>
            <UpdateIcon sx={{ color: theme.palette.info.main, mt: 0.5 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                System Updates in Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We're performing important updates and improvements to enhance performance and add new features.
              </Typography>
            </Box>
          </InfoBox>

          <InfoBox>
            <ConstructionIcon sx={{ color: theme.palette.info.main, mt: 0.5 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Minimal Downtime Expected
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This maintenance window is brief. We appreciate your patience and will be back online soon.
              </Typography>
            </Box>
          </InfoBox>

          <Box sx={{ mt: 5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, fontStyle: "italic" }}
            >
              Thank you for your patience while we make things better for you!
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
              For urgent inquiries, please contact: support@africanshops.com
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default MaintenanceModePage;
