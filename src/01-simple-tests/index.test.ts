import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const additionResult = simpleCalculator({
      a: 40,
      b: 2,
      action: Action.Add,
    });

    expect(additionResult).toBe(42);
  });

  test('should subtract two numbers', () => {
    const subtractionResult = simpleCalculator({
      a: 44,
      b: 2,
      action: Action.Subtract,
    });

    expect(subtractionResult).toBe(42);
  });

  test('should multiply two numbers', () => {
    const multiplicationResult = simpleCalculator({
      a: 21,
      b: 2,
      action: Action.Multiply,
    });

    expect(multiplicationResult).toBe(42);
  });

  test('should divide two numbers', () => {
    const divisionResult = simpleCalculator({
      a: 126,
      b: 3,
      action: Action.Divide,
    });

    expect(divisionResult).toBe(42);
  });

  test('should exponentiate two numbers', () => {
    const exponentiationResult = simpleCalculator({
      a: 2,
      b: 8,
      action: Action.Exponentiate,
    });

    expect(exponentiationResult).toBe(256);
  });

  test('should return null for invalid action', () => {
    const invalidActionResult = simpleCalculator({
      a: 42,
      b: 42,
      action: 'InvalidAction',
    });

    expect(invalidActionResult).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const invalidArgumentsResult = simpleCalculator({
      a: '40',
      b: 2,
      action: Action.Add,
    });

    expect(invalidArgumentsResult).toBe(null);
  });
});
