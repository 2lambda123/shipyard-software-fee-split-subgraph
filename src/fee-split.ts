import { BigInt } from "@graphprotocol/graph-ts";
import {
  FeeSplit,
  FeesTaken,
  LPDeposited,
  LPWithdrawn,
  OwnershipTransferred,
} from "../types/FeeSplit/FeeSplit";

export function handleFeesTaken(event: FeesTaken): void {}

export function handleLPDeposited(event: LPDeposited): void {}

export function handleLPWithdrawn(event: LPWithdrawn): void {}
