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
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#ea580c',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ea580c',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ea580c',
              },
            }}
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
                    sx={{
                      color: '#ea580c',
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#ea580c',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ea580c',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ea580c',
              },
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
                control={
                  <Checkbox
                    size="small"
                    {...field}
                    sx={{
                      '&.Mui-checked': {
                        color: '#ea580c',
                      },
                    }}
                  />
                }
              />
            </FormControl>
          )}
        />

        <Link
          className="text-md font-medium"
          to="/forgot-password"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Forgot password?
        </Link>
      </div>

      <Button
        variant="contained"
        className="mt-16 w-full"
        aria-label="Sign in"
        disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
        type="submit"
        size="large"
        sx={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          color: 'white',
          fontWeight: 600,
          height: '48px',
          fontSize: '1rem',
          '&:hover': {
            background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
          },
          '&:disabled': {
            background: '#e5e7eb',
            color: '#9ca3af',
          },
        }}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

export default JwtSignInForm;
