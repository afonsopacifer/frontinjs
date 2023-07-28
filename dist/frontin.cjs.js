'use strict';

var vdom = (type, props, ...children) => {

  // Height Level JSX component / Function component
  // --------------------------
  if(typeof type !== 'string') {

    // Run the function with parameters for make internal virtual nodes
    return type(props);

  }

  // vNodes array inner children array
  // --------------------------
  children.forEach((vNode, index) => {

    if(Array.isArray(vNode)) {
      const listOfvNodes = vNode;

      // Remove listOfvNodes from children array
      children.splice(index, 1);

      listOfvNodes.forEach((internalvNode, internalIndex) => {
        const nextPosition = index + internalIndex;

        // Add internalvNode to children array
        children.splice(nextPosition, 0, internalvNode);
      });

    }
  });

  return {type, props: props || {}, children};

};

/**
 * Check if the Prop is a event (If has the 'on' prefix)
 * @module src/diff/helpers/isEventProp
 *
 * @param {string} propName - Prop name
 *
 * @returns {boolean}
 *
 */

function isEventProp(propName) {
  return /^on/.test(propName);
}

/**
 * Extract the real event name (Remove the 'on' Prefix)
 * @function
 *
 * @param {string} propName - The event name
 *
 */

function extractEventName(propName) {
  return propName.slice(2).toLowerCase();
}

/**
 * Add event listeners
 * @module src/diff/helpers/addEventListener
 *
 * @param {object} element - Real DOM Element
 * @param {string} propName - The event name
 * @param {function} callBack - The callback function
 *
 */

function addEventListener(element, propName, callBack) {

  element.addEventListener(
    extractEventName(propName),
    callBack
  );

}

/**
 * Add a new prop in any real DOM element
 * * @module src/diff/helpers/addProp
 *
 * @param {object} element - Real DOM element
 * @param {string} propName - New prop name
 * @param {string} propValue - New prop value
 *
 */

function addProp(element, propName, propValue) {
  if (propName === 'className') {
    element.setAttribute('class', propValue);
  } else {
    element.setAttribute(propName, propValue);
  }
}

/**
 * Generate real DOM elements.
 * @module src/diff/makeElements/makeElements
 *
 * @param {object} vNode - virtual DOM representation
 *
 * @returns Real DOM elements.
 *
 */

function makeElements(vNode, document = window.document) {

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

/**
 * Check if the virtual nodes are different
 * @module src/diff/helpers/isDifferentNode
 *
 * @param {object} vNode - virtual DOM representation
 * @param {object} vNode - virtual DOM representation
 *
 * @returns {boolean}
 *
 */

function isDifferentNode(VNode1, VNode2) {

  const isDifferentType = typeof VNode1 !== typeof VNode2;
  const isDifferentElement = VNode1.type !== VNode2.type;

  return isDifferentType || isDifferentElement;

}

/**
 * Remove a prop in any real DOM element
 * @module src/diff/helpers/removeProp
 *
 * @param {object} element - Real DOM element
 * @param {string} propName - Prop name
 *
 */

function removeProp(element, propName) {
  if (propName === 'className') {
    element.removeAttribute('class');
  } else {
    element.removeAttribute(propName);
  }
}

/**
 * Remove event listeners
 * @module src/diff/helpers/removeEventListener
 *
 * @param {object} element - Real DOM Element
 * @param {string} propName - The event name
 * @param {function} callBack - The callback function
 *
 */

function removeEventListener(element, propName, callBack) {

  element.removeEventListener(
    extractEventName(propName),
    callBack
  );

}

/**
 * Diff the EventProps
 * @module src/diff/helpers/diffEventProp
 *
 * @param {object} element - Element for diff
 * @param {string} eventName - Prop name/Event name
 * @param {function} newCallBack -New callBack function
 * @param {function} oldCallBack - Old callBack function
 *
 */

function diffEventProp(element, eventName, newCallBack, oldCallBack) {

  // Add new eventListener
  // --------------------------
  if (!oldCallBack) {
    addEventListener(element, eventName, newCallBack);

  // Remove deleted eventListener
  // --------------------------
  } else if (!newCallBack) {
    removeEventListener(element, eventName, oldCallBack);

  // Replace different eventListener callBack
  // --------------------------
  } else if (isDifferentFunction(newCallBack, oldCallBack)) {

    removeEventListener(element, eventName, oldCallBack);
    addEventListener(element, eventName, newCallBack);

  }

}

/**
 * Check if the functions are different
 * @function
 *
 * @param {function} functionA - Function for test
 * @param {function} functionB - Function for test
 *
 * @returns {boolean}
 *
 */

const isDifferentFunction = (functionA, functionB) => {
  return functionA.toString( ) !== functionB.toString( );
};

/**
 * Diff all props
 * @module src/diff/diffProps/diffProps
 *
 * @param {object} element - Element for diff
 * @param {object} newProps - All props in new Virtual DOM Element
 * @param {object} oldProps - All props in old Virtual DOM Element
 *
 */

function diffProps(element, newProps, oldProps = {}) {

  const allProps = Object.assign({}, newProps, oldProps);

  Object.keys(allProps).forEach(propName => {

    if(isEventProp(propName)) {

      diffEventProp(
        element,
        propName,
        newProps[propName],
        oldProps[propName]
      );

    } else {

      diffProp(
        element,
        propName,
        newProps[propName],
        oldProps[propName]
      );

    }

  });

}

/**
 * Diff the a single prop
 * @function
 *
 * @param {object} element - Element for prop diff
 * @param {string} propName - Prop Name
 * @param {string} newValue - New prop Value
 * @param {string} oldValue - Old prop value
 *
 */

const diffProp = (element, propName, newValue, oldValue) => {

  // Add new prop
  // --------------------------
  if (!oldValue) {
    addProp(element, propName, newValue);

  // Remove deleted prop
  // --------------------------
  } else if (!newValue) {
    removeProp(element, propName);

  // Replace different prop value
  // --------------------------
  } else if (newValue !== oldValue) {
    addProp(element, propName, newValue);
  }

};

/**
 * Diff the old and new virtual text node representations
 * @module src/diff/diffTextNodes/diffTextNodes
 *
 * @param {object} $parent - parent element
 * @param {string} newTextNode - virtual new text representation
 * @param {string} oldTextNode - virtual old text representation
 * @param {number} index - Child node index
*
 */

function diffTextNodes($parent, newTextNode, oldTextNode, index = 0, document = window.document) {

  // Add new text node
  // --------------------------
  if (!oldTextNode) {

    const $newTextNode = document.createTextNode(newTextNode);
    $parent.appendChild($newTextNode);

  // Remove deleted text node
  // --------------------------
  } else if (!newTextNode) {

    const $oldTextNode = $parent.childNodes[index];
    $parent.removeChild($oldTextNode);

  // Replace different text nodes
  // --------------------------
  } else if (newTextNode !== oldTextNode) {

    const $newTextNode = document.createTextNode(newTextNode);
    const $oldTextNode = $parent.childNodes[index];
    $parent.replaceChild($newTextNode, $oldTextNode);

  }

}

/**
 * Diff the old and new virtual DOM representations
 * @module src/diff/diff
 *
 * @param {object} parent - parent element
 * @param {object} newNode - virtual DOM representation
 * @param {object} oldNode - virtual DOM representation
 * @param {number} index - Child node index
 *
 */

function diffElement(parent, newNode, oldNode, index = 0, document = window.document) {

  // Add new node
  // --------------------------
  if (!oldNode) {

    const newElement = makeElements(newNode, document);
    parent.appendChild(newElement);

  // Remove deleted node
  // --------------------------
  } else if (!newNode) {

    const oldElement = parent.childNodes[index];
    parent.removeChild(oldElement);

  // Replace different node
  // --------------------------
  } else if (isDifferentNode(newNode, oldNode)) {

    const newElement = makeElements(newNode, document);
    const oldElement = parent.childNodes[index];
    parent.replaceChild(newElement, oldElement);

  // diff text nodes
  // --------------------------
  } else if (typeof newNode === 'string') {
    diffTextNodes(parent, newNode, oldNode, index, document);

  // Same element node
  // --------------------------
  } else if (newNode.type) {

    // diff props
    // --------------------------
    diffProps(
      parent.childNodes[index],
      newNode.props,
      oldNode.props,
    );

    // Children elements recursion
    // --------------------------
    if (newNode.children) {

      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;

      for (let i = 0; i < newLength || i < oldLength; i++) {
        diffElement(
          parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i,
          document,
        );
      }

    }

  }

}

/**
 * Get all refs in real DOM and set in virtual object
 * @module src/refs/getRefs
 *
 * @param {object} targetObj - Object for receive all references
 * @param {object} element - DOM node for search
 *
 */

var getRefs = (targetObj, element = window.document) => {

  element.querySelectorAll('[ref]').forEach((element) => {

    const refName = element.getAttribute('ref');
    const refValue = element;

    targetObj[refName] = refValue;

  });

};

const frontin = () => {

  /**
   * Generates a virtual DOM representation as a plane Object
   *
   * @param {(string|function)} type - Element type
   * @param {object} props - All Props and values
   * @param {...(string|vdom|array)} children -  Child elements
   *
   * @returns {object} Virtual DOM representation as a plane object
   *
   */

  const component = (type, props, ...children) => {
    return vdom(type, props, ...children);
  };

  /**
   * Diff the virtual representations and render the changes in real DOM
   * Get all references and set in Refs object
   *
   * @param {object} newVNode - New virtual node for diff
   * @param {object} parent -  The root element for render
   *
   */

  let oldVirtualNode = null;
  let refs = {};

  const render = (virtualNode, root) => {

    diffElement(root, virtualNode, oldVirtualNode);

    getRefs(refs);
    oldVirtualNode = virtualNode;

  };

  return {
    component,
    render,
    refs,
  }

};

var frontin$1 = frontin();

module.exports = frontin$1;
