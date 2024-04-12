import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BMIPage from "./pages/BMIPage";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen bg-zinc-900">
        <NavbarComponent />
        <div className="flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/BMI" element={<BMIPage />}></Route>
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}