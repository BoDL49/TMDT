import { useState } from 'react';
import SearchInput from '../ui/SearchInput';
import SortByButton from '../table/sub/SortByButton';

const UserFilter = ({ filter, setFilter }) => {
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

    return (
        <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center me-3">
                <SearchInput onChange={handleChangeKeyword} />
            </div>

            <div className="d-flex align-items-center">
                <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title="Point"
                    sortBy="point"
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />

                <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title="Followers"
                    sortBy="numFollowers"
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />

                <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title="Following"
                    sortBy="numFollowing"
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
            </div>
        </div>
    );
};

export default UserFilter; 