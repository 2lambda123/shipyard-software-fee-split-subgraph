import {
  FeesTaken,
  LPDeposited,
  LPWithdrawn,
} from "../types/FeeSplit/FeeSplit";

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

export function handleLPDeposited(event: LPDeposited): void {
  createLpTransaction(
    event,
    event.params.depositAmount,
    event.params.depositor,
    "Deposit"
  );
}

export function handleLPWithdrawn(event: LPWithdrawn): void {
  createLpTransaction(
    event,
    event.params.withdrawnTokens,
    event.params.depositor,
    "Withdraw"
  );
}
