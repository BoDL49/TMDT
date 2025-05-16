import Paragraph from '../ui/Paragraph';
import { humanReadableDate } from '../../helper/humanReadable';

const StoreJoinedInfo = ({ store = {} }) => (
    <div className="container-fluid">
        <div className="row py-2 border border-primary rounded-3">
            <div className="col-12">
                <Paragraph
                    label="Joined"
                    value={store.joinedDate ? humanReadableDate(store.joinedDate) : '-'}
                />
            </div>
            <div className="col-12">
                <Paragraph
                    label="Address"
                    value={store.address || '-'}
                />
            </div>
            <div className="col-12">
                <Paragraph
                    label="Email"
                    value={store.email || '-'}
                />
            </div>
            <div className="col-12">
                <Paragraph
                    label="Phone"
                    value={store.phone || '-'}
                />
            </div>
            <div className="col-12">
                <Paragraph
                    label="Website"
                    value={store.website || '-'}
                />
            </div>
        </div>
    </div>
);

export default StoreJoinedInfo;
