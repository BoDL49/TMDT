import { useState, useEffect } from 'react';
import { listCategories, getCategoriesByParent } from '../../data/categories';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import CategoryCard from '../card/CategoryCard';

const ListCategories = ({
    heading = 'Discover',
    categoryId = null,
    col = 'col-xl-2-5 col-md-3 col-sm-4 col-6',
    limit = '5',
    hasBreadcrumb = false
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    const init = () => {
        setError('');
        setIsLoading(true);
        try {
            let data;
            if (categoryId) {
                // Get subcategories of the current category
                data = getCategoriesByParent(categoryId);
            } else {
                // Get root categories
                const result = listCategories();
                if (result.success) {
                    data = result.categories.filter(cat => !cat.categoryId);
                } else {
                    throw new Error(result.error);
                }
            }
            setCategories(data.slice(0, limit));
            setIsLoading(false);
        } catch (error) {
            setError('Error loading categories');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        init();
    }, [categoryId]);

    if (categories.length === 0 && !isloading && !error) {
        return null;
    }

    return (
        <div className="position-relative">
            {heading && <h4>{heading}</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="row mt-3">
                {categories &&
                    categories.map((category, index) => (
                        <div className={`${col} mb-4`} key={index}>
                            <CategoryCard 
                                category={category} 
                                showParent={hasBreadcrumb}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListCategories;
