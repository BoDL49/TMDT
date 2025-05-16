import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '../../data/auth';
import { getlistUsers } from '../../data/users';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import MainLayout from '../../components/layout/MainLayout';
import UserCard from '../../components/card/UserCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import UserFilter from '../../components/filter/UserFilter';

const UserSearchPage = (props) => {
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const keyword =
        new URLSearchParams(useLocation().search).get('keyword') || '';
    const [listUsers, setListUsers] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: keyword,
        sortBy: 'point',
        role: 'customer',
        order: 'desc',
        limit: 10,
        page: 1,
    });

    const init = () => {
        setError('');
        setIsLoading(true);
        try {
            const data = getlistUsers(filter);
            setPagination({
                size: data.total,
                pageCurrent: filter.page,
                pageCount: Math.ceil(data.total / filter.limit)
            });
            setListUsers(data.users);
            setIsLoading(false);
        } catch (error) {
            setError('Error loading users');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        init();
    }, [filter]);

    useUpdateEffect(() => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    }, [keyword]);

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    return (
        <MainLayout>
            <div className="position-relative">
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <div className="d-flex justify-content-between align-items-end">
                    <UserFilter filter={filter} setFilter={setFilter} />
                    <span className="me-3 text-nowrap">
                        {pagination.size || 0} results
                    </span>
                </div>

                <div className="row mt-3">
                    {listUsers &&
                        listUsers.map((user, index) => (
                            <div
                                className="col-xl-2-5 col-md-3 col-sm-4 col-6 mb-4"
                                key={index}
                            >
                                <UserCard
                                    user={user}
                                    hasFollowBtn={getToken()}
                                />
                            </div>
                        ))}
                </div>

                {pagination.size != 0 && (
                    <Pagination
                        pagination={pagination}
                        onChangePage={handleChangePage}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default UserSearchPage;
