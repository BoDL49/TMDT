import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getStore, getlistStores } from '../../data/stores';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import ProductCard from '../../components/card/ProductCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import ProductFilter from '../../components/filter/ProductFilter';
import StoreLayout from '../../components/layout/StoreLayout';
import MainLayout from '../../components/layout/MainLayout';

const CollectionPage = () => {
    const { storeId } = useParams();
    const { success, store, error: storeError } = getStore(storeId);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';
    const [listProducts, setListProducts] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: keyword,
        rating: '',
        minPrice: 0,
        maxPrice: '',
        sortBy: 'sold',
        order: 'desc',
        categoryId: '',
        limit: 10,
        page: 1,
    });

    const init = () => {
        if (!success) {
            setError(storeError || "Store not found!");
            return;
        }

        setError('');
        setIsLoading(true);

        // Simulate API call with mock data
        setTimeout(() => {
            const { stores, total, pageCurrent, pageCount } = getlistStores({
                ...filter,
                storeId: store._id
            });

            setPagination({
                size: total,
                pageCurrent: pageCurrent,
                pageCount: pageCount,
            });
            setListProducts(stores);
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        init();
    }, [filter, store]);

    useUpdateEffect(() => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    }, [keyword]);

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    if (!success) {
        return (
            <MainLayout>
                <Error msg={storeError || "Store not found!"} />
            </MainLayout>
        );
    }

    if (!store.isActive) {
        return (
            <MainLayout>
                <Error msg="This store is banned by GoodDeal!" />
            </MainLayout>
        );
    }

    return (
        <StoreLayout store={store}>
            <div className="position-relative">
                {isLoading && <Loading />}
                {error && <Error msg={error} />}

                <div className="d-flex justify-content-between align-items-end">
                    <div className="">
                        <ProductFilter filter={filter} setFilter={setFilter} />
                    </div>
                    <span className="me-3">{pagination.size || 0} results</span>
                </div>

                <div className="row mt-3">
                    {listProducts &&
                        listProducts.map((product, index) => (
                            <div
                                className="col-xl-2-5 col-md-3 col-sm-4 col-6 mb-4"
                                key={index}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                </div>

                {pagination.size !== 0 && (
                    <Pagination
                        pagination={pagination}
                        onChangePage={handleChangePage}
                    />
                )}
            </div>
        </StoreLayout>
    );
};

export default CollectionPage;
