import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  newShopSignup,
  newShopSignupWithOtp,
  storePreShopUserData,
  storePreShopUserDataWithOtp,
} from "../../client/clientToApiRoutes";
import { removeUserSignUpToken, removeResendMerchantSignUpOtp, setMerchantSignUpStorage, setShopForgotPasswordPAYLOAD, remove_SHOP_FORGOTPASS_TOKEN } from "app/configs/utils/authUtils";
import { useNavigate } from "react-router";
import { clientForgotPasswordWithOtp, clientResetPasswordFromOtp, preSignUpWithOtp, preUserRegistrationWithOtp,  } from "../../client/RepositoryClient";
import { clientLoggedInResetPassword, getApiAuthUser, getApiMinimizedAuthUser } from "../../client/RepositoryAuthClient";

/**
 * Handles NestJS and generic API errors and displays appropriate toast messages
 *
 * NestJS error formats:
 * 1. Validation errors: { message: ["error1", "error2"], error: "Bad Request", statusCode: 400 }
 * 2. Single errors: { message: "Error message", error: "Error Type", statusCode: 4xx/5xx }
 * 3. Custom errors: { message: string | string[], statusCode: number }
 *
 * @param {Error} error - The error object from the API call
 * @param {Object} options - Configuration options
 * @param {boolean} options.logError - Whether to log the error to console (default: true)
 * @param {string} options.fallbackMessage - Fallback message if no error message is found
 */
const handleApiError = (error, options = {}) => {
  const {
    logError = true,
    fallbackMessage = "An unexpected error occurred. Please try again."
  } = options;

  // Log error for debugging
  if (logError) {
    console.error("API Error:", error);
    console.error("Error Response:", error?.response?.data);
  }

  // Extract error data from response
  const errorData = error?.response?.data;
  const errorMessage = errorData?.message;
  const statusCode = errorData?.statusCode || error?.response?.status;

  // Handle different error message formats
  if (errorMessage) {
    // Case 1: Array of error messages (NestJS validation errors)
    if (Array.isArray(errorMessage)) {
      errorMessage.forEach((msg) => {
        toast.error(msg);
      });
      return;
    }

    // Case 2: Single error message string
    if (typeof errorMessage === "string") {
      toast.error(errorMessage);
      return;
    }
  }

  // Case 3: Handle error object with nested message
  if (errorData?.error) {
    toast.error(`${errorData.error}: ${errorData.message || "Unknown error"}`);
    return;
  }

  // Case 4: Network or other errors
  if (error?.message) {
    // Don't show technical error messages to users, use fallback instead
    if (error.message.includes("Network Error") || error.message.includes("timeout")) {
      toast.error("Network error. Please check your connection and try again.");
      return;
    }

    toast.error(error.message);
    return;
  }

  // Case 5: Fallback for unknown errors
  toast.error(fallbackMessage);
};

/*****
 * sign up new shop entry without and with otp
 */



export function useShopForgotPassWithOtp() { //(Msvs => Done)
  const navigate = useNavigate();

  return useMutation(clientForgotPasswordWithOtp, {
    onSuccess: (data) => {

      console.log("useShopForgotPassWithOtp", data);
      if (data?.data?.token && data?.data?.success && data?.data?.message) {

        setShopForgotPasswordPAYLOAD(data?.data?.token);
        toast.success(data?.data?.message);
        navigate('/reset-password');
        return;
      } else if (data?.data?.infomessage) {
       toast.error(data?.data?.infomessage);
        return;
      } else {
        toast.info('something unexpected happened');
        return;
      }
    },
    onError: (error) => {
      handleApiError(error, {
        fallbackMessage: "Failed to send password reset code. Please try again."
      });
    },
  });
}



export function useResetShopPassFromOtp() { //(Msvs => Done)
  const navigate = useNavigate();
  return useMutation(clientResetPasswordFromOtp, {
    onSuccess: (data) => {
      if (data?.data?.message && data?.data?.success) {
        remove_SHOP_FORGOTPASS_TOKEN()
        toast.success(data?.data?.message);

        navigate('/sign-in');

        return;
      }
      else if (data?.data?.infomessage) {
        console.log('LoginError22', data?.data?.message);

       toast.error(data?.data?.infomessage);
        return;
      } else {
        toast.info('something unexpected happened');
        return;
      }
    },
    onError: (error) => {
      handleApiError(error, {
        fallbackMessage: "Failed to reset password. Please try again or request a new reset code."
      });
    },
  });
}


/****Sign-Up User */
export function useShopSignUp() {
  return useMutation(newShopSignup, {
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message);
      }
    },
    onError: (error) => {
      handleApiError(error, {
        fallbackMessage: "Failed to sign up. Please check your information and try again."
      });
    },
  });
}

export function useShopSignUpWithOtp() { //(Msvs => Done)
  return useMutation(preSignUpWithOtp, {
    onSuccess: (data) => {
    //   console.log("preShopSignUp", data?.data);

      if (data?.data?.registration_activation_token && data?.data?.success) {
        //Store tokrn in cookie
        setMerchantSignUpStorage(data?.data?.registration_activation_token)


        toast.success(data?.data?.message ? data?.data?.message : 'Registration successful, please check your email for the activation link');
      }
      if(data?.data?.errors){
          Array.isArray(data?.data?.errors) ? data?.data?.errors?.map((m) =>toast.error(`${m?.message + '' + 'for' + ' ' + ' ' + m?.path[1]}`)) :toast.error(data?.data?.errors?.message);
      }
    },
    onError: (error) => {
      handleApiError(error, {
        fallbackMessage: "Failed to complete registration. Please check your information and try again."
      });
    },
  });
}

//Store New Shop User from token //(Msvs => Done)
export function useStoreShopPreSignUp() {
  return useMutation(storePreShopUserData, {
    onSuccess: (data) => {
      console.log("RegistrationResponse", data);
      console.log("ResponseMessage", data?.data?.message);

      if (data) {
        toast.success(data?.data?.message);
      }
    },
    onError: (error) => {
      handleApiError(error, {
        fallbackMessage: "Failed to complete account setup. Please try again."
      });
    },
  });
}




/***Store New Shop User from OTP  useStoreShopPreSignUpFromOtp*/ //(Msvs => Done)
export function useStoreUserPreSignUpFromOtp() {
    const navigate = useNavigate()

    return useMutation(preUserRegistrationWithOtp, {
      onSuccess: (data) => {
        console.log("RegistrationResponse", data?.data);
        console.log("ResponseMessage", data?.data?.message);

        if (data?.data?.success  ) {
          toast.success(data?.data?.message ? data?.data?.message : 'Registration completed successfully!');
          removeUserSignUpToken()
            removeResendMerchantSignUpOtp()
            navigate('/sign-in')
        }

        if(data?.data?.errors){
            console.log("activate Merchant Errors", data?.data?.errors);

              Array.isArray(data?.data?.errors) ? data?.data?.errors?.map((m) =>toast.error(`${m?.message + '' + 'for' + ' ' + ' ' + m?.path[1]}`)) :toast.error(data?.data?.errors?.message);
          }
      },
      onError: (error) => {
        handleApiError(error, {
          fallbackMessage: "Failed to activate account. The code may be invalid or expired."
        });
      },
    });
  }


  /****
   * #######################################################################
   * GET AUTHENTICATED USER DATA  starts
   * ############################################################################
   */

  export function useGetAuthUserDetails() {
    return useQuery(['__authUserData'], getApiAuthUser);
  }

  export function useGetMinimizedAuthUserDetails() {
    return useQuery(['__minimizedAuthUserData'], getApiMinimizedAuthUser);
  }
   /****
   * #######################################################################
   * GET AUTHENTICATED USER DATA  ends here
   * ############################################################################
   * ============================================================================================
   */

   /***
 * update user password by logged in merchant
 */
export function useUserSettingsResetPass() {
  return useMutation(clientLoggedInResetPassword, {
    onSuccess: (data) => {
      if(data?.data?.updatedPass && data?.data?.success){

        toast.success(data?.data?.message);
      }
    },

    onError: (error) => {
      handleApiError(error, {
        fallbackMessage: "Failed to update password. Please check your current password and try again."
      });
    },
  });
}


     /****
   * #######################################################################
   *  AUTHENTICATED USER SETTINGS ==> (CHANGE PASSWORD ETC ) starts here
   * ############################################################################
   */



