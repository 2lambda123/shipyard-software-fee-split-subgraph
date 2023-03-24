import {
  ClipperProtocolDepositFeesTaken as ClipperProtocolDepositFeesTakenEvent,
  ClipperProtocolDepositLPDeposited as ClipperProtocolDepositLPDepositedEvent,
  ClipperProtocolDepositLPWithdrawn as ClipperProtocolDepositLPWithdrawnEvent,
  ClipperProtocolDepositOwnershipTransferred as ClipperProtocolDepositOwnershipTransferredEvent,
} from "../types/ClipperProtocolDeposit/ClipperProtocolDeposit";
import { createFee } from "./entities/Fee";
import { createLpTransaction } from "./entities/LpTransaction";

export function handleClipperProtocolDepositFeesTaken(
  event: ClipperProtocolDepositFeesTakenEvent
): void {
  createFee(
    event,
    event.params.entitledFeesInDollars,
    event.params.averagePoolBalanceInDollars,
    event.params.tokensTransferred
  );
}

export function handleClipperProtocolDepositLPDeposited(
  event: ClipperProtocolDepositLPDepositedEvent
): void {
  createLpTransaction(
    event,
    event.params.clipperLPDeposited,
    event.params.depositor,
    "Deposit"
  );
}

export function handleClipperProtocolDepositLPWithdrawn(
  event: ClipperProtocolDepositLPWithdrawnEvent
): void {
  createLpTransaction(
    event,
    event.params.clipperLPWithdrawn,
    event.params.depositor,
    "Withdraw"
  );
}
