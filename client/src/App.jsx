import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex justify-center bg-yellow-200 min-h-screen">
      <div className="flex flex-col w-[90%] justify-items-center">
        <main>
          <Toaster/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
