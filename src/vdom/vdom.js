export default (type, props, ...children) => {

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