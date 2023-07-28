import isEventProp from './../helpers/isEventProp.js';
import addEventListener from './../helpers/addEventListener.js';
import addProp from './../helpers/addProp.js';

/**
 * Generate real DOM elements.
 * @module src/diff/makeElements/makeElements
 *
 * @param {object} vNode - virtual DOM representation
 *
 * @returns Real DOM elements.
 *
 */

export default function makeElements(vNode, document = window.document) {

  // Only text node
  // --------------------------
  if (typeof vNode === 'string') {

    return document.createTextNode(vNode);
  }

  // Element node
  // --------------------------
  const element = document.createElement(vNode.type);

  // props
  // --------------------------
  if(vNode.props) {
    Object.keys(vNode.props).forEach(propName => {
      if(isEventProp(propName)) {
        addEventListener(element, propName, vNode.props[propName]);
      } else {
        addProp(element, propName, vNode.props[propName]);
      }
    });
  }

  // children
  // --------------------------

  // text node
  if(typeof vNode.children === 'string') {

    const textNode = document.createTextNode(vNode);
    element.appendChild(textNode);

  } else {

    // Elements nodes
    if(vNode.children) {
      const appendElement = element.appendChild.bind(element);
      vNode.children.map(vNode => makeElements(vNode, document)).forEach(appendElement);
    }

  }

  return element;

}
