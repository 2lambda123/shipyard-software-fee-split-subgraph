import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";

import { LpTransaction } from "../../types/schema";
import { BIG_INT_EIGHTEEN, BIG_INT_ONE } from "../constants";
import { getExchangeAddress } from "../constants/addresses";
import { loadFeeSplitStatus } from "../entities";
import { convertTokenToDecimal } from "../utils";
import {
  getCurrentPoolLiquidity,
  getPoolTokenSupply,
  getPoolTokenValue,
} from "../utils/pool";

export function createLpTransaction(
  event: ethereum.Event,
  poolTokens: BigInt,
  sender: Address,
  transactionType: string
): LpTransaction {
  let clipperExchangeAddress = getExchangeAddress(event.address);
  let lpTransaction = new LpTransaction(event.transaction.hash.toHexString());
  let liquidity = getCurrentPoolLiquidity(clipperExchangeAddress);
  let poolTokenSupply = getPoolTokenSupply(clipperExchangeAddress);
  let poolTokensValueInUsd = getPoolTokenValue(
    liquidity,
    poolTokenSupply,
    poolTokens
  );

  lpTransaction.hash = event.transaction.hash;
  lpTransaction.transactionType = transactionType;
  lpTransaction.poolTokens = convertTokenToDecimal(
    poolTokens,
    BIG_INT_EIGHTEEN
  );
  lpTransaction.valueInUsd = poolTokensValueInUsd;
  lpTransaction.sender = sender;
  lpTransaction.timestamp = event.block.timestamp;

  let contractStatus = loadFeeSplitStatus(event.address);
  lpTransaction.contract = contractStatus.id;
  contractStatus.lpTransactionCount = contractStatus.lpTransactionCount.plus(
    BIG_INT_ONE
  );

  contractStatus.save();
  lpTransaction.save();

  return lpTransaction;
}
