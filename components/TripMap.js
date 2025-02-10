const locations = window.tripData?.locations || [];

function TripMap() {
    const mapContainerRef = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (!window.AMap) {
            console.error('AMap is not loaded');
            return;
        }

        const map = new AMap.Map(mapContainerRef.current, {
            zoom: 13,
            center: [100.225668, 25.733262],  
            mapStyle: 'amap://styles/whitesmoke'
        });

        locations.forEach(location => {
            addMapMarker(map, location);
        });

        setIsLoading(false);

        return () => {
            map.destroy();
        };
    }, []);

    const addMapMarker = (map, markerData) => {
        const markerContent = document.createElement('div');
        markerContent.className = 'map-marker';
        
        const content = document.createElement('div');
        content.className = 'marker-content';
        content.innerHTML = `
            <div class="map-preview-container">
                <div class="map-preview">
                    <img src="${markerData.previewImage}" alt="${markerData.name}" />
                </div>
                <div class="location-name">${markerData.name}</div>
            </div>
        `;
        
        markerContent.appendChild(content);

        const marker = new AMap.Marker({
            position: markerData.coordinates,
            content: markerContent,
            offset: new AMap.Pixel(-7, -7),
            anchor: 'bottom-center'
        });

        marker.setMap(map);
        return marker;
    };

    return React.createElement(
        'section',
        {
            'data-name': 'trip-map',
            className: 'my-12'
        },
        React.createElement(
            'h2',
            {
                'data-name': 'map-title',
                className: 'text-3xl text-center mb-8',
                style: { fontFamily: 'Noto Serif SC, serif' }
            },
            '旅行地图'
        ),
        React.createElement(
            'div',
            {
                'data-name': 'map-container',
                className: 'relative'
            },
            isLoading && React.createElement(
                'div',
                {
                    className: 'absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50'
                },
                React.createElement(
                    'div',
                    { className: 'text-gray-600' },
                    '地图加载中...'
                )
            ),
            React.createElement(
                'div',
                {
                    ref: mapContainerRef,
                    style: {
                        height: '800px',
                        width: '100%',
                        display: isLoading ? 'none' : 'block',
                        margin: '2rem 0',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }
                }
            )
        )
    );
}

window.TripMap = TripMap;
