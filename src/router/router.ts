import { GridProducts } from '../components/grid-products/grid-products';
import { Navbar } from '../components/navbar/navbar';

type RouteHandler = () => void;
type RouteMap = Record<string, RouteHandler>;

export class Router {
  public handleHomeRoute (): void {
    const navbar = new Navbar();
    navbar.render();

    const gridComponents = new GridProducts();
    void gridComponents.render('home');
  }

  public handleWishlistRoute (): void {
    const navbar = new Navbar();
    navbar.render();
    const gridComponents = new GridProducts();
    void gridComponents.render('wishlist');
  }

  public configureRoutes (): void {
    const routes: RouteMap = {
      '/': this.handleHomeRoute,
      '/wishlist': this.handleWishlistRoute
    };

    const currentUrl = window.location.pathname;
    const routeHandler = routes[currentUrl];
    if (routeHandler !== null) {
      routeHandler();
    }
  }
}


