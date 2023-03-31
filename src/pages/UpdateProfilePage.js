import { Box, Container, TextField, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../common/BackButton";
import { BASE_URL, PROFILE_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  avatar: yup.string().nullable().url().required("Avatar URL is required"),
  banner: yup.string().nullable().url().required("Banner URL is required"),
});

export default function UpdateProfilePage() {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [setError] = useState("");

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateSubmit = async (data) => {
    const { avatar, banner } = data;

    const url = `${BASE_URL}${PROFILE_URL}/${auth.name}/media`;

    const newProfile = {
      banner: banner,
      avatar: avatar,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newProfile),
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          console.log();
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          history("/myprofile");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container>
      <BackButton />
      <Box
        component="form"
        onSubmit={handleSubmit(updateSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Header title="Update Profile" />
        <TextField
          style={{ width: "300px", margin: "5px 0" }}
          id="avatar"
          label="Avatar image URL"
          {...register("avatar")}
          helperText={errors.avatar?.message}
          error={Boolean(errors.avatar)}
        />
        <TextField
          style={{ width: "300px", margin: "5px 0" }}
          id="banner"
          label="Banner image URL"
          {...register("banner")}
          helperText={errors.banner?.message}
          error={Boolean(errors.banner)}
        />
        <Button type="submit" variant="contained" style={{ margin: "10px 0" }}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
