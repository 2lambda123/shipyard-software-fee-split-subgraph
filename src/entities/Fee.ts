import { BigInt, ethereum } from "@graphprotocol/graph-ts";

import { Fee } from "../../types/schema";
import { BIG_INT_EIGHTEEN, BIG_INT_ONE } from "../constants";
import { getExchangeAddress } from "../constants/addresses";
import { loadFeeSplitStatus } from "../entities";
import { convertTokenToDecimal } from "../utils";
import {
  getCurrentPoolLiquidity,
  getPoolTokenSupply,
  getPoolTokenValue,
} from "../utils/pool";

export function createFee(
  event: ethereum.Event,
  entitledFeesInDollars: BigInt,
  averagePoolBalanceInDollars: BigInt,
  tokensTransferred: BigInt
): Fee {
  let clipperExchangeAddress = getExchangeAddress(event.address);
  let liquidity = getCurrentPoolLiquidity(clipperExchangeAddress);
  let poolTokenSupply = getPoolTokenSupply(clipperExchangeAddress);
  let fee = new Fee(event.transaction.hash.toHexString());
  fee.hash = event.transaction.hash;
  fee.avgPoolBalanceInDollars = averagePoolBalanceInDollars.toBigDecimal();
  fee.entitledValueInUsd = entitledFeesInDollars.toBigDecimal();

  let transferredPoolTokens = tokensTransferred;

  let transferredPoolTokensValueInUsd = getPoolTokenValue(
    liquidity,
    poolTokenSupply,
    transferredPoolTokens
  );

  fee.valueInUsd = transferredPoolTokensValueInUsd;
  fee.poolTokens = convertTokenToDecimal(
    transferredPoolTokens,
    BIG_INT_EIGHTEEN
  );
  fee.timestamp = event.block.timestamp;

  let contractStatus = loadFeeSplitStatus(event.address);
  fee.contract = contractStatus.id;
  contractStatus.feesTakenTransactionCount = contractStatus.feesTakenTransactionCount.plus(
    BIG_INT_ONE
  );
  contractStatus.totalFeesTaken = contractStatus.totalFeesTaken.plus(
    convertTokenToDecimal(transferredPoolTokens, BIG_INT_EIGHTEEN)
  );

  contractStatus.save();
  fee.save();

  return fee;
}
