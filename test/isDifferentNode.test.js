import { describe, it } from "node:test";
import { expect } from 'chai';
import isDifferentNode from '../src/render/helpers/isDifferentNode.js';

describe('isDifferentNode()', () => {

  // --------------------------

  it('Should return that the nodes are different by element type', () => {

    const vNode1 = {type: 'h1'}
    const vNode2 = {type: 'h2'}

    const result = isDifferentNode(vNode1, vNode2);
    expect(result).to.deep.equal(true);

  });

  // --------------------------

  it('Should return that the nodes are equal by element type', () => {

    const vNode1 = {type: 'h1'}
    const vNode2 = {type: 'h1'}

    const result = isDifferentNode(vNode1, vNode2);
    expect(result).to.deep.equal(false);

  });

});
