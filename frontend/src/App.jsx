import { BrowserRouter, Routes, Route } from "react-router-dom";
import BMIPage from "./pages/BMIPage";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import HealthInformationPage from "./pages/HealthInformationPage";
import HealthBlogDetailPage from "./pages/HealthBlogDetailPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen">
        <NavbarComponent />
        <ScrollToTopButton />
        <div className="flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<BMIPage />}></Route>
            <Route path="/Health-Information" element={<HealthInformationPage />}></Route>
            <Route path="/Health-Information/:blogId" element={<HealthBlogDetailPage />} ></Route>
            <Route path="/Community" element={<CommunityPage />}></Route>
            <Route path="/Profile" element={<ProfilePage />}></Route>
            <Route path="/Sign-Up" element={<SignUpPage />}></Route>
            <Route path="/Login" element={<LoginPage />}></Route>
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}