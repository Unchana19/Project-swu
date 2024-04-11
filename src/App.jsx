import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen bg-zinc-900 flex flex-col justify-center items-center">
      <NavbarComponent />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>        
      </div>
    </BrowserRouter>
  )
}