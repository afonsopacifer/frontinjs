import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import makeElements from '../src/render/makeElements/makeElements.js';
import removeProp from '../src/render/helpers/removeProp.js';

describe('removeProp()', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------
  it('Should return the same real DOM element with a removed prop', () => {

    const element = makeElements({
      type: 'h1',
      props: {id: 'heading'}
    }, fakeDocument);

    removeProp(element, 'id');

    expect(element.id).to.be.equal('');
  });

  // --------------------------
  it('Should return the same real DOM element with a removed class prop', () => {

    const element = makeElements({
      type: 'h1',
      props: {className: 'heading'}
    }, fakeDocument);

    removeProp(element, 'className');

    expect(element.className).to.be.equal('');
  });

});
