
// atStart: if true, returns coord of the beginning of the selection,
//          if false, returns coord of the end of the selection
export function getSelectionCoords (): DOMRect | null {
    const sel = window.getSelection()
    // check if selection exists
    if (!sel || !sel.rangeCount) {
        return null
    }
    // get range
    const range = sel.getRangeAt(0).cloneRange()
    if (!range.getClientRects) {
        return null
    }
    // get client rect
    return range.getBoundingClientRect()
    /*
    let rects = range.getClientRects();
    if (rects.length <= 0) return null;
    // return coord
    let rect = rects[0];
    return { x: rect.x, y: rect.y };
    */
}
