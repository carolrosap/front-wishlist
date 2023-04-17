import { GridProducts } from './grid-products/grid-products';

export class WishlistManager {
  public arrayCards: HTMLElement[];
  public key = 'wishlist';

  constructor () {
    const cards = document.getElementsByClassName('gridProducts__card--favorite');
    this.arrayCards = Array.from(cards) as HTMLElement[];
  }

  public clickWishlist (card: HTMLElement): void {
    const cardImage = card.childNodes[0] as HTMLImageElement;
    const id = card.getAttribute('data-id');
    let jsonWishlist: string;
    const wishlist = this.getLocalStorage();
    if (wishlist.includes(id) === true) {
      cardImage.src = 'assets/icons/bookmark.svg';
      this.removeProductWishlist(id);
    } else {
      cardImage.src = 'assets/icons/bookmarkSelected.svg';
      wishlist.push(id);
      jsonWishlist = JSON.stringify(wishlist);
      localStorage.setItem(this.key, jsonWishlist);
    }
  }

  public getLocalStorage (): any {
    const wishlist = JSON.parse(localStorage.getItem(this.key) ?? '[]');
    return wishlist;
  }

  public validateFavIcon (id: any): string {
    const wishlist = this.getLocalStorage();
    const icon = wishlist.includes(id.toString()) === true ? 'assets/icons/bookmarkSelected.svg' : 'assets/icons/bookmark.svg';
    return icon;
  }

  public removeProductWishlist (id: any): void {
    const wishlist = this.getLocalStorage();
    const newWishlist = wishlist.filter((item: string | null) => item !== id.toString());
    const jsonWishlist = JSON.stringify(newWishlist);
    localStorage.setItem(this.key, jsonWishlist);
  }

  public async clickRemoveWishlist (id: any): Promise<void> {
    this.removeProductWishlist(id);
    const grid = new GridProducts();
    await grid.renderAfterExclude();
  }
}