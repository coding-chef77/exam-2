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
  CircularProgress,
} from "@mui/material";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const url = BASE_URL + LOGIN_URL;

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        setAuth({
          name: json.name,
          email: json.email,
          avatar: json.avatar,
          accessToken: json.accessToken,
        });
        navigate("/posts");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (e) {
      setError("An error occurred, please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="sm">
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
        <Header title="Log In" />

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit(logIn)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Your email address"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Your password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Log In"}
          </Button>
        </Box>

        <Link to="/register" style={{ marginTop: 15 }}>
          Not registered? Do it here!
        </Link>
      </Box>
    </Container>
  );
}
