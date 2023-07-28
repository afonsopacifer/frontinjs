import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import makeElements from '../src/render/makeElements/makeElements.js';
import diffTextNodes from '../src/render/diffTextNodes/diffTextNodes.js';

describe('diffTextNodes()', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------

  it('Should return the same element with a new text child', () => {

    const $parent = makeElements({
      type: 'DIV',
      props: {}
    }, fakeDocument);

    const newTextNode = 'Hello World 2';

    diffTextNodes($parent, newTextNode, null, 0, fakeDocument);

    expect($parent.textContent).to.be.equal('Hello World 2');

  });

  // --------------------------

  it('Should return the same element with a removed text child', () => {

    const $parent = makeElements({
      type: 'DIV',
      props: {},
      children: 'Hello World'
    }, fakeDocument);

    const oldTextNode = 'Hello World';
    const newTextNode = null

    diffTextNodes($parent, newTextNode, oldTextNode, 0, fakeDocument);

    expect($parent.textContent).to.be.equal('');

  });

  // --------------------------

  it('Should return the same element with a different text child', () => {

    const $parent = makeElements({
      type: 'DIV',
      props: {},
      children: 'Hello World'
    }, fakeDocument);

    const oldTextNode = 'Hello World';
    const newTextNode = 'Hello World 2';

    diffTextNodes($parent, newTextNode, oldTextNode, 0, fakeDocument);

    expect($parent.textContent).to.be.equal('Hello World 2');

  });

});
