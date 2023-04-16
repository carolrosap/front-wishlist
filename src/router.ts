// src/routes.ts
type RouteHandler = () => void;

// Tipo do objeto de rotas
type RouteMap = {
    [url: string]: RouteHandler;
};
import { GridProducts } from "./components/grid-products/grid-products";
import { Navbar } from "./components/navbar/navbar";


export class Router {

    public handleHomeRoute(): void {
        console.log('Rota / foi acessada!');
        const navbar = new Navbar();
        navbar.render();

        const gridComponents = new GridProducts();
        gridComponents.render('home');
    }

    public handleWishlistRoute(): void {
        console.log('Rota /wishlist foi acessada!');
        const navbar = new Navbar();
        navbar.render();
        const gridComponents = new GridProducts();
        gridComponents.render('wishlist');
    }

    public configureRoutes(): void {
        // Mapeia as rotas e suas respectivas funções de manipulação
        const routes: RouteMap = {
            '/': this.handleHomeRoute,
            '/wishlist': this.handleWishlistRoute
        };

        // Verifica a URL atual e chama a função de manipulação de rota apropriada
        const currentUrl = window.location.pathname;
        const routeHandler = routes[currentUrl];
        if (routeHandler) {
            routeHandler();
        }
    }
}


