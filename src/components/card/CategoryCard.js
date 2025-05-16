import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoriesByParent } from '../../data/categories';

const IMG = process.env.REACT_APP_STATIC_URL;

const CategoryCard = ({ category = {}, showParent = false }) => {
    const [categoryValue, setCategoryValue] = useState({});
    const [children, setChildren] = useState([]);

    const init = () => {
        setCategoryValue(category);
        // Get subcategories
        const subCategories = getCategoriesByParent(category._id);
        setChildren(subCategories);
    };

    useEffect(() => {
        init();
    }, [category]);

    return (
        <div className="card shadow border-0">
            <Link
                className="text-reset text-decoration-none"
                to={`/category/${categoryValue._id}`}
                title={categoryValue.name}
            >
                <div className="card-img-top cus-card-img-top">
                    <img
                        src={categoryValue.image}
                        className="cus-card-img"
                        alt={categoryValue.name}
                    />
                </div>
            </Link>

            <div className="card-body border-top border-secondary">
                {showParent && categoryValue.categoryId && (
                    <Link
                        className="text-reset link-hover d-block"
                        to={`/category/${categoryValue.categoryId._id}`}
                        title={categoryValue.categoryId.name}
                    >
                        <small className="text-muted">
                            {categoryValue.categoryId.name}
                        </small>
                    </Link>
                )}

                <Link
                    className="text-reset link-hover d-block mt-1"
                    to={`/category/${categoryValue._id}`}
                    title={categoryValue.name}
                >
                    <h6
                        className="card-title"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {categoryValue.name}
                    </h6>
                </Link>

                {children && children.length > 0 && (
                    <div
                        className="card-subtitle ms-2"
                        style={{ minHeight: '80px' }}
                    >
                        {children.map((child, index) => (
                            <Link
                                key={index}
                                className="text-reset link-hover d-block mt-1"
                                to={`/category/${child._id}`}
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <small>{child.name}</small>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryCard;
