import SignAcceptInvitePage from "./SignAcceptInvitePage";
import authRoles from "../../auth/authRoles";

const SignAcceptInviteConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "accept-invite/:token",
      element: <SignAcceptInvitePage />,
    },
  ],
};
export default SignAcceptInviteConfig;
