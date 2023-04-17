import { Navigation } from '../navigation/navigation';
import template from './grid-products.html';
import axios from 'axios';
import { WishlistManager } from '../wishlist-manager';

export class GridProducts {
  public wishlistManager = new WishlistManager();
  
  public async getProductsApi (): Promise<any> {
    try {
      const response = await axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e');
      const products = response.data.products;
      return products;
    } catch (error) {
      console.log('error reading data from API');
    }
  }

  public async getProductsWishList (): Promise<any> {
    const productsApi = await this.getProductsApi();
    const listId = this.wishlistManager.getLocalStorage();
    const wishlistProducts = productsApi.filter((product: any) => listId.includes(product.id.toString()));
    return wishlistProducts;
  }

  async render (page: string): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('container-fluid');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    const navigation = new Navigation();
    navigation.render('gridProducts');

    await this.showGrid(page);
  }

  async renderAfterExclude (): Promise<void> {
    const container = document.querySelector('.container-fluid');
    const content = document.querySelector('#content');

    if ((container != null) && (content != null)) {
      content.removeChild(container);
    }
    const wishlist = this.wishlistManager.getLocalStorage();
    if (wishlist.length > 0) {
      await this.render('wishlist');
    } else {
      const navigation = new Navigation();
      navigation.render('container-fluid');
    }
  }

  public async showGrid (page: string): Promise<void> {
    let products: any;
    if (page === 'home') {
      products = await this.getProductsApi();
    } else if (page === 'wishlist') {
      products = await this.getProductsWishList();
    }

    await this.showCards(products, page);
  }

  public async showCards (products: any, page: string): Promise<void> {
    const gridProducts = document.querySelector('.gridProducts');
    products.forEach((item: any) => {
      const card = document.createElement('div');
      const favorite = document.createElement('div');
      const icon = document.createElement('img');

      const infos = document.createElement('div');
      const divImage = document.createElement('div');
      const img = document.createElement('img');
      const description = document.createElement('div');
      const price = document.createElement('div');

      card.classList.add('gridProducts__card');
      favorite.classList.add('gridProducts__card--favorite');
      favorite.setAttribute('data-id', item.id);
      infos.classList.add('gridProducts__card--infos');


      icon.classList.add('gridProducts__card--icon');

      if (page === 'home') {
        favorite.classList.add('bookmarkIcon');
        icon.src = this.wishlistManager.validateFavIcon(item.id);

        favorite.appendChild(icon);
        favorite.addEventListener('click', (event) => {
          this.wishlistManager.clickWishlist(favorite);
        });
      } else {
        infos.classList.add('wishList');
        favorite.classList.add('removeIcon');
        icon.src = 'assets/icons/x-circle.svg';
        favorite.appendChild(icon);
        // favorite.addEventListener('click', async (event) => {
        //   await this.wishlistManager.clickRemoveWishlist(item.id);
        // });
        favorite.addEventListener('click', (event) => {
          void (async () => {
            try {
              await this.wishlistManager.clickRemoveWishlist(item.id);
            } catch (error) {
              console.error('Error while removing item from the wishlist:', error);
            }
          })();
        });
      }

      divImage.classList.add('gridProducts__card--image');
      img.classList.add('product-img');
      img.src = item.image;
      divImage.appendChild(img);

      description.classList.add('gridProducts__card--description');
      price.classList.add('gridProducts__card--price');

      const titleItem = document.createElement('span');
      titleItem.textContent = item.title;
      description.appendChild(titleItem);

      const priceItem = document.createElement('span');
      priceItem.textContent = item.price;
      price.appendChild(priceItem);

      infos.appendChild(divImage);
      infos.appendChild(description);
      infos.appendChild(price);

      card.appendChild(favorite);
      card.appendChild(infos);

      gridProducts?.appendChild(card);
    });
  }
}
