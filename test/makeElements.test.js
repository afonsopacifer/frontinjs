import { describe, it, beforeEach } from "node:test";
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import makeElements from '../src/render/makeElements/makeElements.js';

describe('makeElements() - Make real DOM element ', () => {

  let fakeDocument;

  beforeEach(() => {
    fakeDocument = new JSDOM(`<div></div>`).window.document;
  })

  // --------------------------

  it('Should return a real DOM element', () => {

    const realNode = makeElements({type: 'h1'}, fakeDocument)
    const realNodeName = realNode.nodeName;

    expect(realNodeName).eql('H1');

  });

  // --------------------------

  it('Should return a real DOM element with prop', () => {

    const realNode = makeElements({
      type: 'h1',
      props: { id: 'heading' }
    }, fakeDocument)

    const realNodeId = realNode.id;

    expect(realNodeId).eql('heading');

  });

  // --------------------------
  it('Should return a real DOM element with an attached event', () => {

    let state = 'No click event';

    const realNode = makeElements({
      type: 'div',
      props: {onClick: () => state = 'Has click event'}
    }, fakeDocument);

    realNode.click();

    expect(state).to.be.equal('Has click event');
  });

  // --------------------------

  it('Should return a real DOM element with a text child', () => {

    const realNode = makeElements({
      type: 'h1',
      props: null,
      children: ['text']
    }, fakeDocument)

    const realNodeTextChild = realNode.childNodes[0].textContent;

    expect(realNodeTextChild).eql('text');

  });

  // --------------------------

  it('Should return a real child element', () => {

    const realNode = makeElements({
      type: 'div',
      props: null,
      children: [
        {type: 'p'}
      ]
    }, fakeDocument)

    const realNodeChildName = realNode.childNodes[0].nodeName;

    expect(realNodeChildName).eql('P');

  });

  // --------------------------

  it('Should return a real child with prop', () => {

    const realNode = makeElements({
      type: 'div',
      props: null,
      children: [
        {
          type: 'p',
          props: { className: 'paragraph' }
        }
      ]
    }, fakeDocument)

    const realNodeChildClass = realNode.childNodes[0].className;

    expect(realNodeChildClass).eql('paragraph');

  });

  // --------------------------

  it('Should return a real child with an attached event', () => {

    let state = 'No click event';

    const realNode = makeElements({
      type: 'div',
      props: null,
      children: [
        {
          type: 'p',
          props: {onClick: () => state = 'Has click event'},
          children: ['hello']
        }
      ]
    }, fakeDocument)

    realNode.childNodes[0].click();

    expect(state).to.be.equal('Has click event');
  });

  // --------------------------

  it('Should return a real child with text child', () => {

    const realNode = makeElements({
      type: 'div',
      props: null,
      children: [
        {
          type: 'p',
          props: null,
          children: ['hello']
        }
      ]
    }, fakeDocument)

    const realNodeTextChild = realNode.childNodes[0].childNodes[0].textContent;

    expect(realNodeTextChild).eql('hello');

  });

  // --------------------------

  it('Should return a real child with other real child', () => {

    const realNode = makeElements({
      type: 'div',
      props: null,
      children: [
        {
          type: 'p',
          props: null,
          children: [
            {
              type: 'h1',
              props: null,
              children: 'hello'
            }
          ]
        }
      ]
    }, fakeDocument)

    const realNodeChildOfChildName = realNode.childNodes[0].childNodes[0].nodeName;

    expect(realNodeChildOfChildName).eql('H1');

  });

});
