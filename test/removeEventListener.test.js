import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import makeElements from '../src/render/makeElements/makeElements.js';
import removeEventListener from '../src/render/helpers/removeEventListener.js';

describe('removeEventListener()', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------
  it('Should return a real DOM element without an attached event', () => {

    let state = 'No click event';
    const element = makeElements({type: 'div'}, fakeDocument);

    const changeState = () => {
      state = 'Has click event';
    }

    element.addEventListener('click', () => changeState)

    removeEventListener(element, 'onClick', () => changeState)

    element.click();

    expect(state).to.be.equal('No click event');

  });

});
