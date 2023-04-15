// Importando o arquivo HTML usando import
import { Navigation } from '../navigation/navigation';
import template from './grid-products.html';
import axios from "axios";
import { WishlistManager } from "../wishlist-manager";

export class GridProducts {
  public wishlistManager = new WishlistManager();
  constructor() { }

  async render() {
    const element = document.createElement('div');
    element.classList.add('container-fluid');
    element.insertAdjacentHTML('beforeend', template);

    var content = document.querySelector('#content');
    content?.appendChild(element);

    const navigation = new Navigation();
    navigation.render('gridProducts');

    await this.renderGrid()
  }

  public async getProducts() {
    try {
      const response = await axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
      const products = response.data.products
      console.log(products)
      return products
    } catch (error) {
      console.log('error reading data from API')
    }
  }

  public async renderGrid() {
    var products = await this.getProducts()
    var gridProducts = document.querySelector('.gridProducts');

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
      infos.classList.add('gridProducts__card--infos')
      favorite.classList.add('gridProducts__card--favorite');
      icon.classList.add('gridProducts__card--icon');
      img.classList.add('product-img');
      divImage.classList.add('gridProducts__card--image');
      description.classList.add('gridProducts__card--description');
      price.classList.add('gridProducts__card--price');

      //adicionar depois função para validar qual ícone é
      icon.src = this.wishlistManager.validateFavIcon(item.id);
      favorite.setAttribute('data-id', item.id);
      favorite.appendChild(icon);
      
      img.src = item.image;
      divImage.appendChild(img);

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
      favorite.addEventListener('click', (event) => this.wishlistManager.clickWishlist(favorite));
      gridProducts?.appendChild(card);

    });

  }
}
