import template from './navigation.html';

// Classe do componente
export class Navigation {
  constructor() {}

  render(divClass: string) {
    const navigation = document.createElement('div');
    navigation.classList.add('navigation'); 
    navigation.insertAdjacentHTML('beforeend', template);
    var divContent = document.querySelector('.' + divClass);
    if(divContent!=null)
      divContent.appendChild(navigation);
  }
}
