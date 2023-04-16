import template from './navbar.html';

 export class Navbar {
    constructor() {}

  render() {
    const navbar = document.createElement('div');
    navbar.classList.add('navbar'); 
    navbar.insertAdjacentHTML('beforeend', template);
    var divContent = document.querySelector('#content');

    if(divContent!=null)
      divContent.appendChild(navbar);
  }
}
