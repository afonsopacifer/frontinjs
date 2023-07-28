import { describe, it } from "node:test";
import { expect } from 'chai';
import vdom from '../src/vdom/vdom.js';

describe('vdom() ', () => {

  // --------------------------

  it('Should return a virtual node', () => {

    const vNode = vdom('h1');

    const vNodeResult = {
      type: 'h1',
      props: {},
      children: []
    }

    expect(vNode).to.deep.equal(vNodeResult);

  });

  // --------------------------

  it('Should return a virtual node with props', () => {

    const vNode = vdom(
      'h1',
      {className: 'sampa'}
    );

    const vNodeResult = {
      type: 'h1',
      props: {className: 'sampa'},
      children: []
    }

    expect(vNode).to.deep.equal(vNodeResult);

  });

  // --------------------------

  it('Should return a virtual node with one children (text)', () => {

    const vNode = vdom(
      'h1',
      {className: 'sampa'},
      'Hello World'
    );

    const vNodeResult = {
      type: 'h1',
      props: { className: 'sampa' },
      children: [ 'Hello World' ]
    }

    expect(vNode).to.deep.equal(vNodeResult);

  });

  // --------------------------

  it('Should return a virtual node with one children (other virtual node - Recursion)', () => {

    const vNode = vdom(
      'div',
      null,
      vdom(
        'p',
        { className: 'floripa' },
        'Hello World'
      )
    );

    const vNodeResult = {
      type: 'div',
      props: {},
      children: [
        {
          type: 'p',
          props: { className: 'floripa' },
          children: ['Hello World']
        }
      ]
    }

    expect(vNode).to.deep.equal(vNodeResult);

  });

  // --------------------------

  it('Should return a virtual node with miltiple childrens', () => {

    const vNode = vdom(
      'div',
      null,
      'page',
      vdom('h1',null,'Page Title'),
      vdom(
        'p',
        { className: 'sampa' },
        vdom(
          'b',
          null,
          'Hello'
        )
      )
    );

    const vNodeResult = {
      type: 'div',
      props: {},
      children: [
        'page',
        {
          type: 'h1',
          props: {},
          children: ['Page Title']
        },
        {
          type: 'p',
          props: { className: 'sampa' },
          children: [
            {
              type: 'b',
              props: {},
              children: ['Hello']
            }
          ]
        }
      ]
    }

    expect(vNode).to.deep.equal(vNodeResult);

  });

  // --------------------------

  it('Should return a virtual node with function component child', () => {

    // JSX representation
    // const VNodeFunctionComponent = () => {
    //   return (
    //     <button> Show </button>
    //   )
    // }

    // Vanilla JS representation
    const vNodeFunctionComponent = () => {
      return vdom(
        'button',
        null,
        'Show'
      )
    }

    // JSX representation
    // const vNode = <VNodeFunctionComponent />

    // Vanilla JS representation
    const vNode = vdom(
      vNodeFunctionComponent,
      null,
      'Show'
    )

    // result
    const vNodeResult = {
      type: 'button',
      props: {},
      children: ['Show']
    }

    expect(vNode).to.deep.equal(vNodeResult);

  });

  // --------------------------

  it('Should return a virtual node with function component child (with Props)', () => {

    // JSX representation
    // const VNodeFunctionComponent = ({text}) => {
    //   return (
    //     <button> {text} </button>
    //   )
    // }

    // Vanilla JS representation
    const VNodeFunctionComponent = ({text}) => {
      return vdom(
        'button',
        null,
        text + ' Component'
      )
    }

    // JSX representation
    // const vNode = <VNodeFunctionComponent text="Show"/>

    // Vanilla JS representation
    const vNode = vdom(
      VNodeFunctionComponent,
      {text: 'Show'}
    )

    // result
    const vNodeResult = {
      type: 'button',
      props: {},
      children: ['Show Component']
    }

    expect(vNode).to.deep.equal(vNodeResult);

  });

  // --------------------------

  it('Should return a virtual node generated by an array of other virtual nodes', () => {

    // JSX representation
    //
    // const VNodeList = [
    //   <li>text 1</li>,
    //   <li>text 2</li>,
    //   <li>text 3</li>
    // ]
    // const VNodeFunctionComponent = () => {
    //   return (
    //     <ul>
    //      {VNodeList}
    //     </ul>
    //   )
    // }

    // Vanilla JS representation
    const VNodeFunctionComponent = () => {
      return vdom(
        'ul',
        null,
          [
            vdom('li', null, 'text 1'),
            vdom('li', null, 'text 2'),
            vdom('li', null, 'text 3')
          ]
      )
    }

    // result
    const vNodeResult = {
      type: 'ul',
      props: {},
      children: [
        {type: 'li', props: {}, children: ['text 1']},
        {type: 'li', props: {}, children: ['text 2']},
        {type: 'li', props: {}, children: ['text 3']}
      ]
    }

    expect(VNodeFunctionComponent()).to.deep.equal(vNodeResult);

  });

});