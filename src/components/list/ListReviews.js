import { useState, useEffect } from 'react';
import { getReviewsByProduct } from '../../data/reviews';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Pagination from '../ui/Pagination';
import ReviewInfo from '../info/ReviewInfo';
import StarRating from '../label/StarRating';

const ListReviews = ({
    productId = '',
    storeId = '',
    userId = '',
    heading = 'Reviews & Rating',
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(true);

    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        productId,
        storeId,
        userId,
        rating: '',
        sortBy: 'rating',
        order: 'desc',
        limit: 6,
        page: 1,
    });

    const init = () => {
        setError('');
        setIsLoading(true);
        try {
            let data = getReviewsByProduct(filter.productId);
            
            // Filter by rating
            if (filter.rating) {
                data = data.filter(review => review.rating === filter.rating);
            }
            
            // Sort
            if (filter.sortBy) {
                data.sort((a, b) => {
                    if (filter.order === 'desc') {
                        return b[filter.sortBy] - a[filter.sortBy];
                    }
                    return a[filter.sortBy] - b[filter.sortBy];
                });
            }
            
            // Pagination
            const page = filter.page || 1;
            const limit = filter.limit || 6;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            
            setReviews(data.slice(startIndex, endIndex));
            setPagination({
                size: data.length,
                pageCurrent: page,
                pageCount: Math.ceil(data.length / limit),
            });
            setIsLoading(false);
        } catch (error) {
            setError('Error loading reviews');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!filter.productId && !filter.storeId) return;
        init();
    }, [filter, run]);

    useEffect(() => {
        setFilter({
            ...filter,
            productId,
            storeId,
            userId,
        });
    }, [productId, storeId, userId]);

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    const renderFilterRating = () => {
        const render = [];
        for (let i = 0; i <= 5; i++)
            render.push(
                <div
                    key={i}
                    className="form-check me-3 d-flex justify-content-start align-items-center"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        id={`rating${i}`}
                        defaultChecked={
                            i !== 0 ? filter.rating === i : filter.rating === ''
                        }
                        onClick={() => {
                            if (i === 0)
                                setFilter({
                                    ...filter,
                                    rating: '',
                                });
                            else
                                setFilter({
                                    ...filter,
                                    rating: i,
                                });
                        }}
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                    <label
                        className="form-check-label ms-1"
                        htmlFor={`rating${i}`}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        {i === 0 ? (
                            <span>All</span>
                        ) : (
                            <small>
                                <StarRating stars={i} />
                            </small>
                        )}
                    </label>
                </div>,
            );
        return render;
    };

    return (
        <div className="container-fluid position-relative">
            {heading && <h4 className="mb-3">{heading}</h4>}

            {isLoading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex flex-wrap justify-content-start align-items-center">
                    {renderFilterRating()}
                </div>
                <span className="me-2 text-nowrap">
                    {pagination.size || 0} results
                </span>
            </div>

            <div className="row mt-2">
                {reviews &&
                    reviews.map((review, index) => (
                        <div className="col-12 mb-2" key={index}>
                            <ReviewInfo
                                review={review}
                                about={!!storeId}
                                onRun={() => setRun(!run)}
                            />
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
    );
};

export default ListReviews;
