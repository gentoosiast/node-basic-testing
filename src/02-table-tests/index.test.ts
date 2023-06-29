import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 40, b: 2, action: Action.Add, expected: 42 },
  { a: 44, b: 2, action: Action.Subtract, expected: 42 },
  { a: 21, b: 2, action: Action.Multiply, expected: 42 },
  { a: 126, b: 3, action: Action.Divide, expected: 42 },
  { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
  { a: 42, b: 42, action: 'InvalidAction', expected: null },
  { a: '40', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'table with test cases',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
