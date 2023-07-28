import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import makeElements from '../src/render/makeElements/makeElements.js';
import addEventListener from '../src/render/helpers/addEventListener.js';

describe('addEventListener()', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------
  it('Should return a real DOM element with an attached event (Simple anonymous function)', () => {

    let state = 'No click event';

    const element = makeElements({type: 'div'}, fakeDocument);

    addEventListener(element, 'onClick', () => state = 'Has click event')

    element.click();

    expect(state).to.be.equal('Has click event');
  });

  // --------------------------
  it('Should return a real DOM element with an attached event (anonymous function with child function)', () => {

    let state = 'No click event';

    const changeState = () => {
      state = 'Has click event'
    }

    const element = makeElements({type: 'div'}, fakeDocument);

    addEventListener(element, 'onClick', () => changeState())

    element.click();

    expect(state).to.be.equal('Has click event');
  });

  // --------------------------
  it('Should return a real DOM element with an attached event (Named function)', () => {

    let state = 'No click event';

    const changeState = () => {
      state = 'Has click event'
    }

    const element = makeElements({type: 'div'}, fakeDocument);

    addEventListener(element, 'onClick', changeState)

    element.click();

    expect(state).to.be.equal('Has click event');
  });

});
