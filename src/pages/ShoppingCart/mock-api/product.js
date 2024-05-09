import products from './product.json';
const fetchProducts = () => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });
    return promise;
};

export default fetchProducts;
