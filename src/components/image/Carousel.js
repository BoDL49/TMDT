import StoreCarouselUpload from './uploadButton/StoreCarouselUpload';
const IMG = process.env.REACT_APP_STATIC_URL;

const Carousel = ({
    storeId = '',
    listImages = [],
    alt = 'carousel',
    isEditable = false,
    style = {},
}) => (
    <div
        id="carouselInterval"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
    >
        <div className="carousel-indicators">
            {listImages &&
                listImages.map((image, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselInterval"
                        data-bs-slide-to={index}
                        className={index == 0 ? 'active' : ''}
                    ></button>
                ))}
        </div>

        <div className="carousel-inner rounded-3">
            {listImages &&
                listImages.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index == 0 && 'active'}`}
                        data-bs-interval="3000"
                    >
                        <div className="cus-carousel" style={style}>
                            <img
                                src={`${image}`}
                                className="d-block w-100 cus-carousel-img"
                                alt={alt}
                            />

                            {isEditable == 'store' && (
                                <StoreCarouselUpload
                                    storeId={storeId}
                                    index={index}
                                />
                            )}
                        </div>
                    </div>
                ))}
        </div>

        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselInterval"
            data-bs-slide="prev"
        >
            <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
        </button>

        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselInterval"
            data-bs-slide="next"
        >
            <span
                className="carousel-control-next-icon"
                aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
);

export default Carousel;
