import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStore } from '../../actions/store';
import { getToken } from '../../apis/auth';
import { getStore } from '../../apis/store';
import { getStoreLevel } from '../../apis/level';
import { countOrder } from '../../apis/order';
import { getNumberOfFollowers, checkFollowingStore } from '../../apis/follow';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import { stores } from '../../data/stores';

const IMG = process.env.REACT_APP_STATIC_URL;

const StoreInit = ({ store, actions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { _id, accessToken } = getToken();
    const { storeId } = useParams();

    // Get mock store data
    const mockStore = stores.find(s => s._id === storeId) || {
        _id: storeId,
        name: 'Apple Store',
        image: '/images/appleStore.png',
        rating: 4.8,
        point: 1000,
        numReviews: 500,
        isActive: true,
        address: '123 Apple Street, Cupertino, CA',
        phone: '+1 (800) MY-APPLE',
        email: 'support@apple.com',
        website: 'www.apple.com',
        openingHours: '9:00 AM - 9:00 PM',
        categories: ['Electronics', 'Smartphones', 'Laptops'],
        featured: true,
        followers: 1000000,
        joinedDate: '2020-01-01'
    };

    const init = () => {
        setIsLoading(true);
        setError('');
        
        // Use mock data instead of API call
        const newStore = {
            ...mockStore,
            level: {
                name: mockStore.point >= 900 ? 'Gold' : 'Silver',
                point: mockStore.point
            },
            numberOfFollowers: mockStore.followers,
            isFollowing: true,
            numberOfSucessfulOrders: Math.floor(Math.random() * 1000) + 100,
            numberOfFailedOrders: Math.floor(Math.random() * 100) + 1
        };

        actions(newStore);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!store || store._id != storeId) init();
    }, [storeId]);

    return isLoading ? (
        <div className="cus-position-relative-loading">
            <Loading size="small" />
        </div>
    ) : (
        <div
            type="button"
            className="your-shop-card btn btn-outline-light cus-outline ripple"
        >
            <img src={mockStore.image || '/images/avt.png'} className="your-shop-img" />
            <span className="your-shop-name tetx noselect">
                {mockStore.name}
                {error && <Error msg={error} />}
            </span>
        </div>
    );
};

function mapStateToProps(state) {
    return { store: state.store.store };
}

function mapDispatchToProps(dispatch) {
    return { actions: (store) => dispatch(addStore(store)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInit);
