import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";
import {
  FeesTaken,
  LPDeposited,
  LPWithdrawn,
  OwnershipTransferred,
} from "../types/FeeSplit/FeeSplit";

export function createFeesTakenEvent(
  entitledFeesInDollars: BigInt,
  averagePoolBalanceInDollars: BigInt,
  tokensTransferred: BigInt
): FeesTaken {
  let feesTakenEvent = changetype<FeesTaken>(newMockEvent());

  feesTakenEvent.parameters = new Array();

  feesTakenEvent.parameters.push(
    new ethereum.EventParam(
      "entitledFeesInDollars",
      ethereum.Value.fromUnsignedBigInt(entitledFeesInDollars)
    )
  );
  feesTakenEvent.parameters.push(
    new ethereum.EventParam(
      "averagePoolBalanceInDollars",
      ethereum.Value.fromUnsignedBigInt(averagePoolBalanceInDollars)
    )
  );
  feesTakenEvent.parameters.push(
    new ethereum.EventParam(
      "tokensTransferred",
      ethereum.Value.fromUnsignedBigInt(tokensTransferred)
    )
  );

  return feesTakenEvent;
}

export function createLPDepositedEvent(
  depositor: Address,
  depositAmount: BigInt
): LPDeposited {
  let lpDepositedEvent = changetype<LPDeposited>(newMockEvent());

  lpDepositedEvent.parameters = new Array();

  lpDepositedEvent.parameters.push(
    new ethereum.EventParam("depositor", ethereum.Value.fromAddress(depositor))
  );
  lpDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "depositAmount",
      ethereum.Value.fromUnsignedBigInt(depositAmount)
    )
  );

  return lpDepositedEvent;
}

export function createLPWithdrawnEvent(
  depositor: Address,
  depositAmount: BigInt,
  withdrawnTokens: BigInt
): LPWithdrawn {
  let lpWithdrawnEvent = changetype<LPWithdrawn>(newMockEvent());

  lpWithdrawnEvent.parameters = new Array();

  lpWithdrawnEvent.parameters.push(
    new ethereum.EventParam("depositor", ethereum.Value.fromAddress(depositor))
  );
  lpWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "depositAmount",
      ethereum.Value.fromUnsignedBigInt(depositAmount)
    )
  );
  lpWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawnTokens",
      ethereum.Value.fromUnsignedBigInt(withdrawnTokens)
    )
  );

  return lpWithdrawnEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  );

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}
