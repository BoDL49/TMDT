import Paragraph from '../ui/Paragraph';
import PhoneActiveButton from '../button/PhoneActiveButton';
import EmailActiveButton from '../button/EmailActiveButton';
import UserEditProfileItem from '../item/UserEditProfileItem';
import UserEditPasswordItem from '../item/UserEditPasswordItem';

const UserProfileInfo = ({ user = {}, isEditable = false }) => (
    <div className="container-fluid">
        <div className="row py-2 border border-primary rounded-3">
            <div className="col-sm-6">
                <Paragraph label="Name" value={user.name || '-'} />
            </div>
            <div className="col-sm-6">
                <Paragraph label="Email" value={user.email || '-'} />
            </div>
            <div className="col-sm-6">
                <Paragraph label="Role" value={user.role || '-'} />
            </div>
            <div className="col-sm-6">
                <Paragraph label="Point" value={user.point != null ? user.point : '-'} />
            </div>
            <div className="col-sm-6">
                <Paragraph label="Followers" value={user.numFollowers != null ? user.numFollowers : '-'} />
            </div>
            <div className="col-sm-6">
                <Paragraph label="Following" value={user.numFollowing != null ? user.numFollowing : '-'} />
            </div>

            {!isEditable ? (
                <div className="col-sm-6">
                    <Paragraph label="Email" value={user.email || '-'} />
                </div>
            ) : (
                <>
                    <div className="col-sm-6">
                        <Paragraph label="Email" value={user.email || '-'} />
                    </div>

                    <div className="col-sm-6 mt-2 ps-4">
                        <EmailActiveButton
                            email={user.email}
                            isEmailActive={user.isEmailActive}
                            googleId={user.googleId}
                            facebookId={user.facebookId}
                        />
                    </div>
                </>
            )}

            {!isEditable ? (
                <div className="col-sm-6">
                    <Paragraph label="Phone" value={user.phone || '-'} />
                </div>
            ) : (
                <>
                    <div className="col-sm-6">
                        <Paragraph label="Phone" value={user.phone || '-'} />
                    </div>

                    <div className="col-sm-6 mt-2">
                        <PhoneActiveButton
                            phone={user.phone}
                            isPhoneActive={user.isPhoneActive}
                        />
                    </div>
                </>
            )}

            <div className="col-sm-6">
                <Paragraph label="Id card" value={user.id_card || '-'} />
            </div>

            {isEditable && (
                <div className="col-12 d-flex justify-content-end">
                    <UserEditProfileItem user={user} />

                    {!user.googleId && !user.facebookId && (
                        <div className="ms-1">
                            <UserEditPasswordItem />
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
);

export default UserProfileInfo;
