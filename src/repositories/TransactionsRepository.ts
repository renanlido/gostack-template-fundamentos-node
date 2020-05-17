import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions.reduce((total, object) => {
      if (object.type === 'income') {
        const newTotal = total + object.value;
        return newTotal;
      }
      return total;
    }, 0);

    const outcomeSum = this.transactions.reduce((total, object) => {
      if (object.type === 'outcome') {
        const newTotal = total + object.value;
        return newTotal;
      }
      return total;
    }, 0);

    const balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
