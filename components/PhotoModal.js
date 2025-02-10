function PhotoModal({ isOpen, onClose, currentPhoto, onPrev, onNext }) {
    if (!isOpen) return null;

    return React.createElement(
        'div',
        {
            className: 'modal-overlay',
            onClick: onClose
        },
        React.createElement(
            'div',
            {
                className: 'modal-content',
                onClick: e => e.stopPropagation()
            },
            React.createElement('img', {
                src: currentPhoto.fullSize,
                alt: currentPhoto.name,
                className: 'modal-image'
            }),
            React.createElement(
                'button',
                {
                    className: 'modal-close',
                    onClick: onClose
                },
                '×'
            ),
            React.createElement(
                'button',
                {
                    className: 'modal-prev',
                    onClick: onPrev
                },
                '‹'
            ),
            React.createElement(
                'button',
                {
                    className: 'modal-next',
                    onClick: onNext
                },
                '›'
            ),
            React.createElement(
                'div',
                {
                    className: 'modal-caption'
                },
                currentPhoto.name
            )
        )
    );
}

window.PhotoModal = PhotoModal;
