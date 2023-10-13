function staticAddConnectors(element) {
    var startln, endln, overlapShift;

    if (element.yesid) {
        startln = element.yesOutPos;
        endln = shapes[lookup[element.yes]].inNodePos;
        overlapShift = shapes[lookup[element.yes]].overlapShift;
        element.conngroup.polyline(angleLine(startln, endln, element, element.yesid, overlapShift))
        .stroke({
            width:  config.connectorStrokeWidth,
            color: config.connectorStrokeColour
        }).fill('none');
    }

    if (element.noid) {
        startln = element.noOutPos;
        endln = shapes[lookup[element.no]].inNodePos;
        overlapShift = shapes[lookup[element.no]].overlapShift;
        element.conngroup.polyline(angleLine(startln, endln, element, element.noid, overlapShift))
        .stroke({
            width:  config.connectorStrokeWidth,
            color: config.connectorStrokeColour
        }).fill('none');
    }

    if (element.nextid) {
        startln = element.nextOutPos;
        endln = shapes[lookup[element.next]].inNodePos;
        overlapShift = shapes[lookup[element.next]].overlapShift;

        if (endln === undefined) {
            endln = shapes[lookup[element.next]].yesOutPos;
        }
        element.conngroup.polyline(angleLine(startln, endln, element, element.nextid, overlapShift))
        .stroke({
            width:  config.connectorStrokeWidth,
            color: config.connectorStrokeColour
        }).fill('none');
    }
}
