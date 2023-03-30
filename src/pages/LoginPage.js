import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL, LOGIN_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "../components/Header";
import {
  TextField,
  Container,
  Box,
  Avatar,
  Alert,
  Button,
} from "@mui/material";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const url = BASE_URL + LOGIN_URL;

export default function LoginPage() {
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const logIn = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        const auth = {
          name: json.name,
          email: json.email,
          avatar: json.avatar,
          accessToken: json.accessToken,
        };

        setAuth(auth);
        navigate("/posts");
      } else if (response.status === 401) {
        setError("Incorrect email or password");
      } else {
        setError("Please check your email and password");
      }
    } catch (e) {
      setError("An error occurred, please try again");
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "background.dark" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Header title={"Log In"} />

        {error && (
          <Alert variant="filled" severity="error">
            <strong>{error}</strong>
          </Alert>
        )}

        <form onSubmit={handleSubmit(logIn)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              margin="normal"
              label="Your email address"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              type="password"
              label="Your password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "baseline",
            }}
          >
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
              Log In
            </Button>
          </Box>
        </form>

        <Link to="/register">Not registered? Do it here!</Link>
      </Box>
    </Container>
  );
}
