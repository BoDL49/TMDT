import { useState, useEffect } from 'react';
import { listActiveProducts } from '../../data/products';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ProductCard from '../card/ProductCard';

const ListBestSellerProducts = ({
    heading = 'Best Seller',
    col = 'col-xl-2-5 col-md-3 col-sm-4 col-6',
    categoryId = '',
    limit = '5',
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);

    const init = () => {
        setError('');
        setIsLoading(true);
        try {
            const data = listActiveProducts({
                search: '',
                rating: '',
                categoryId,
                minPrice: '',
                maxPrice: '',
                sortBy: 'rating',
                order: 'desc',
                limit,
                page: 1,
            });
            setProducts(data.products);
            setIsLoading(false);
        } catch (error) {
            setError('Error loading products');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        init();
    }, [categoryId]);

    return (
        <div className="position-relative">
            {heading && <h4>{heading}</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="row mt-3">
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

export default ListBestSellerProducts;
