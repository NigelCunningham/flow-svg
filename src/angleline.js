function angleLine(start, end, element, targetId, overlapShift) {

    var e = element.svgshape, p1, p2, p3, p4, p5, spacer = config.arrowHeadHeight * 2, endPos;

    // See if it's at the bottom
    if (start[1] === e.y() + e.height()) {

        if (overlapShift) {
            var xOffset = config.connectorLength * 5 / 4;
            var yOffset = config.connectorLength * 1 / 4;
            if (start[1] < end[1]) {
                p1 = [start[0], start[1] + yOffset];
                p2 = [start[0] + xOffset, start[1] + yOffset];
                p3 = [start[0] + xOffset, end[1] - yOffset - config.arrowHeadHeight];
                p4 = [end[0], end[1] - yOffset - config.arrowHeadHeight];
                return [ start, p1, p2, p3, p4, end];
            } else {
                // Untested.
                p1 = [start[0] + xOffset, start[1]];
                p2 = [start[0] + xOffset, start[1] + yOffset];
                p3 = [end[0] - xOffset - config.arrowHeadHeight, start[1] + yOffset];
                p4 = [end[0] - xOffset - config.arrowHeadHeight, start[1]];
                return [ start, p1, p2, p3, p4, end];
            }
        }

        p1 = start;
        p2 = [start[0], start[1] + spacer ];

        if (end[1] > start[1]) {
            p2 = [start[0], end[1] - spacer];
            p3 = [end[0], end[1] - spacer];
        }

        if (end[0] < start[0]) {
            p3 = [end[0], end[1] - spacer];
        }

        if (end[1] <= start[1]) {
            p3 = [end[0], end[1] + spacer];
        }
        endPos = [end[0],  end[1] - config.arrowHeadHeight];
        return [p1, p2, p3, endPos ];
    }

    // see if out is on the right and in is at the top
    if ((start[0] < end[0]) && (start[1] > end[1])) {
        p1 = start;
        p2 = [start[0] + spacer, start[1]];
        p3 = [start[0] + spacer, end[1] - spacer];
        p4 = [end[0], end[1] - spacer];
        endPos = [end[0],  end[1] - config.arrowHeadHeight];
        return [p1, p2, p3, p4, endPos];
    }

    // see if it finishes on the left and below
    if ((start[0] > end[0]) && (start[1] < end[1])) {
        p1 = start;
        p2 = [start[0] + spacer, start[1]];
        p3 = [start[0] + spacer, end[1] - (config.shapeHeight / 2) - spacer];
        p4 = [end[0] - spacer, end[1] - (config.shapeHeight / 2) - spacer];
        p5 = [end[0] - spacer, end[1]];
        endPos = [end[0],  end[1]];
        return [p1, p2, p3, p4, p5, endPos];
    }

    // see if it finishes on the right and below
    /*
            if ((start[0] < end[0]) && (start[1] < end[1])) {
                p1 = start;
                p2 = [start[0], start[1] + spacer];
                p3 = [end[0], start[1] + spacer];
                endPos = [end[0],  end[1] - config.arrowHeadHeight];
                return [p1, p2, p3, endPos];

            }
            */

    // see if it starts on the left and in on the right and below
    if ((start[0] < end[0]) && (start[1] < end[1])) {
        var source = element.svgid;
        var dest = SVG('#' + targetId);
        // see if the entry point is left or top
        var inAt;
        if (end[1] > dest.y()) {
            inAt = 'l';

            p1 = start;
            p2 = [start[0] + (spacer / 2), start[1]];
            p3 = [start[0] + (spacer /2), end[1]];
            endPos = [end[0] - config.arrowHeadHeight, end[1]];
            return [p1, p2, p3, endPos];

        }
        if (end[1] === dest.y()) {
            inAt = 't';
            if (source.x() == start[0]) {
                p1 = start;
                p2 = [start[0] - (spacer / 2), start[1]];
                p3 = [start[0] - (spacer / 2), end[1] - config.arrowHeadHeight - (spacer / 2)];
                p4 = [end[0], end[1] - config.arrowHeadHeight  - (spacer / 2)];
                p5 = [end[0], end[1] - config.arrowHeadHeight];
                return [start, p1, p2, p3, p4, p5]
            } else {
                p1 = start;
                p2 = [end[0], start[1]];
                // p3 = [start[0] + (spacer /2), end[1]];
                endPos = [end[0], end[1] - config.arrowHeadHeight];
                return [p1, p2, endPos];
            }
        }
        //console.log(inAt);

    }

    if (start[1] < end[1]) {
        endPos = [end[0],  end[1] - config.arrowHeadHeight];
    } else if (start[0] < end[0]) {
        endPos = [end[0]  - config.arrowHeadHeight,  end[1]];
    }

    if (overlapShift) {
        var xOffset = config.connectorLength * 1 / 4;
        var yOffset = config.connectorLength * 5 / 4;
        if (start[1] < end[1]) {
            // Untested.
            p1 = [start[0] + xOffset, start[1]];
            p2 = [start[0] + xOffset, start[1] + yOffset];
            p3 = [end[0] - xOffset - config.arrowHeadHeight, start[1] + yOffset];
            p4 = [end[0] - xOffset - config.arrowHeadHeight, start[1]];
            return [ start, p1, p2, p3, p4, endPos];
        } else {
            p1 = [start[0] + xOffset, start[1]];
            p2 = [start[0] + xOffset, start[1] + yOffset];
            p3 = [end[0] - xOffset - config.arrowHeadHeight, start[1] + yOffset];
            p4 = [end[0] - xOffset - config.arrowHeadHeight, start[1]];
            return [ start, p1, p2, p3, p4, endPos];
        }
    }
    return [start, endPos];
}
