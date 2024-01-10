import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/navbar/NavBar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";
import SinglePostPage from "./pages/SinglePostPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ProfilesPage from "./pages/ProfilesPage";
import SingleProfilePage from "./pages/SingleProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./common/theme/theme";

function App() {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar auth={auth} />
          <Container>
            <div id="page-body" style={{ marginBottom: "80px" }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage auth={auth} />} />
                <Route
                  path="/register"
                  element={<RegisterPage auth={auth} />}
                />
                <Route path="/posts" element={<PostsPage auth={auth} />} />
                <Route
                  path="/posts/:postId"
                  element={<SinglePostPage auth={auth} />}
                />
                <Route
                  path="/newPost"
                  element={<CreatePostPage auth={auth} />}
                />
                <Route
                  path="/myprofile"
                  element={<ProfilePage auth={auth} />}
                />
                <Route
                  path="/myprofile/:myprofileId"
                  element={<UpdateProfilePage auth={auth} />}
                />
                <Route
                  path="/profiles"
                  element={<ProfilesPage auth={auth} />}
                />
                <Route
                  path="/profiles/:profileName"
                  element={<SingleProfilePage auth={auth} />}
                />
                <Route path="*" element={<NotFoundPage auth={auth} />} />
              </Routes>
              <Footer />
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
