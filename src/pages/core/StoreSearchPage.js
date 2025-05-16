import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getlistStores } from '../../data/stores';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import MainLayout from '../../components/layout/MainLayout';
import StoreCard from '../../components/card/StoreCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import StoreFilter from '../../components/filter/StoreFilter';

const StoreSearchPage = (props) => {
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const keyword =
        new URLSearchParams(useLocation().search).get('keyword') || '';
    const [listStores, setListStores] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: keyword,
        sortBy: 'rating',
        sortMoreBy: 'point',
        isActive: 'true',
        order: 'desc',
        limit: 10,
        page: 1,
    });

    const init = () => {
        setError('');
        setIsLoading(true);
        try {
            const data = getlistStores(filter);
            setPagination({
                size: data.total,
                pageCurrent: filter.page,
                pageCount: Math.ceil(data.total / filter.limit)
            });
            setListStores(data.stores);
            setIsLoading(false);
        } catch (error) {
            setError('Error loading stores');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        init();
    }, [filter]);

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

    return (
        <MainLayout>
            <div className="position-relative">
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <div className="d-flex justify-content-between align-items-end">
                    <StoreFilter filter={filter} setFilter={setFilter} />
                    <span className="me-3 text-nowrap">
                        {pagination.size || 0} results
                    </span>
                </div>

                <div className="row mt-3">
                    {listStores &&
                        listStores.map((store, index) => (
                            <div
                                className="col-xl-2-5 col-md-3 col-sm-4 col-6 mb-4"
                                key={index}
                            >
                                <StoreCard store={store} />
                            </div>
                        ))}
                </div>

                {pagination.size != 0 && (
                    <Pagination
                        pagination={pagination}
                        onChangePage={handleChangePage}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default StoreSearchPage;
