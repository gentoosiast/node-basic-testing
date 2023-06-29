import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => jest.restoreAllMocks());

  test('should create account with initial balance', () => {
    const account = getBankAccount(42);

    expect(account.getBalance()).toBe(42);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(42);
    const balance = account.getBalance();

    expect(() => account.withdraw(43)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(42);
    const balance = account.getBalance();
    const secondAccount = getBankAccount(0);

    expect(() => account.transfer(43, secondAccount)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(42);

    expect(() => account.transfer(1, account)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(42);

    expect(account.getBalance()).toBe(42);
    account.deposit(7);
    expect(account.getBalance()).toBe(49);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(42);

    expect(account.getBalance()).toBe(42);
    account.withdraw(7);
    expect(account.getBalance()).toBe(35);
  });

  test('should transfer money', () => {
    const account = getBankAccount(42);
    const secondAccount = getBankAccount(0);

    expect(account.getBalance()).toBe(42);
    expect(secondAccount.getBalance()).toBe(0);
    account.transfer(7, secondAccount);
    expect(account.getBalance()).toBe(35);
    expect(secondAccount.getBalance()).toBe(7);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    const lodashRandomMock = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(42)
      .mockReturnValueOnce(1);
    const balance = await account.fetchBalance();

    expect(lodashRandomMock).toHaveBeenCalled();
    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    const lodashRandomMock = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(42)
      .mockReturnValueOnce(1);
    await account.synchronizeBalance();

    expect(lodashRandomMock).toHaveBeenCalled();
    expect(account.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(42);
    const lodashRandomMock = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(42)
      .mockReturnValueOnce(0);

    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    } finally {
      expect(lodashRandomMock).toHaveBeenCalled();
    }
  });
});
