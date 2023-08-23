import {
  FeesTaken,
  Deposit as DepositEvent,
  Withdraw as WithdrawEvent,
} from "../types/SplitFeeFarm/SplitFeeFarm";

import { createFee } from "./entities/Fee";
import { createLpTransaction } from "./entities/LpTransaction";

export function handleFeesTaken(event: FeesTaken): void {
  createFee(
    event,
    event.params.entitledFeesInDollars,
    event.params.averagePoolBalanceInDollars,
    event.params.tokensTransferred
  );
}

export function handleDeposit(event: DepositEvent): void {
  createLpTransaction(
    event,
    event.params.assets,
    event.params.owner,
    "Deposit"
  );
}

export function handleWithdraw(event: WithdrawEvent): void {
  createLpTransaction(
    event,
    event.params.assets,
    event.params.owner,
    "Withdrawal"
  );
}
