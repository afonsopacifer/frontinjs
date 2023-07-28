import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import diffEventProp from '../src/render/helpers/diffEventProp.js';
import makeElements from '../src/render/makeElements/makeElements.js';
import vdom from '../src/vdom/vdom.js';

describe('diffEventProp()', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------
  it('Should return the same real DOM element with a new event listener', () => {

    let state = 'No click event';

    const changeState = () => {
      state = 'Has click event';
    }

    const element = makeElements({type: 'div'}, fakeDocument);

    const oldNode = vdom('div')

    const newNode = vdom(
      'div',
      {onClick: () => changeState()}
    )

    diffEventProp(
      element,
      'onClick',
      newNode.props.onClick,
      oldNode.props.onClick
    );

    element.click();

    expect(state).to.be.equal('Has click event');

  });

  // --------------------------
  it('Should return the same real DOM element with a removed event listener', () => {

    let state = 'No click event';

    const changeState = () => {
      state = 'Has click event';
    }

    const element = makeElements({
      type: 'div',
      props: {onClick: () => changeState}
    }, fakeDocument);

    const oldNode = vdom(
      'div',
      {onClick: () => changeState}
    )

    const newNode = vdom('div')

    diffEventProp(
      element,
      'onClick',
      newNode.props.onClick,
      oldNode.props.onClick
    );

    element.click();

    expect(state).to.be.equal('No click event');

  });

  // --------------------------
  it('Should return the same real DOM element with a different listener', () => {

    let state;

    const oldChangeState = function () {
      state = 'Old click event';
    }

    const element = makeElements({
      type: 'div',
      props: {onClick: oldChangeState}
    }, fakeDocument);

    const oldNode = vdom(
      'div',
      {onClick: oldChangeState}
    )

    const newNode = vdom(
      'div',
      {onClick: () => state = 'Has click event'}
    )

    diffEventProp(
      element,
      'onClick',
      newNode.props.onClick,
      oldNode.props.onClick
    );

    element.click();

    expect(state).to.be.equal('Has click event');

  });

});
