import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import useJwtAuth from "../useJwtAuth";
import { toast } from "react-toastify";


const defaultValues = {

  email: "",
  password: "",
  remember: true,
};


function JwtSignInForm() {
  const { signIn, isLoading } = useJwtAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { control, formState, handleSubmit, setValue, setError } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const { isValid, dirtyFields, errors } = formState;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  function onSubmit(formData) {
    const { email, password } = formData;
    signIn({
      email,
      password,
    }).catch((error) => {
      console.log("FormJSXError", error);
      toast.error(error?.message)
    });
  }
  return (
    <form
      name="loginForm"
      noValidate
      className="mt-32 flex w-full flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24"
            label="Email"
            autoFocus
            type="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24"
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors?.password?.message}
            variant="outlined"
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormControlLabel
                label="Remember me"
                control={<Checkbox size="small" {...field} />}
              />
            </FormControl>
          )}
        />

        <Link className="text-md font-medium" to="/forgot-password">
          Forgot password?
        </Link>
      </div>

      <Button
        variant="contained"
        color="secondary"
        className=" mt-16 w-full"
        aria-label="Sign in"
        disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
        type="submit"
        size="large"
      >
        {isLoading ? "processing..." : "Sign in"}
        {/* Sign in */}
      </Button>
    </form>
  );
}

export default JwtSignInForm;
