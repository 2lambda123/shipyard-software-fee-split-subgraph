import {
  FeesTaken,
  LPDeposited,
  LPWithdrawn,
} from "../types/FeeSplit/FeeSplit";
import { Fee, LpTransaction } from "../types/schema";
import { BIG_INT_EIGHTEEN } from "./constants";
import { clipperExchangeAddress } from "./constants/addresses";
import { convertTokenToDecimal } from "./utils";
import {
  getCurrentPoolLiquidity,
  getPoolTokenSupply,
  getPoolTokenValue,
} from "./utils/pool";

export function handleFeesTaken(event: FeesTaken): void {
  let txHash = event.transaction.hash;
  let liquidity = getCurrentPoolLiquidity(clipperExchangeAddress);
  let poolTokenSupply = getPoolTokenSupply(clipperExchangeAddress);

  let fee = new Fee(txHash.toHexString());
  fee.hash = txHash;
  fee.avgPoolBalanceInDollars = event.params.averagePoolBalanceInDollars.toBigDecimal();
  fee.entitledValueInUsd = event.params.entitledFeesInDollars.toBigDecimal();

  let transferredPoolTokens = event.params.tokensTransferred;

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

  fee.save();
}

export function handleLPDeposited(event: LPDeposited): void {
  let txHash = event.transaction.hash;
  let lpDeposit = new LpTransaction(txHash.toHexString());
  let liquidity = getCurrentPoolLiquidity(clipperExchangeAddress);
  let poolTokenSupply = getPoolTokenSupply(clipperExchangeAddress);
  let poolTokens = event.params.depositAmount;
  let poolTokensValueInUsd = getPoolTokenValue(
    liquidity,
    poolTokenSupply,
    poolTokens
  );

  lpDeposit.hash = txHash;
  lpDeposit.transactionType = "Deposit";
  lpDeposit.poolTokens = convertTokenToDecimal(poolTokens, BIG_INT_EIGHTEEN);
  lpDeposit.valueInUsd = poolTokensValueInUsd;
  lpDeposit.sender = event.params.depositor;
  lpDeposit.timestamp = event.block.timestamp;

  lpDeposit.save();
}

export function handleLPWithdrawn(event: LPWithdrawn): void {
  let txHash = event.transaction.hash;
  let lpWithdrawal = new LpTransaction(txHash.toHexString());
  let liquidity = getCurrentPoolLiquidity(clipperExchangeAddress);
  let poolTokenSupply = getPoolTokenSupply(clipperExchangeAddress);
  let poolTokens = event.params.withdrawnTokens;
  let poolTokensValueInUsd = getPoolTokenValue(
    liquidity,
    poolTokenSupply,
    poolTokens
  );

  lpWithdrawal.hash = txHash;
  lpWithdrawal.transactionType = "Withdrawal";
  lpWithdrawal.poolTokens = convertTokenToDecimal(poolTokens, BIG_INT_EIGHTEEN);
  lpWithdrawal.valueInUsd = poolTokensValueInUsd;
  lpWithdrawal.sender = event.params.depositor;
  lpWithdrawal.timestamp = event.block.timestamp;

  lpWithdrawal.save();
}
