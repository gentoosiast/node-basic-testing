import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const resolvedValue = await resolveValue(42);

    expect(resolvedValue).toBe(42);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('My awesome error!')).toThrow('My awesome error!');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
