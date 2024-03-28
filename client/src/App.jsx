import Router from "./routes/Section";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <div className="flex flex-col w-[100%] justify-items-center">
        <main>
          <Toaster/>
          <Router />
        </main>
      </div>
    </div>
  );
};

export default App;
