import {
  FeesTaken as ClipperProtocolDepositFeesTakenEvent,
  LPDeposited as ClipperProtocolDepositLPDepositedEvent,
  LPWithdrawn as ClipperProtocolDepositLPWithdrawnEvent,
} from "../types/ClipperProtocolDeposit/ClipperProtocolDeposit";
import { createFee } from "./entities/Fee";
import { createLpTransaction } from "./entities/LpTransaction";

export function handleFeesTaken(
  event: ClipperProtocolDepositFeesTakenEvent
): void {
  createFee(
    event,
    event.params.entitledFeesInDollars,
    event.params.averagePoolBalanceInDollars,
    event.params.tokensTransferred
  );
}

export function handleLPDeposited(
  event: ClipperProtocolDepositLPDepositedEvent
): void {
  createLpTransaction(
    event,
    event.params.clipperLPDeposited,
    event.params.depositor,
    "Deposit"
  );
}

export function handleLPWithdrawn(
  event: ClipperProtocolDepositLPWithdrawnEvent
): void {
  createLpTransaction(
    event,
    event.params.clipperLPWithdrawn,
    event.params.depositor,
    "Withdrawal"
  );
}
