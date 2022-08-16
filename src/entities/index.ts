import { Address } from "@graphprotocol/graph-ts";
import { ContractStatus } from "../../types/schema";
import { BIG_DECIMAL_ZERO, BIG_INT_ZERO } from "../constants";

export function loadFeeSplitStatus(address: Address): ContractStatus {
  let contractStatus = ContractStatus.load(address.toHex());
  if (contractStatus == null) {
    contractStatus = new ContractStatus(address.toHex());
    contractStatus.contractAddress = address;
    contractStatus.totalFeesTaken = BIG_DECIMAL_ZERO;
    contractStatus.feesTakenTransactionCount = BIG_INT_ZERO;
    contractStatus.lpTransactionCount = BIG_INT_ZERO;
  }

  contractStatus.save();

  return contractStatus;
}
