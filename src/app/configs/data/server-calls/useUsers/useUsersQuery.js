import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  newShopSignup,
  newShopSignupWithOtp,
  storePreShopUserData,
  storePreShopUserDataWithOtp,
} from "../../client/clientToApiRoutes";
import { removeUserSignUpToken, removeResendMerchantSignUpOtp, setMerchantSignUpStorage, setShopForgotPasswordPAYLOAD } from "app/configs/utils/authUtils";
import { useNavigate } from "react-router";
import { clientForgotPasswordWithOtp, clientResetPasswordFromOtp, preSignUpWithOtp, preUserRegistrationWithOtp,  } from "../../client/RepositoryClient";
import { clientLoggedInResetPassword, getApiAuthUser, getApiMinimizedAuthUser } from "../../client/RepositoryAuthClient";
// import {
//     newShopSignup,
//     storePreShopUserData,
// } from '~/repositories/RepositoryClient';

/*****
 * sign up new shop entry without and with otp
 */


export function useShopForgotPassWithOtp() {
  const navigate = useNavigate();
  return useMutation(clientForgotPasswordWithOtp, {
    onSuccess: (data) => {
      if (data?.data?.forgotpass_activation_token && data?.data?.success) {
        // ?.data
        // setShopForgotPasswordPAYLOAD
        setShopForgotPasswordPAYLOAD(data?.data?.forgotpass_activation_token);
        // toast.success('logged in successfully')
        toast.success(data?.data?.message);

        // history('/resetShopPassword');
        navigate('/reset-password');
        // window.location.replace('/rese')infomessage

        return;
      } else if (data?.data?.infomessage) {
        // console.log('LoginError22', data);

       toast.error(data?.data?.infomessage);
        return;
      } else {
        toast.info('something unexpected happened');
        return;
      }
    },
    onError: (error) => {
      console.log('LoginError22', error);
      const {
        response: { data },
      } = error ?? {};
      // data?.message?.map((m: []) =>toast.error(m))
      Array.isArray(data?.message) ? data?.message?.map((m) =>toast.error(m)) :toast.error(data?.message);
    },
  });
}


export function useResetShopPassFromOtp() {
  const history = useNavigate();
  return useMutation(clientResetPasswordFromOtp, {
    onSuccess: (data) => {
      console.log('RESET', data);
    //   console.log('LoginError22', data?.data?.infomessage);
    //   console.log('LoginError33', data?.data?.data);
      if (data?.data?.message & data?.data?.user) {
        console.log('SuccessDATaA_____', data);
        remove_SHOP_FORGOTPASS_TOKEN()
        toast.success(data?.data?.message);

        // history('/resetShopPassword');
        // window.location.replace('/rese')infomessage

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
      console.log('LoginError22__', error);
      const {
        response: { data },
      } = error ?? {};
      // data?.message?.map((m: []) =>toast.error(m))
      Array.isArray(data?.message) ? data?.message?.map((m) =>toast.error(m)) :toast.error(data?.message);
    },
  });
}


/****Sign-Up User */
export function useShopSignUp() {
  const queryClient = useQueryClient();

  return useMutation(newShopSignup, {
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message);
      }
    },
    onError: (error) => {
      console.log("MuTationError", error);
      console.log("MuTationErrorMessage", error.message);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    },
  });
}

export function useShopSignUpWithOtp() {
  const queryClient = useQueryClient();

  return useMutation(preSignUpWithOtp, {
    onSuccess: (data) => {
    //   console.log("preShopSignUp", data?.data); 

      if (data?.data?.registration_activation_token && data?.data?.message) {
        //Store tokrn in cookie
        setMerchantSignUpStorage(data?.data?.registration_activation_token)

        
        toast.success(data?.data?.message);
      }
      if(data?.data?.errors){
          Array.isArray(data?.data?.errors) ? data?.data?.errors?.map((m) =>toast.error(`${m?.message + '' + 'for' + ' ' + ' ' + m?.path[1]}`)) :toast.error(data?.data?.errors?.message);
      }
    },
    onError: (error) => {
    toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
 
    },
  });
}

//Store New Shop User from token
export function useStoreShopPreSignUp() {
  const queryClient = useQueryClient();

  return useMutation(storePreShopUserData, {
    onSuccess: (data) => {
      console.log("RegistrationResponse", data);
      console.log("ResponseMessage", data?.data?.message);

      if (data) {
        toast.success(data?.data?.message);
      }
    },
    onError: (error) => {
      console.log("MuTationError", error);
      console.log("MuTationErrorMessage", error.message);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    },
  });
}




/***Store New Shop User from OTP  useStoreShopPreSignUpFromOtp*/
export function useStoreUserPreSignUpFromOtp() {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
  
    return useMutation(preUserRegistrationWithOtp, {
      onSuccess: (data) => {
        console.log("RegistrationResponse", data?.data);
        console.log("ResponseMessage", data?.data?.message);
  
        if (data?.data?.success && data?.data?.message && data?.data?.payload) {
            // && data?.data?.newShopFinanceAccount
          toast.success(data?.data?.message);
          removeUserSignUpToken()
            removeResendMerchantSignUpOtp()
            navigate('/sign-in')
            // toast.success(data?.data?.success && data?.data?.message && data?.data?.newShopFinanceAccount);
        }

        if(data?.data?.errors){
            console.log("activate Merchant Errors", data?.data?.errors);

              Array.isArray(data?.data?.errors) ? data?.data?.errors?.map((m) =>toast.error(`${m?.message + '' + 'for' + ' ' + ' ' + m?.path[1]}`)) :toast.error(data?.data?.errors?.message);
          }
      },
      onError: (error) => {
        console.log("MuTationError", error);
        console.log("MuTationErrorMessage", error.message);
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
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
  const queryClient = useQueryClient();

  return useMutation(clientLoggedInResetPassword, {
    onSuccess: (data) => {
      // console.log('restUserPass_SUCCESS', data)
      if(data?.data?.updatedPass && data?.data?.success){
        
        toast.success(data?.data?.message);
      }
    },

    onError: (error) => {
      toast.error(
        error?.response && error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message
      );
    },
  });
}


     /****
   * #######################################################################
   *  AUTHENTICATED USER SETTINGS ==> (CHANGE PASSWORD ETC ) starts here
   * ############################################################################
   */



