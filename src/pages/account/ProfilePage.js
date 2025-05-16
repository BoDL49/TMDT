import { Link } from 'react-router-dom';
import AccountLayout from '../../components/layout/AccountLayout';
import UserLevelInfo from '../../components/info/UserLevelInfo';
import UserProfileInfo from '../../components/info/UserProfileInfo';
import UserJoinedInfo from '../../components/info/UserJoinedInfo';
import Cover from '../../components/image/Cover';
import Avatar from '../../components/image/Avatar';

const ProfilePage = (props) => {
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

    return (
        <AccountLayout user={user}>
            <div className="res-mx--12-md">
                <div className="position-relative px-2">
                    <Cover
                        cover={user.cover}
                        alt={user.firstname + ' ' + user.lastname}
                        isEditable="user"
                    />
                    <div className="avatar-absolute avatar-absolute--store">
                        <Avatar
                            avatar={user.avatar}
                            name={user.firstname + ' ' + user.lastname}
                            alt={user.firstname + ' ' + user.lastname}
                            bodername={true}
                            isEditable="user"
                        />
                    </div>
                    <div className="level-group-absolute level-group-absolute--small res-hide">
                        <UserLevelInfo user={user} />
                    </div>
                </div>

                <div className="d-flex justify-content-end m-2 mb-3">
                    <Link
                        className="btn btn-outline-primary ripple btn-sm"
                        to={`/user/${user._id}`}
                        target="_blank"
                    >
                        <span className="me-2 res-hide">Visit Your Page</span>
                        <i className="fas fa-external-link-alt"></i>
                    </Link>
                </div>

                <div className="mt-1 d-none res-dis">
                    <UserLevelInfo user={user} border={false} />
                </div>

                <div className="mt-1">
                    <UserProfileInfo user={user} isEditable={true} />
                </div>

                <div className="mt-1">
                    <UserJoinedInfo user={user} />
                </div>
            </div>
        </AccountLayout>
    );
};

export default ProfilePage;
