function referringIds(element) {
    var next;

    if (!element.orient) {
        element.orient = {yes: 'b', no: 'r', next: 'b'};
    }

    if (element.yes) {
        next = lookup[element.yes];
        if (shapes[next]) {
            shapes[next].previd = element.id;
            shapes[next].prev = element.label;
            shapes[next].svgprevid = SVG('#' + element.id);

            if (element.orient.yes === 'b') {
                shapes[next].isBelow = element.id;
                shapes[next].svgisBelow = SVG('#' + element.id);
            }

            if (element.orient.yes === 'l') {
                shapes[next].isLeftOf = element.id;
                shapes[next].svgisLeftOf = SVG('#' + element.id);
            }

            if (element.orient.yes === 'r') {
                shapes[next].isRightOf = element.id;
                shapes[next].svgisRightOf = SVG('#' + element.id);
            }
        }
    }
    if (element.no) {
        next = lookup[element.no];
        if (shapes[next]) {
            shapes[next].previd = element.id;
            shapes[next].prev = element.label;
            shapes[next].svgprevid = SVG('#' + element.id);

            if (element.orient.no === 'b' || element.placeNoBelow) {
                shapes[next].isBelow = element.id;
                shapes[next].svgisBelow = SVG('#' + element.id);
            }

            if (element.orient.no === 'r') {
                shapes[next].isRightOf = element.id;
                shapes[next].svgisRightOf = SVG('#' + element.id);
            }
        }
    }
    if (element.next) {
        next = lookup[element.next];
        if (shapes[next]) {
            shapes[next].previd = element.id;
            shapes[next].prev = element.label;
            shapes[next].svgprevid = SVG('#' + element.id);

            if (element.orient.next === 'b') {
                shapes[next].isBelow = element.id;
                shapes[next].svgisBelow = SVG('#' + element.id);
            }

            if (element.orient.next === 'l') {
                shapes[next].isLeftOf = element.id;
                shapes[next].svgisLeftOf = SVG('#' + element.id);
            }

            if (element.orient.next === 'r') {
                shapes[next].isRightOf = element.id;
                shapes[next].svgisRightOf = SVG('#' + element.id);
            }
        }
    }
}
