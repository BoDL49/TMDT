import { Link } from 'react-router-dom';
import StarRating from '../label/StarRating';

const StoreCard = ({ store = {} }) => {
    return (
        <div className="card shadow border-0">
            <Link
                className="text-reset text-decoration-none"
                to={`/store/${store._id}`}
                title={store.name}
            >
                <div className="card-img-top cus-card-img-top">
                    <img
                        src={store.image}
                        className="cus-card-img"
                        alt={store.name}
                    />
                </div>
            </Link>

            <div className="card-body border-top border-secondary">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                        <span className="badge bg-primary me-2">
                            {store.followers.toLocaleString()} followers
                        </span>
                        {store.featured && (
                            <span className="badge bg-warning">Featured</span>
                        )}
                    </div>
                    <small className="text-muted">
                        Joined {new Date(store.joinedDate).toLocaleDateString()}
                    </small>
                </div>

                <StarRating stars={store.rating} />
                <small className="text-muted d-block mb-2">
                    {store.numReviews} reviews
                </small>

                <Link
                    className="text-reset text-decoration-none link-hover d-block"
                    to={`/store/${store._id}`}
                    title={store.name}
                >
                    <h6
                        className="card-title mb-1"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {store.name}
                    </h6>
                </Link>

                <p
                    className="card-text text-muted small mb-2"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {store.description}
                </p>

                <div className="d-flex flex-wrap gap-1">
                    {store.categories.map((category, index) => (
                        <span key={index} className="badge bg-secondary">
                            {category}
                        </span>
                    ))}
                </div>

                <div className="mt-2">
                    <small className="text-muted d-block">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {store.address}
                    </small>
                    <small className="text-muted d-block">
                        <i className="fas fa-clock me-1"></i>
                        {store.openingHours}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default StoreCard;
