import { useState, useEffect } from 'react';
import { listSellingProductsByStore } from '../../data/products';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ProductCard from '../card/ProductCard';

const ListProductsByStore = ({
    heading = 'Best seller',
    col = 'col-xl-2-5 col-md-3 col-sm-4 col-6',
    storeId = '',
    sortBy = 'sold',
    limit = '5',
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        setError('');
        setIsLoading(true);
        try {
            const data = listSellingProductsByStore(
                {
                    search: '',
                    rating: '',
                    categoryId: '',
                    minPrice: '',
                    maxPrice: '',
                    sortBy,
                    order: 'desc',
                    limit,
                    page: 1,
                },
                storeId,
            );
            setProducts(data.products);
        } catch (e) {
            setError('Server Error');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [storeId, sortBy]);

    return (
        <div className="products-list-wrap position-relative">
            {heading && <h4>{heading}</h4>}

            {isLoading && <Loading />}
            {error && <Error msg={error} />}

            <div className="products-list row mt-3">
                {products &&
                    products.map((product, index) => (
                        <div className={`${col} mb-4`} key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListProductsByStore;
