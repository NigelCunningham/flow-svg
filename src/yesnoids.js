function yesNoIds(element) {
    if (element.yes) {
        element.yesid = itemIds[element.yes];
        element.svgyesid = SVG('#' + itemIds[element.yes]);
    }
    if (element.no) {
        element.noid = itemIds[element.no];
        element.svgnoid = SVG('#' + itemIds[element.no]);
    }
    if (element.next) {
        element.nextid = itemIds[element.next];
        element.svgnextid = SVG('#' + itemIds[element.next]);
    }
}
