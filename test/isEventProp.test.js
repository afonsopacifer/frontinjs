import { describe, it } from "node:test";
import { expect } from 'chai';
import isEventProp from '../src/render/helpers/isEventProp.js';

describe('isEventProp()', () => {

  // --------------------------

  it('Should return that prop name is an event name', () => {

    const result = isEventProp('onClick')

    expect(result).to.be.equal(true);

  });

  // --------------------------

  it('Should return that prop name is not an event name', () => {

    const result = isEventProp('Click')

    expect(result).to.be.equal(false);

  });

});
