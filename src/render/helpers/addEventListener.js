import extractEventName from './extractEventName.js';

/**
 * Add event listeners
 * @module src/diff/helpers/addEventListener
 *
 * @param {object} element - Real DOM Element
 * @param {string} propName - The event name
 * @param {function} callBack - The callback function
 *
 */

export default function addEventListener(element, propName, callBack) {

  element.addEventListener(
    extractEventName(propName),
    callBack
  );

}
