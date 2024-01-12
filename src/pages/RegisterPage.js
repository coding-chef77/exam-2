import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, REGISTER_URL } from "../constants/api";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  Avatar,
  Alert,
  CircularProgress,
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
  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setIsSubmitting(true);
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
        navigate("/login");
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
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
          <AppRegistrationRoundedIcon />
        </Avatar>
        <Header title="Create Profile" />
        {error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegister)}
          sx={{ mt: 1, width: "100%" }}
        >
          {/* Controller components for form fields */}
          {/* ... */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
        <Link to="/login" style={{ marginTop: 15 }}>
          Already registered? Log in here!
        </Link>
      </Box>
    </Container>
  );
}
