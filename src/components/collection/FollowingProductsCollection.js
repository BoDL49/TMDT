import { useState } from 'react';
import ProductCard from '../card/ProductCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Pagination from '../ui/Pagination';
import { products } from '../../data/products';
import { getStore } from '../../data/stores';

const FollowingProductsCollection = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    // Get following products from products.js
    const listProducts = products.slice(0, 4).map(product => ({
        ...product,
        store: getStore(product.storeId).store,
        isLiked: true,
        discount: Math.round((product.price - product.promotionalPrice) / product.price * 100)
    }));

    const pagination = {
        size: listProducts.length,
        pageCurrent: 1,
        pageCount: 1
    };

    const handleChangePage = (newPage) => {
        // Since we're using hardcoded data, this is just a placeholder
        console.log('Page changed to:', newPage);
    };

    return (
        <div className="position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <h4>Following products</h4>
                <span className="me-2 text-nowrap res-hide">
                    {pagination.size || 0} results
                </span>
            </div>

            <div className="container-fluid p-0 mt-3">
                <div className="row">
                    {listProducts &&
                        listProducts.map((product, index) => (
                            <div
                                className="col-lg-3 col-sm-4 col-6 mb-4"
                                key={index}
                            >
                                <ProductCard
                                    product={product}
                                    onRun={() => setRun(!run)}
                                />
                            </div>
                        ))}
                </div>
            </div>

            {pagination.size != 0 && (
                <Pagination
                    pagination={pagination}
                    onChangePage={handleChangePage}
                />
            )}
        </div>
    );
};

export default FollowingProductsCollection;
