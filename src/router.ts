import { GridProducts } from "./components/grid-products/grid-products";
import { Navbar } from "./components/navbar/navbar";

export class Router {
    private routes: Map<string, () => void> = new Map();

    constructor() {
        this.routes.set('/', this.showHome);
        this.routes.set('/wishlist', this.showWishlist);
        window.addEventListener('popstate', this.handlePopstate.bind(this));
    }

    private handlePopstate(event: PopStateEvent) {
        // Quando o evento de popstate é acionado, atualize a URL e mostre o componente correspondente
        const url = window.location.pathname;
        this.navigate(url);
    }

    public navigate(url: string) {
        // Atualize a URL do navegador
        window.history.pushState(null, '', url);

        // Encontre o componente correspondente com base na URL
        const routeHandler = this.routes.get(url);
        if (routeHandler) {
            // Limpe o conteúdo atual do DOM
            const root = document.getElementById('content');
            if (root) {
                root.innerHTML = '';

                // Renderize o componente correspondente e adicione-o ao DOM
                routeHandler();
            }
        }
    }

    private showHome() {
        // Lógica para mostrar o componente da página inicial
        const navbar = new Navbar();
        navbar.render();

        const gridComponents = new GridProducts();
        gridComponents.render();
    }

    private showWishlist() {
        // Lógica para mostrar o componente da página de detalhes
        const navbar = new Navbar();
        navbar.render();
    }
}


