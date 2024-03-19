import Router from "./routes/Section";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex justify-center bg-blue-200 min-h-screen">
      <div className="flex flex-col w-[90%] justify-items-center">
        <main>
          <Toaster/>
          <Router />
        </main>
      </div>
    </div>
  );
};

export default App;
