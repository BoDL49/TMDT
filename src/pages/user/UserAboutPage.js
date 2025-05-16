import UserLayout from '../../components/layout/UserLayout';
import UserProfileInfo from '../../components/info/UserProfileInfo';
import UserJoinedInfo from '../../components/info/UserJoinedInfo';
import UserLevelInfo from '../../components/info/UserLevelInfo';
import { users } from '../../data/users';

const UserAboutPage = () => {
    // Lấy user đầu tiên từ mock data
    const user = users[0];
    return (
        <UserLayout user={user}>
            <div style={{ maxWidth: '990px', margin: '0 auto' }}>
                <div className="mb-1 d-none res-dis">
                    <UserLevelInfo user={user} border={false} />
                </div>
                <div className="mb-1">
                    <UserProfileInfo user={user} />
                </div>
                <div className="">
                    <UserJoinedInfo user={user} />
                </div>
            </div>
        </UserLayout>
    );
};

export default UserAboutPage;
