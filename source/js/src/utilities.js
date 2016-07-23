/**
 * Helper class to triger a custom even for an element
 */
export function triggerEvent(element, name, data) {
  var event = document.createEvent('Event');
  
  event.initEvent(name, true, true);  //can bubble, and is cancellable
  event.data = data;
  element.dispatchEvent(event);
}

/**
 * Filter to only select anchor tags
 */
export function onlyAnchorsFilter(element) {
  return element.nodeName.toLowerCase() == 'a';
}

/**
 * Filter to only select div tags
 */
export function onlyDivsFilter(element) {
  return element.nodeName.toLowerCase() == 'div';
}
  
/**
 * Get all siblings for an element 
 * todo: Move to sharable utility class
 */
export function getSiblings(el, filter) {
  var siblings = [];
  el = el.parentNode.firstChild;
  do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
  return siblings;
}