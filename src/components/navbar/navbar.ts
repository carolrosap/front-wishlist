import template from './navbar.html';
export class Navbar {
  public render (): void {
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');
    navbar.insertAdjacentHTML('beforeend', template);
    const divContent = document.querySelector('#content');

    if (divContent != null) {
      divContent.appendChild(navbar);
    }
  }
}
