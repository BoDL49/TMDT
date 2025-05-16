import UserLayout from '../../components/layout/UserLayout';
import { users } from '../../data/users';

const UserHomePage = () => {
    // Lấy user đầu tiên từ mock data
    const user = users[0];
    return (
        <UserLayout user={user}>
            <div className="text-center my-5">
                <h4 className="text-uppercase">
                    Hello
                    {user && user.name && (
                        <span>
                            , I'm {user.name}
                        </span>
                    )}
                    !
                </h4>
                <p>...</p>
            </div>
        </UserLayout>
    );
};

export default UserHomePage;
