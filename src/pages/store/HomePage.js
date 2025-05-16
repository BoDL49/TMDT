import { useParams } from 'react-router-dom';
import { getStore } from '../../data/stores';
import StoreLayout from '../../components/layout/StoreLayout';
import Carousel from '../../components/image/Carousel';
import ListProductsByStore from '../../components/list/ListProductsByStore';
import Error from '../../components/ui/Error';
import MainLayout from '../../components/layout/MainLayout';

const HomePage = () => {
    const { storeId } = useParams();
    const { success, store, error } = getStore(storeId);

    if (!success) {
        return (
            <MainLayout>
                <Error msg={error || "Store not found!"} />
            </MainLayout>
        );
    }

    if (!store.isActive) {
        return (
            <MainLayout>
                <Error msg="This store is banned by GoodDeal!" />
            </MainLayout>
        );
    }

    // Sample featured images for the store
    const featuredImages = [
        store.image,
        "/images/appleStore.png",
        "/images/appleStore.png",
        "/images/appleStore.png",
    ];

    return (
        <StoreLayout store={store}>
            <div className="store-home-page">
                <div className="mb-4">
                    <Carousel
                        listImages={featuredImages}
                        alt={store.name}
                    />
                </div>

                <div className="mb-4">
                    <ListProductsByStore storeId={store._id} />
                </div>

                <div className="mb-4">
                    <ListProductsByStore
                        heading="New products"
                        storeId={store._id}
                        sortBy="createdAt"
                    />
                </div>
            </div>
        </StoreLayout>
    );
};

export default HomePage;
