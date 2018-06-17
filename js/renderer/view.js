export function View(myr, width, height) {
    const ZOOM_MAX = 128;
    const ZOOM_MIN = 4;
    const ZOOM_DEFAULT = 32;
    const ZOOM_SCALE_FACTOR = 0.25;

    const transform = new myr.Transform();
    let mouseX = 0;
    let mouseY = 0;
    let shiftX = 0;
    let shiftY = 0;
    let zoom = ZOOM_DEFAULT;
    let dragging = false;

    const updateTransform = () => {
        transform.identity();
        transform.translate(width * 0.5, height * 0.5);
        transform.scale(zoom, zoom);
        transform.translate(shiftX, shiftY);
    };

    const move = (x, y) => {
        shiftX -= x;
        shiftY -= y;

        updateTransform();
    };

    const zoomShift = zoomPrevious => {
        const scaleFactor = (zoom - zoomPrevious) / (zoom * zoomPrevious);

        shiftX += (width * 0.5 - mouseX) * scaleFactor;
        shiftY += (height * 0.5 - mouseY) * scaleFactor;
    };

    this.getTransform = () => transform;
    this.onMousePress = () => dragging = true;
    this.onMouseRelease = () => dragging = false;

    this.onZoomIn = () => {
        const zoomPrevious = zoom;

        zoom *= 1 + ZOOM_SCALE_FACTOR;
        if (zoom > ZOOM_MAX)
            zoom = ZOOM_MAX;

        zoomShift(zoomPrevious);
        updateTransform();
    };

    this.onZoomOut = () => {
        const zoomPrevious = zoom;

        zoom *= 1 - ZOOM_SCALE_FACTOR;
        if (zoom < ZOOM_MIN)
            zoom = ZOOM_MIN;

        zoomShift(zoomPrevious);
        updateTransform();
    };

    this.onMouseMove = (x, y) => {
        if (dragging) {
            const dx = (mouseX - x) / zoom;
            const dy = (mouseY - y) / zoom;

            if (dx !== 0 || dy !== 0)
                move(dx, dy);
        }

        mouseX = x;
        mouseY = y;
    };

    this.setFocus = (x, y) => {
        shiftX = -x;
        shiftY = -y;

        updateTransform();
    };

    this.getScale = () => zoom;

    updateTransform();
}