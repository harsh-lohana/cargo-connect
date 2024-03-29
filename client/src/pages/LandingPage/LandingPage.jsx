import "./Styles.css";
import Home from "./Components/Home";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer.jsx";
import data from './Components/TestimonialData.json'
import About from "./Components/About.jsx";
import Work from './Components/Work.jsx'
import HomeNavbar from '../../components/Navbars/HomeNavbar.jsx';
function LandingPage() {

  
  return (
    <div className="LandingPage ">
      <div className= "first">
      <Home />
      </div>
      <div className="about"> <About /></div>
      <Work/>
      <Testimonial  testimonialData =  {data}/>
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;