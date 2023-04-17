import { WishlistManager } from './wishlist-manager';

describe('Wishlist Manager Tests', () => {
  let wishlistManager: WishlistManager;

    beforeEach(() => {
    wishlistManager = new WishlistManager();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('clickWishlist method', () => {
    test('should add/remove product from wishlist', () => {
      localStorage.setItem('wishlist', JSON.stringify(['1', '2']));

      const card = document.createElement('div');
      card.setAttribute('data-id', '3');
      const cardImage = document.createElement('img');
      card.appendChild(cardImage);
      wishlistManager.clickWishlist(card);
            
      expect(localStorage.getItem('wishlist')).toEqual(JSON.stringify(['1', '2', '3']));

      // Chamar o método clickWishlist novamente para remover o produto da wishlist
      wishlistManager.clickWishlist(card);

      // Verificar se o local storage foi atualizado corretamente novamente
      expect(localStorage.getItem('wishlist')).toEqual(JSON.stringify(['1', '2']));
    });
  });

  describe('getLocalStorage method', () => {
    test('should return the wishlist products ids from local storage', () => {
      const wishlistData = ['1', '2', '3'];
      localStorage.setItem('wishlist', JSON.stringify(wishlistData));

      const wishlistManager = new WishlistManager();
      const wishlist = wishlistManager.getLocalStorage();

      expect(wishlist).toEqual(wishlistData);
    });

    test('getLocalStorage should return an empty array if wishlist is not found in local storage', () => {
      const wishlistManager = new WishlistManager();
      const wishlist = wishlistManager.getLocalStorage();
      expect(wishlist).toEqual([]);
    });
  });

  describe('validateFavIcon method', () => {
    it('should return the correct icon for a item that is in the wishlist', () => {
      localStorage.setItem('wishlist', JSON.stringify(['1', '2', '3']));
      const result = wishlistManager.validateFavIcon('2');
      expect(result).toEqual('assets/icons/bookmarkSelected.svg');
    });

    it('should return the correct icon for a item that is NOT in the wishlist', () => {
      localStorage.setItem('wishlist', JSON.stringify(['1', '2', '3']));
      const result = wishlistManager.validateFavIcon('4');
      expect(result).toEqual('assets/icons/bookmark.svg');
    });
  });

  describe('removeProductWishlist method', () => {
    test('should remove product id from wishlist in localStorage', () => {
      const wishlistIds = ['1', '2', '3'];
      localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
    
      wishlistManager.removeProductWishlist('2');
    
      expect(localStorage.getItem('wishlist')).toEqual(JSON.stringify(['1', '3']));
    });
    
    test('should not remove product id from the wishlist if id not found', () => {
      const wishlistIds = ['1', '2', '3'];
      localStorage.setItem('wishlist', JSON.stringify(wishlistIds));

      wishlistManager.removeProductWishlist('4');

      expect(localStorage.getItem('wishlist')).toEqual(JSON.stringify(['1', '2', '3']));
    });
  });
});
