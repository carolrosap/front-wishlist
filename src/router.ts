type RouteHandler = () => void;

type RouteMap = {
    [url: string]: RouteHandler;
};
import { GridProducts } from "./components/grid-products/grid-products";
import { Navbar } from "./components/navbar/navbar";


export class Router {

    public handleHomeRoute(): void {
        const navbar = new Navbar();
        navbar.render();

        const gridComponents = new GridProducts();
        gridComponents.render('home');
    }

    public handleWishlistRoute(): void {
        const navbar = new Navbar();
        navbar.render();
        const gridComponents = new GridProducts();
        gridComponents.render('wishlist');
    }

    public configureRoutes(): void {
        const routes: RouteMap = {
            '/': this.handleHomeRoute,
            '/wishlist': this.handleWishlistRoute
        };

        const currentUrl = window.location.pathname;
        const routeHandler = routes[currentUrl];
        if (routeHandler) {
            routeHandler();
        }
    }
}


