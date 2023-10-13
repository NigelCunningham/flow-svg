function staticNodePoints(element) {
    var ce = element.svgid, te, targetShape,
        group = chartGroup.group();

    if (element.yes && element.yesid !== undefined) {
        te = element.svgyesid;
        targetShape = shapes[lookup[element.yes]];

        if (targetShape.inNode === 't') {
            targetShape.inNodePos = [te.cx(), te.y()];
        }

        if (element.orient.yes === 'b') {
            element.yesOutPos = [ce.cx(), ce.bbox().y2];
            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 't';

            if (targetShape.inNode === 'l') {
                targetShape.inNodePos = [te.x() - config.arrowHeadHeight, te.cy()];
            }
        }

        if (element.orient.yes === 'r') {
            element.yesOutPos = [ce.bbox().x2, ce.cy()];
            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 'l';

            if (targetShape.inNode === 'l') {
                targetShape.inNodePos = [te.x(), te.cy()];
            }
        }
        isPositioned.push(element.yesid);
    }

    if (element.no && element.noid !== undefined) {
        targetShape = shapes[lookup[element.no]];
        te = element.svgnoid;

        if (element.orient.no === 'l') {
            element.noOutPos = [ce.bbox().x, ce.cy()];
            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 'l';
            targetShape.inNodePos = targetShape.inNode == 'l' ? [te.x(), te.cy()] : [te.cx(), te.y()];
        }

        if (element.orient.no === 'b') {
            element.noOutPos = [ce.cx(), ce.bbox().y2];
            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 't';
            targetShape.inNodePos = [te.cx(), te.y()];
        }

        if (element.orient.no === 'r') {
            element.noOutPos = [ce.bbox().x2, ce.cy()];
            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 'l';

            if (targetShape.inNode === 't') {
                targetShape.inNodePos = [te.cx(), te.y()];
            }
            if (targetShape.inNode === 'l') {
                targetShape.inNodePos = [te.x(), te.cy()];
            }
        }
        isPositioned.push(element.noid);
    }

    if (element.next) {
        targetShape = shapes[lookup[element.next]];
        if (element.orient.next === 'b') {
            element.nextOutPos = [ce.cx(), ce.bbox().y2];

            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 't';

            if (targetShape.inNode === 't') {
                te = element.svgnextid;
                targetShape.inNodePos = [te.cx(), te.y()];
            }
            if (targetShape.inNode === 'l') {
                te = element.svgnoid;
                targetShape.inNodePos = [te.x(), te.cy()];
            }
        }

        if (element.orient.next === 'l') {
            element.nextOutPos = [ce.bbox().x, ce.bbox().cy];
            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 'l';
            te = element.svgnextid;

            if (targetShape.inNode === 't') {
                targetShape.inNodePos = [te.cx(), te.y()];
            }
            if (targetShape.inNode === 'l') {
                targetShape.inNodePos = [te.x(), te.cy()];
            }
        }

        if (element.orient.next === 'r') {
            element.nextOutPos = [ce.bbox().x2, ce.bbox().cy];
            targetShape.inNode = targetShape.inNode !== undefined ? targetShape.inNode : 'l';
            te = element.svgnextid;

            if (targetShape.inNode === 't') {
                targetShape.inNodePos = [te.cx(), te.y()];
            }
            if (targetShape.inNode === 'l') {
                targetShape.inNodePos = [te.x(), te.cy()];
            }
        }
        isPositioned.push(element.nextid);
    }
    group.back();
    element.conngroup = group;
}
