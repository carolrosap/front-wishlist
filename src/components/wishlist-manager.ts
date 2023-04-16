import { GridProducts } from "./grid-products/grid-products";

export class WishlistManager {
    public arrayCards: HTMLElement[];
    public key = 'wishlist';
    constructor() {
        const cards = document.getElementsByClassName('gridProducts__card--favorite');
        this.arrayCards = Array.from(cards) as HTMLElement[];
    }

    clickWishlist(card: HTMLElement) {
        const cardImage = card.childNodes[0] as HTMLImageElement;
        const id = card.getAttribute('data-id');
        let jsonWishlist: string;
        let wishlist = this.getLocalStorage();
        if (!wishlist.includes(id)) {
            cardImage.src = 'assets/icons/bookmarkSelected.svg';
            wishlist.push(id);
            jsonWishlist = JSON.stringify(wishlist);
            localStorage.setItem(this.key, jsonWishlist);
        } else {
            cardImage.src = 'assets/icons/bookmark.svg';
            //const newWishlist = wishlist.filter((item: string | null) => item !== id);
            //jsonWishlist = JSON.stringify(newWishlist);
            this.removeProductWishlist(id)
        }
        
    }

    getLocalStorage () {
        let wishlist = JSON.parse(localStorage.getItem(this.key) ?? '[]');
        return wishlist;
    }

    validateFavIcon(id: any) {
        const wishlist = this.getLocalStorage();
        const icon = wishlist.includes(id.toString()) ? 'assets/icons/bookmarkSelected.svg' :  'assets/icons/bookmark.svg';
        return icon;

    }

    removeProductWishlist(id: any) {
        const wishlist = this.getLocalStorage();
        console.log(wishlist)
        const newWishlist = wishlist.filter((item: string | null) => item !== id.toString());
        const jsonWishlist = JSON.stringify(newWishlist);
        console.log(jsonWishlist);
        localStorage.setItem(this.key, jsonWishlist);
    }

    async clickRemoveWishlist (id: any) {
        this.removeProductWishlist(id);
        let grid = new GridProducts()
        await grid.renderAfterExclude();
    }
}

//export default WishlistManager;
