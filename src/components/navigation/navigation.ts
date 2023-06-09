import template from './navigation.html';

export class Navigation {
  public render (className: string): void {
    const navigation = document.createElement('div');
    navigation.classList.add('navigation');
    navigation.insertAdjacentHTML('beforeend', template);
    const divContent = document.querySelector('.' + className);
    if (divContent != null) {
      divContent.appendChild(navigation);
    } else {
      const root = document.querySelector('#content');
      const divContainer = document.createElement('div');
      const divGrid = document.createElement('div');

      divContainer.classList.add(className);
      divGrid.classList.add('gridProducts');

      divGrid.appendChild(navigation);
      divContainer.appendChild(divGrid);
      root?.appendChild(divContainer);
    }

    const url = window.location.pathname;
    if (url === '/wishlist') {
      this.navigationWishlist();
    }
  }
  
  public navigationWishlist (): void {
    const textNavigation = document.querySelector('.navigation__text');
    if (textNavigation != null) {
      textNavigation.innerHTML = '';
      const homeLink = document.createElement('a');
      homeLink.href = '/';
      homeLink.textContent = 'Home';
      textNavigation?.appendChild(homeLink);
      const textWishlist = document.createTextNode(' > Lista de desejos');
      textNavigation?.appendChild(textWishlist);
    }
  }
}
