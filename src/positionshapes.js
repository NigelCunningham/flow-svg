function overlapAmount(element, shapes) {
    var overlap = 0;
    var eb = element.svgid.bbox();
    if (eb.cx) {
        shapes.forEach((shape) => {
            var shapeBox = shape.svgid.bbox();
            if (shape !== element && shapeBox.x) {
                if (shapeBox.x <= eb.x2 && shapeBox.y <= eb.y2 &&
                    shapeBox.x2 >= eb.x && shapeBox.y2 >= eb.y) {
                    if (element.isBelow) {
                        overlap += shapeBox.height + config.connectorLength;
                    }
                    else {
                        overlap += shapeBox.width + config.connectorLength;
                    }
                }
            }
        });
    }
    return overlap;
}

function positionShapes(element, index, shapes) {
    var ce = element.svgid, rightMargin, eb,
        below, beside, forceBelow, forceBeside;

    if (index === 0) {
        element.isBelow = startId;
        element.svgisBelow = SVG('#' + startId);
    }

    forceBeside = (typeof element.placeNoBeside !== 'undefined');
    forceBelow = (typeof element.placeNoBelow !== 'undefined');
    beside = ((typeof element.isRightOf !== 'undefined') |
        (typeof element.isLeftOf !== 'undefined') | forceBeside) & !forceBelow;
    below = ((typeof element.isBelow !== 'undefined') | forceBelow) & !forceBeside;
    eb = element.svgisBelow || element.svgisRightOf || element.svgisLeftOf;

    if (element.placeNoBelow) {
        element.orient.no = 'l';
    }

    if (!element.inNode) {
        if (element.isBelow) {
            element.inNode = 't';
        }
        else if (element.isRightOf) {
            element.inNode = 'l';
        }
    }

    if (below) {
        var y = eb.y() + eb.bbox().height;
        if (index !== 0) {
            y += config.connectorLength;
        }
        ce.move(eb.x(), y);
        var overlapShift = overlapAmount(element, shapes);
        if (overlapShift) {
            y += overlapShift;
            ce.move(eb.x(), y);
            element.overlapShift = overlapShift;
        }
        if (y > ce.node.ownerSVGElement.clientHeight) {
            var newHeight = y + eb.bbox().height;
            eb.node.ownerSVGElement.setAttribute('height', newHeight);
        }
        if (y > lowest) {
            lowest = y;
            lowestElement = element;
            orphanY = y + eb.bbox().height + config.connectorLength;
        }
    }
    else if (beside) {
        if (interactive === false) {
            rightMargin = element.moveRight !== undefined ? element.moveRight : config.connectorLength;
        } else {
            rightMargin = config.connectorLength;
        }

        var x = eb.x() + eb.bbox().width + rightMargin;
        ce.move(x, eb.y());
        var overlapShift = overlapAmount(element, shapes);
        if (overlapShift) {
            x += overlapShift;
            ce.move(x, eb.y());
            element.overlapShift = overlapShift;
        }
        if (x > ce.node.ownerSVGElement.clientWidth) {
            var newWidth = x + eb.bbox().width;
            eb.node.ownerSVGElement.setAttribute('width', newWidth);
        }
    }
}

function positionOrphans(element, index) {
    if (element.isBelow || element.isRightOf || element.isLeftOf) {
        return;
    }
    var ce = element.svgid;
    if ((orphanX + ce.bbox().width) > ce.node.ownerSVGElement.clientWidth) {
        orphanX = 0;
        orphanY += ce.bbox().height + config.connectorLength;
    }
    if (orphanY > ce.node.ownerSVGElement.clientHeight) {
        var newHeight = orphanY + ce.bbox().height;
        ce.node.ownerSVGElement.setAttribute('height', newHeight);
    }
    ce.move(orphanX, orphanY);
    orphanX += ce.bbox().width + config.connectorLength;
}
