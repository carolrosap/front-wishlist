import { GridProducts } from './grid-products';
import axios from 'axios';

describe('GridProducts', () => {
  let gridProducts: GridProducts;

  beforeEach(() => {
    gridProducts = new GridProducts();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getProductsApi', () => {
    it('should fetch products from the API', async () => {
      const products = await gridProducts.getProductsApi();
      expect(products).toBeDefined();
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('GridProducts', () => {
    let gridProducts: GridProducts;

    beforeEach(() => {
      gridProducts = new GridProducts();
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should return wishlist products according to wishlist storage', async () => {
      localStorage.setItem('wishlist', JSON.stringify(['1', '2', '3']));

      const mockApiResponse = {
        data: {
          products: [
            { id: 1, title: 'Product 1', price: 100, image: 'image-1.jpg' },
            { id: 2, title: 'Product 2', price: 200, image: 'image-2.jpg' },
            { id: 3, title: 'Product 3', price: 300, image: 'image-3.jpg' },
            { id: 4, title: 'Product 4', price: 400, image: 'image-4.jpg' }
          ]
        }
      };
      (jest.spyOn(axios, 'get') as any).mockResolvedValueOnce(mockApiResponse);

      const wishlistProducts = await gridProducts.getProductsWishList();

      expect(wishlistProducts).toEqual([
        { id: 1, title: 'Product 1', price: 100, image: 'image-1.jpg' },
        { id: 2, title: 'Product 2', price: 200, image: 'image-2.jpg' },
        { id: 3, title: 'Product 3', price: 300, image: 'image-3.jpg' }
      ]);
    });
  });




  // Add more tests here for other methods
});
