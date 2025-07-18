import { useMutation } from "react-query";
import config from "../../../../auth/services/jwt/jwtAuthConfig";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";

import { toast } from "react-toastify";

import { adminSignIn } from "../../client/clientToApiRoutes";
import { clientSigin } from "../../client/RepositoryClient";
import { useNavigate } from "react-router";
// import { adminSigin } from "../apiRoutes";

export function useShopAdminLogin() {
  // const navigate = useNavigate();
  return useMutation(clientSigin, {
    onSuccess: (data) => {
      console.log("LoginData", data);
      if (data?.data?.user && data?.data?.userAccessToken
) {
        /**============================================================================== */

        const transFormedUser = {
          id: data?.data?.user?.id,
          name: data?.data?.user?.name,
          email: data?.data?.user?.email,
          role: "user",
          avatar: data?.data?.user?.avatar,
        };

        

        if (data?.data?.userAccessToken
) {
          localStorage.setItem(config.tokenStorageKey, data?.data?.userAccessToken
);
          axios.defaults.headers.common.accessToken = `${data?.data?.userAccessToken
}`;
        }

        if (isTokenValid(data?.data?.userAccessToken
)) {
          localStorage.setItem(config.isAuthenticatedStatus, true);
        } else {
          localStorage.setItem(config.isAuthenticatedStatus, false);
        }

        if (transFormedUser) {
          setUserCredentialsStorage(transFormedUser);
        }
      } else if (data) {
        console.log("LoginError22_", data.data);

        Array.isArray(data?.data?.message)
          ? data?.data?.message?.map((m) => toast.error(m.message))
          : toast.error(data?.data?.message);
        return;
      } else {
        toast.info("something unexpected happened");
        return;
      }
    },
    onError: (error) => {
      console.log("LoginError22Block", error);

      const {
        response: { data },
      } = error ?? {};
      Array.isArray(data?.message)
        ? data?.message?.map((m) => toast.error(m))
        : toast.error(data?.message);
    },
  });
}

const isTokenValid = (accessToken) => {
  if (accessToken) {
    try {
      const decoded = jwtDecode(accessToken);
      // console.log("DECODED Token-DATA", decoded)
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  return false;
};

const setUserCredentialsStorage = (userCredentials) => {
  const setUserCookie = Cookie.set(
    config.adminCredentials,
    JSON.stringify({ userCredentials })
  );

  if (setUserCookie) {
    window.location.reload();
  }
};
