// Importando o arquivo HTML usando import
import template from './navbar.html';

// Classe do componente
export class Navbar {
  // Construtor
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
