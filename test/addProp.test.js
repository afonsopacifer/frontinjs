import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import makeElements from '../src/render/makeElements/makeElements.js';
import addProp from '../src/render/helpers/addProp.js';

describe('addProp()', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------
  it('Should return the same real DOM element with a new class prop', () => {

    const element = makeElements({type: 'div'}, fakeDocument);
    addProp(element, 'className', 'main');

    expect(element.className).to.be.equal('main');
  });

  // --------------------------
  it('Should return the same real DOM element with a new prop', () => {

    const element = makeElements({
      type: 'input',
      props: {id: 'section'}
    }, fakeDocument);

    addProp(element, 'type', 'text');

    expect(element.type).to.be.equal('text');
  });

});
