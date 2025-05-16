import { useParams } from 'react-router-dom';
import { getStore } from '../../data/stores';
import StoreLayout from '../../components/layout/StoreLayout';
import MainLayout from '../../components/layout/MainLayout';
import Error from '../../components/ui/Error';
import ListReviews from '../../components/list/ListReviews';

const ReviewAndRatingPage = () => {
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

    return (
        <StoreLayout store={store}>
            <div style={{ maxWidth: '990px', margin: '0 auto' }}>
                <div className="mt-4">
                    <ListReviews storeId={store._id} heading={false} />
                </div>
            </div>
        </StoreLayout>
    );
};

export default ReviewAndRatingPage;
