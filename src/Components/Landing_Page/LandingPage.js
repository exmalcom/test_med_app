import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom";

import "./LandingPage.css"; // Importing the CSS styles for the Landing_Page component

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
    <section className="hero-section"> {/* Creating a section with class name 'hero-section' */}
      <div>
        <div data-aos="fade-up" className="flex-hero"> {/* Creating a div with data-aos attribute and class name 'flex-hero' */}
            
            <h1>
              Your Health<br/>

              <span className="text-gradient">
                
                Our Responsibility
              </span>
            </h1>
              <div class="blob-cont"> {/* Creating a div with class name 'blob-cont' */}
                  <div class="blue blob"></div> {/* Creating a blue blob inside the 'blob-cont' div */}
              </div>
              <div class="blob-cont"> {/* Creating another div with class name 'blob-cont' */}
                  <div class="blue1 blob"></div> {/* Creating a different blue blob inside the second 'blob-cont' div */}
              </div>
            <h4>
              <p>
                We are a team of medical professionals dedicated to providing the best medical care to our patients. Our online medical service booking platform allows you to book appointments with doctors and medical professionals from the comfort of your home or office. No need to wait in line or worry about finding a parking spot.
              </p>

            </h4>
            <Link to="/consultation"> {/* Creating a hyperlink to jump to the 'services' section */}
              <button class="button">Get Started</button> {/* Creating a button with class name 'button' */}
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page; // Exporting the Landing_Page component to be used in other parts of the application