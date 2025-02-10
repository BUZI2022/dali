const photos = window.tripData?.photos || [];

function PhotoGallery() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [animating, setAnimating] = React.useState(false);

    const displayedPhotos = isExpanded ? photos : photos.slice(0, 6);

    const handlePhotoClick = (index) => {
        setCurrentPhotoIndex(index);
        setModalOpen(true);
    };

    const handlePrevPhoto = (e) => {
        e.stopPropagation();
        setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    };

    const handleNextPhoto = (e) => {
        e.stopPropagation();
        setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    };

    const toggleExpanded = () => {
        setAnimating(true);
        setIsExpanded(!isExpanded);
        setTimeout(() => {
            setAnimating(false);
        }, 500);
    };

    return React.createElement(
        'section',
        {
            'data-name': 'photo-gallery',
            className: 'my-12'
        },
        React.createElement(
            'h2',
            {
                'data-name': 'gallery-title',
                className: 'text-3xl text-center mb-8',
                style: { fontFamily: 'Noto Serif SC, serif' }
            },
            '照片回忆'
        ),
        React.createElement(
            'div',
            {
                'data-name': 'photo-grid',
                className: `photo-grid ${isExpanded ? 'expanded' : ''} ${animating ? 'animating' : ''}`
            },
            displayedPhotos.map((photo, index) =>
                React.createElement(
                    'div',
                    {
                        key: photo.id,
                        'data-name': `photo-item-${photo.id}`,
                        className: 'photo-item',
                        onClick: () => handlePhotoClick(index),
                        style: {
                            animationDelay: `${index * 0.1}s`
                        }
                    },
                    React.createElement('img', {
                        src: photo.thumbnail,
                        alt: photo.name,
                        className: 'photo-thumbnail'
                    }),
                    React.createElement(
                        'div',
                        {
                            className: 'photo-caption'
                        },
                        photo.name
                    )
                )
            )
        ),
        React.createElement(
            'button',
            {
                'data-name': 'toggle-photos-button',
                className: 'toggle-photos-button',
                onClick: toggleExpanded
            },
            isExpanded ? '收起照片' : '查看全部照片'
        ),
        modalOpen && React.createElement(PhotoModal, {
            isOpen: modalOpen,
            onClose: () => setModalOpen(false),
            currentPhoto: photos[currentPhotoIndex],
            onPrev: handlePrevPhoto,
            onNext: handleNextPhoto
        })
    );
}

window.PhotoGallery = PhotoGallery;
