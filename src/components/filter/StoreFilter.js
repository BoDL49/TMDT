import { useState } from 'react';
import SearchInput from '../ui/SearchInput';
import SortByButton from '../table/sub/SortByButton';

const StoreFilter = ({ filter, setFilter }) => {
    const [showFilter, setShowFilter] = useState(false);

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    };

    const handleSetSortBy = (order, sortBy) => {
        setFilter({
            ...filter,
            sortBy,
            order,
        });
    };

    const handleSetSortMoreBy = (order, sortMoreBy) => {
        setFilter({
            ...filter,
            sortMoreBy,
            order,
        });
    };

    return (
        <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center me-3">
                <SearchInput onChange={handleChangeKeyword} />
            </div>

            <div className="d-flex align-items-center">
                <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title="Rating"
                    sortBy="rating"
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />

                <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortMoreBy}
                    title="Point"
                    sortBy="point"
                    onSet={(order, sortMoreBy) =>
                        handleSetSortMoreBy(order, sortMoreBy)
                    }
                />
            </div>
        </div>
    );
};

export default StoreFilter; 