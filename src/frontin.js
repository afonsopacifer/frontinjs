import vdom from './vdom/vdom';
import internalRender  from './render/render';
import getRefs from './refs/getRefs.js';

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
  }

  /**
   * Diff the virtual representations and render the changes in real DOM
   * Get all references and set in Refs object
   *
   * @param {object} newVNode - New virtual node for diff
   * @param {object} parent -  The root element for render
   *
   */

  let oldVirtualNode = null;
  let refs = {}

  const render = (virtualNode, root) => {

    internalRender(root, virtualNode, oldVirtualNode);

    getRefs(refs);
    oldVirtualNode = virtualNode;

  }

  return {
    component,
    render,
    refs,
  }

}

export default frontin();