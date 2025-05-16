import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById, getCategoriesByParent } from '../../data/categories';
import { products } from '../../data/products';
import MainLayout from '../../components/layout/MainLayout';
import ProductCard from '../../components/card/ProductCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import ProductFilter from '../../components/filter/ProductFilter';
import ListCategories from '../../components/list/ListCategories';

const CategoryPage = (props) => {
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const { categoryId } = useParams();

    const [category, setCategory] = useState({});
    const [subCategories, setSubCategories] = useState([]);

    const [listProducts, setListProducts] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        rating: '',
        categoryId,
        minPrice: '',
        maxPrice: '',
        sortBy: 'sold',
        order: 'desc',
        limit: 10,
        page: 1,
    });

    const getCategory = () => {
        const result = getCategoryById(categoryId);
        if (result.success) {
            setCategory(result.category);
            // Get subcategories
            const subs = getCategoriesByParent(categoryId);
            setSubCategories(subs);
        }
    };

    const init = () => {
        setError('');
        setIsLoading(true);
        try {
            // Filter products based on category and other filters
            let filteredProducts = products.filter(p => p.categoryId === categoryId);
            
            // Apply search filter
            if (filter.search) {
                filteredProducts = filteredProducts.filter(p => 
                    p.name.toLowerCase().includes(filter.search.toLowerCase())
                );
            }

            // Apply price filters
            if (filter.minPrice) {
                filteredProducts = filteredProducts.filter(p => p.price >= Number(filter.minPrice));
            }
            if (filter.maxPrice) {
                filteredProducts = filteredProducts.filter(p => p.price <= Number(filter.maxPrice));
            }

            // Apply sorting
            filteredProducts.sort((a, b) => {
                if (filter.sortBy === 'name') {
                    return filter.order === 'asc' 
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                } else if (filter.sortBy === 'price') {
                    return filter.order === 'asc'
                        ? a.price - b.price
                        : b.price - a.price;
                } else if (filter.sortBy === 'sold') {
                    return filter.order === 'asc'
                        ? a.sold - b.sold
                        : b.sold - a.sold;
                }
                return 0;
            });

            // Calculate pagination
            const startIndex = (filter.page - 1) * filter.limit;
            const endIndex = startIndex + filter.limit;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

            setPagination({
                size: filteredProducts.length,
                pageCurrent: filter.page,
                pageCount: Math.ceil(filteredProducts.length / filter.limit),
            });
            setListProducts(paginatedProducts);
        } catch (error) {
            setError('Error processing products');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        init();
    }, [filter]);

    useEffect(() => {
        getCategory();
        setFilter({
            ...filter,
            categoryId,
        });
    }, [categoryId]);

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

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {category.categoryId && category.categoryId.categoryId && (
                            <Link
                                to={`/category/${category.categoryId.categoryId._id}`}
                                className="breadcrumb-item"
                            >
                                {category.categoryId.categoryId.name}
                            </Link>
                        )}

                        {category.categoryId && (
                            <Link
                                to={`/category/${category.categoryId._id}`}
                                className="breadcrumb-item"
                            >
                                {category.categoryId.name}
                            </Link>
                        )}

                        {category && (
                            <Link
                                to={`/category/${category._id}`}
                                className="breadcrumb-item active"
                            >
                                {category.name}
                            </Link>
                        )}
                    </ol>
                </nav>

                <div className="mb-4">
                    <ListCategories
                        hasBreadcrumb={true}
                        categoryId={categoryId}
                        heading={false}
                    />
                </div>

                <div className="d-flex justify-content-between align-items-end">
                    <ProductFilter filter={filter} setFilter={setFilter} />
                    <span className="me-3 text-nowrap">
                        {pagination.size || 0} results
                    </span>
                </div>

                <div className="product-search-list row mt-3">
                    {listProducts &&
                        listProducts.map((product, index) => (
                            <div
                                className="col-xl-2-5 col-md-3 col-sm-4 col-6 mb-4"
                                key={index}
                            >
                                <ProductCard product={product} />
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

export default CategoryPage;
