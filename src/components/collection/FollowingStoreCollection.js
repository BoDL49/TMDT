import { useState } from 'react';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import StoreCard from '../card/StoreCard';
import Pagination from '../ui/Pagination';
import { stores } from '../../data/stores';

const FollowingStoresCollection = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    // Get following stores from stores.js
    const listStores = stores.slice(0, 4).map(store => ({
        ...store,
        isOpen: true,
        isLiked: true,
        level: {
            name: store.point >= 900 ? 'Gold' : 'Silver',
            point: store.point
        },
        avatar: store.image,
        cover: store.image,
        productCount: Math.floor(Math.random() * 200) + 100 // Random number between 100-300
    }));

    const pagination = {
        size: listStores.length,
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
                <h4>Following stores</h4>
                <span className="me-2 text-nowrap res-hide">
                    {pagination.size || 0} results
                </span>
            </div>

            <div className="container-fluid p-0 mt-3">
                <div className="row">
                    {listStores &&
                        listStores.map((store, index) => (
                            <div
                                className="col-lg-3 col-sm-4 col-6 mb-4"
                                key={index}
                            >
                                <StoreCard
                                    store={store}
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

export default FollowingStoresCollection;
