import useToggle from '../../hooks/useToggle';
import AccountLayout from '../../components/layout/AccountLayout';
import FollowingProductsCollection from '../../components/collection/FollowingProductsCollection';
import FollowingStoresCollection from '../../components/collection/FollowingStoreCollection';

const FollowingPage = (props) => {
    // Hardcoded user data
    const user = {
        _id: 'user123',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '0123456789',
        avatar: 'https://i.pravatar.cc/150?img=1',
        cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        level: {
            name: 'Silver',
            point: 750,
            nextLevel: 'Gold',
            nextPoint: 1000
        },
        joinedAt: '2024-01-01T00:00:00.000Z',
        address: {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            zipCode: '10001'
        },
        gender: 'male',
        birthday: '1990-01-01',
        bio: 'I am a passionate shopper and love finding great deals!'
    };

    const [flag, toggleFlag] = useToggle(true);

    return (
        <AccountLayout user={user}>
            <div className="d-flex align-items-center mb-2">
                <div className="position-relative d-inline-block me-2">
                    <button
                        type="button"
                        className={`btn ${
                            flag ? 'btn-pink' : 'btn-outline-pink'
                        } btn-lg ripple cus-tooltip`}
                        onClick={() => toggleFlag(true)}
                    >
                        <i className="fas fa-box"></i>
                    </button>

                    <small className="cus-tooltip-msg">
                        Following products
                    </small>
                </div>

                <div className="position-relative d-inline-block">
                    <button
                        type="button"
                        className={`btn ${
                            !flag ? 'btn-pink' : 'btn-outline-pink'
                        } btn-lg ripple cus-tooltip`}
                        onClick={() => toggleFlag(false)}
                    >
                        <i className="fas fa-store"></i>
                    </button>

                    <small className="cus-tooltip-msg">Following stores</small>
                </div>
            </div>

            {flag ? (
                <FollowingProductsCollection />
            ) : (
                <FollowingStoresCollection />
            )}
        </AccountLayout>
    );
};

export default FollowingPage;
