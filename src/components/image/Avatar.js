import UserAvatarUpload from './uploadButton/UserAvatarUpload';
import StoreAvatarUpload from './uploadButton/StoreAvatarUpload';
import ProductUpload from './uploadButton/ProductUpload';

const IMG = process.env.REACT_APP_STATIC_URL;

const Avatar = ({
    storeId = '',
    productId = '',
    productIndex = '',
    avatar = '/images/samsungStore.jpg',
    name = '',
    alt = 'avatar',
    bodername = false,
    isEditable = false,
    size = '',
    noRadius = false,
    onRun,
}) => (
    <div className="cus-avatar-wrap">
        <div className={`cus-avatar-box ${size && 'cus-avatar-box--small'}`}>
            <div className="cus-avatar">
                <img
                    src={`${avatar}`}
                    className="cus-avatar-img"
                    style={{ borderRadius: `${noRadius && 'unset'}` }}
                    alt={alt}
                />
                {isEditable == 'user' && <UserAvatarUpload />}
                {isEditable == 'store' && (
                    <StoreAvatarUpload storeId={storeId} />
                )}
                {isEditable == 'product' && (
                    <ProductUpload
                        productId={productId}
                        index={productIndex}
                        storeId={storeId}
                        onRun={onRun}
                    />
                )}
            </div>
        </div>

        {size != 'small' && (
            <h1
                className={`cus-avatar-name m-0 p-1 rounded d-inline-block fs-5 ${
                    bodername && 'bg-body shadow'
                }`}
            >
                {name}
            </h1>
        )}
    </div>
);

export default Avatar;
