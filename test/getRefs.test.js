import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import makeElements from '../src/render/makeElements/makeElements.js';
import getRefs from '../src/refs/getRefs.js';

describe('getRefs()', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------
  it('Should return an element by ref in local DOM', () => {

    const realNode = makeElements({
      type: 'div',
      props: null,
      children: [
        {
          type: 'input',
          props: {ref: 'inputText', value: 'content'},
          children: []
        }
      ]
    }, fakeDocument)

    const refs = {};

    getRefs(refs, realNode, fakeDocument);

    const inputValue = refs.inputText.value;
    expect(inputValue).to.be.equal('content');

  });

  // --------------------------
  it('Should return multiple element by ref in local DOM', () => {

    const realNode = makeElements({
      type: 'div',
      props: null,
      children: [
        {
          type: 'input',
          props: {ref: 'inputText', value: 'content'},
          children: []
        },
        {
          type: 'label',
          props: {ref: 'labelText', className: 'text'},
          children: ['Login']
        }
      ]
    }, fakeDocument)

    const refs = {};

    getRefs(refs, realNode, fakeDocument);

    const inputValue = refs.inputText.value;
    const labelClass = refs.labelText.className;

    expect(inputValue).to.be.equal('content');
    expect(labelClass).to.be.equal('text');

  });

});
