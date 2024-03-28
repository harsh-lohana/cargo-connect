import LandingPage from "./pages/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/User/DashBoard/Dashboard";
import TruckerDashboard from "./pages/Trucker/TruckerDashboard";
import { Allorders } from "./pages/Trucker/Allorder/Allorders";
import { UserOrders } from "./pages/User/DashBoard/UserOrders";
import { Commitment } from "./pages/Trucker/Commitment/Commitment";

const App = () => {
  return (
    <div>
      <div className="flex flex-col w-[100%] justify-items-center">
        <main>
          <Toaster/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cargoconnect" element={<Dashboard/>}/> 
            <Route path="/truckerHome" element={<TruckerDashboard/>}/>
            <Route path="/allorders" element={<Allorders/>}/>
            <Route path="/commit" element={<Commitment/>}/>
            <Route path="/userorders" element={<UserOrders/>}/> 
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
