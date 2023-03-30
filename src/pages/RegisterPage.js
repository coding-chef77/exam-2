import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, REGISTER_URL } from "../constants/api";
import Header from "../components/Header";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  Avatar,
  TextField,
  Alert,
} from "@mui/material";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";

const url = BASE_URL + REGISTER_URL;

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@stud\.noroff\.no$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9_]*$/, "Use only letters, numbers and underscores")
    .required("Please enter a username"),

  email: yup
    .string()
    .matches(emailRegExp, "An @stud.noroff.no email is required")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Password minimum 8 characters")
    .required("Please enter a password"),
  avatar: yup.string(),
  banner: yup.string(),
});

export default function RegisterPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      banner: data.banner,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const json = await response.json();
        navigate("/login");
      } else if (response.status === 400) {
        const error = await response.json();
        setError("You have an account, please log in");
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container omponent="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "background.dark" }}>
          <AppRegistrationRoundedIcon />
        </Avatar>
        <Header title="Create profile" />
        {error && (
          <Alert variant="filled" severity="info" sx={{ margin: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleRegister)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginBottom: 2,
            }}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Name"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="avatar"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Avatar image URL"
                  error={Boolean(errors.avatar)}
                  helperText={errors.avatar?.message}
                />
              )}
            />
            <Controller
              name="banner"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Banner  image URL"
                  error={Boolean(errors.banner)}
                  helperText={errors.banner?.message}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "baseline",
            }}
          >
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
          </Box>
          <Link to="/login">Already registered? Log in here!</Link>
        </form>
      </Box>
    </Container>
  );
}
