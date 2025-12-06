import React from "react";
import ReactDOM from "react-dom/client";



/**
 * Header
 * Logo
 * Nav Items
 * Body
 *  - Search
 *  - RestaurantContainer
 *      - RestaurantCard (many)
 * Footer
 *  - Links
 *  - Copyright
 *  - Contact Info
 *  - Address
 */

// JSX (transpiled before it reaches the JS) - parcel -babel

// JSX => Bebel transpiles it to React.createElement => ReactElement => JS Object => HTMLElement(render)

const Title = () => {
  return <h1 id="title">Hello from Title Component</h1>
};


const HeadingComponent = () => (
  <div>
    <Title />
    <h1 id="heading2">Hello from Functional Component</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
