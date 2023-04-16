import { GridProducts } from "./components/grid-products/grid-products";
import { Navbar } from "./components/navbar/navbar";
import { Router } from "./router";

import './styles/index.scss'; 


// const navbar = new Navbar();
// navbar.render();

// const gridComponents = new GridProducts(); 
// gridComponents.render(); 

const router = new Router();
router.configureRoutes(); // Navegar para a página inicial


