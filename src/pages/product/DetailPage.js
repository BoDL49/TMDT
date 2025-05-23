import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { getProduct } from '../../data/products';
import {
    getNumberOfFollowersForProduct,
    checkFollowingProduct,
} from '../../data/follows';
import { formatPrice } from '../../helper/formatPrice';
import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import Carousel from '../../components/image/Carousel';
import StarRating from '../../components/label/StarRating';
import FollowProductButton from '../../components/button/FollowProductButton';
import AddToCartForm from '../../components/item/form/AddToCartForm';
import Paragraph from '../../components/ui/Paragraph';
import CategorySmallCard from '../../components/card/CategorySmallCard';
import StoreSmallCard from '../../components/card/StoreSmallCard';
import ListBestSellerProducts from '../../components/list/ListBestSellerProduct';
import ListProductsByStore from '../../components/list/ListProductsByStore';
import SigninButton from '../../components/item/SigninItem';
import ListReviews from '../../components/list/ListReviews';

const DetailPage = () => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [product, setProduct] = useState({});
    const { productId } = useParams();

    const init = () => {
        setError('');
        setIsLoading(true);
        try {
            const data = getProduct(productId);
            if (!data) {
                setError('Product not found');
                setIsLoading(false);
                return;
            }

            const newProduct = data;
            //get count followers
            try {
                const res = getNumberOfFollowersForProduct(newProduct._id);
                newProduct.numberOfFollowers = res.count;
            } catch {
                newProduct.numberOfFollowers = 0;
            }

            //check follow
            try {
                const { _id, accessToken } = getToken();
                const res = checkFollowingProduct(_id, accessToken, newProduct._id);
                newProduct.isFollowing = res.success;
            } catch {
                newProduct.isFollowing = false;
            }

            setProduct(newProduct);
            setIsLoading(false);
        } catch (error) {
            setError('Error loading product');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        init();
    }, [productId]);

    return (
        <MainLayout>
            <div className="position-relative">
                {isloading && <Loading />}
                {error ? (
                    <Error msg={error} />
                ) : (
                    <div className="conatiner-fluid">
                        <div className="row">
                            <div className="col-md-8 mb-4">
                                <Carousel
                                    listImages={product.images}
                                    alt={product.name}
                                    style={{
                                        paddingBottom: 'calc(2/3*100%)',
                                    }}
                                />
                            </div>

                            <div className="col-md-4 mb-4">
                                <StarRating stars={product.rating} />
                                <h1 className="fs-4">{product.name}</h1>

                                <div className="d-flex flex-wrap justify-content-right align-items-center mt-3">
                                    <h2 className="text-primary fs-3 m-0 me-2">
                                        {product.promotionalPrice &&
                                            formatPrice(product.promotionalPrice)}{' '}
                                        VND
                                    </h2>

                                    <p className="text-decoration-line-through text-muted mt-1">
                                        {product.price &&
                                            formatPrice(product.price)}{' '}
                                        VND
                                    </p>
                                </div>

                                <div className="mt-4">
                                    {/* {product.storeId &&
                                        !product.storeId.isOpen && (
                                            <Error msg="This store is closed, can't order in this time!" />
                                        )} */}
                                    {product.stock <= 0 && (
                                        <Error msg="The product is sold out!" />
                                    )}

                                    {!getToken() && (
                                        <SigninButton
                                            className="w-100 btn-lg"
                                            title="Sign in to shop!"
                                        />
                                    )}

                                    {product.storeId &&
                                        product.storeId.isOpen &&
                                        product.stock > 0 &&
                                        getToken() &&
                                        getToken().role === 'user' && (
                                            <AddToCartForm product={product} />
                                        )}

                                    {getToken() && (
                                        <FollowProductButton
                                            productId={product._id}
                                            isFollowing={product.isFollowing}
                                            onRun={() =>
                                                setProduct({
                                                    ...product,
                                                    isFollowing:
                                                        !product.isFollowing,
                                                })
                                            }
                                            className="mt-2 w-100 btn-lg"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="container-fluid p-0">
                                    <div className="row res-flex-reverse-md">
                                        <div className="col-md-8 p-0">
                                            <ListReviews
                                                productId={product._id}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-5">
                                            <div className="mb-5">
                                                <CategorySmallCard
                                                    category={product.category}
                                                    parent={true}
                                                />
                                            </div>

                                            <Paragraph
                                                value={product.description}
                                                label="Description"
                                                multiLine={true}
                                            />

                                            <div className="mt-4 px-3 d-flex justify-content-right align-items-center">
                                                <h5 className="m-0">
                                                    Your seller:
                                                </h5>
                                                <span className="ms-2">
                                                    <StoreSmallCard
                                                        store={product.storeId}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                {product.category && (
                                    <div className="mt-4">
                                        <ListBestSellerProducts
                                            heading="Similar Products"
                                            categoryId={product.category._id}
                                        />
                                    </div>
                                )}

                                {product.storeId && (
                                    <div className="mt-4">
                                        <ListProductsByStore
                                            heading={`${
                                                product.storeId &&
                                                product.storeId.name
                                                    ? product.storeId.name
                                                    : 'Store'
                                            }'s Other Products`}
                                            storeId={product.storeId._id}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default DetailPage;
