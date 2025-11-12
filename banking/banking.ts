import {
  BankAccount,
  WithdrawalRequest,
  WithdrawalResult,
  WithdrawalError,
} from "./types";

export function createAccount(account: BankAccount): BankAccount | WithdrawalError {
  if (account.balance < 0) {
    return {
      code: "INVALID_AMOUNT",
      message: "Account balance cannot be negative",
    };
  }

  if (account.balance === 0) {
    return {
      code: "INVALID_AMOUNT",
      message: "Initial account balance must be positive",
    };
  }

  return account;
}

export function processWithdrawal(
  account: BankAccount,
  withdrawal: WithdrawalRequest
): WithdrawalResult | WithdrawalError {
  // Check if account ID matches
  if (account.id !== withdrawal.accountId) {
    return {
      code: "ACCOUNT_NOT_FOUND",
      message: "Account not found",
    };
  }

  // Check if amount is valid (positive)
  if (withdrawal.amount <= 0) {
    return {
      code: "INVALID_AMOUNT",
      message: "Withdrawal amount must be positive",
    };
  }

  // Check if currencies match
  if (account.currency !== withdrawal.currency) {
    return {
      code: "INVALID_AMOUNT",
      message: "Currency mismatch",
    };
  }

  // Check if sufficient funds
  if (withdrawal.amount > account.balance) {
    return {
      code: "INSUFFICIENT_FUNDS",
      message: "Insufficient funds",
    };
  }

  // Process successful withdrawal
  const remainingBalance = account.balance - withdrawal.amount;
  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    success: true,
    transaction: {
      id: transactionId,
      amount: withdrawal.amount,
      currency: withdrawal.currency,
      timestamp: withdrawal.timestamp,
      remainingBalance: remainingBalance,
    },
  };
}
