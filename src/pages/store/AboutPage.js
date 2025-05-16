import { useParams } from 'react-router-dom';
import { getStore } from '../../data/stores';
import StoreLayout from '../../components/layout/StoreLayout';
import StoreProfileInfo from '../../components/info/StoreProfileInfo';
import StoreJoinedInfo from '../../components/info/StoreJoinedInfo';
import StoreLevelInfo from '../../components/info/StoreLevelInfo';
import MainLayout from '../../components/layout/MainLayout';
import Error from '../../components/ui/Error';

const AboutPage = () => {
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
                <div className="mb-1 d-none res-dis">
                    <StoreLevelInfo store={store} border={false} />
                </div>
                <div className="mb-1">
                    <StoreProfileInfo store={store} />
                </div>

                <div className="mb-1">
                    <StoreJoinedInfo store={store} />
                </div>
            </div>
        </StoreLayout>
    );
};

export default AboutPage;
