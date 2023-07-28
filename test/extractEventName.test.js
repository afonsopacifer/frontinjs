import { describe, it } from "node:test";
import { expect } from 'chai';
import extractEventName from '../src/render/helpers/extractEventName.js';

describe('extractEventName()', () => {

  // --------------------------

  it('Should return the property name without the "on" prefix', () => {

    const eventName = extractEventName('onClick')

    expect(eventName).to.deep.equal('click');

  });

});
