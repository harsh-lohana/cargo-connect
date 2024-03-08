<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/User/Dashboard";
import TruckerDashboard from "./pages/Trucker/TruckerDashboard";
import { Allorders } from "./pages/Trucker/Allorder/Allorders";

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
            <Route path="/cargoconnect" element={<Dashboard/>}/> 
            <Route path="/truckerHome" element={<TruckerDashboard/>}/>
            <Route path="/allorders" element={<Allorders/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
=======
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/User/DashBoard/Dashboard";
import TruckerDashboard from "./pages/Trucker/TruckerDashboard";
import { Allorders } from "./pages/Trucker/Allorder/Allorders";
import UserOrders from "./pages/User/DashBoard/UserOrders";

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
            <Route path="/cargoconnect" element={<Dashboard/>}/> 
            <Route path="/userorders" element={<UserOrders/>}/> {/* Added closing tag */}
            <Route path="/truckerHome" element={<TruckerDashboard/>}/>
            <Route path="/allorders" element={<Allorders/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
>>>>>>> 086fde41eb0889dfb1ad109e4a956d2cd6d756aa
