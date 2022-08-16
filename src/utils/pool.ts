import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { ClipperVerifiedExchange } from "../../types/FeeSplit/ClipperVerifiedExchange";
import { BIG_DECIMAL_ZERO } from "../constants";
import { getUsdPrice } from "./prices";
import {
  fetchTokenBalance,
  fetchTokenDecimals,
  fetchTokenSymbol,
} from "./token";

export function getCurrentPoolLiquidity(poolAddress: Address): BigDecimal {
  let poolContract = ClipperVerifiedExchange.bind(poolAddress);
  let nTokens = poolContract.nTokens();
  let currentLiquidity = BigDecimal.fromString("0");

  for (let i: i32 = 0; i < nTokens.toI32(); i++) {
    let nToken = poolContract.try_tokenAt(BigInt.fromI32(i));
    if (!nToken.reverted) {
      let tokenAddress = nToken.value;
      let tokenSymbol = fetchTokenSymbol(tokenAddress);
      let tokenDecimals = fetchTokenDecimals(tokenAddress);
      let tokenBalance = fetchTokenBalance(
        tokenAddress.toHexString(),
        poolAddress,
        tokenDecimals.toI32()
      );
      let tokenUsdPrice = getUsdPrice(tokenSymbol);
      let usdTokenLiquidity = tokenBalance.times(tokenUsdPrice);

      currentLiquidity = currentLiquidity.plus(usdTokenLiquidity);
    } else {
      log.warning("Not able to fetch nToken {}", [i.toString()]);
    }
  }

  return currentLiquidity;
}

export function getPoolTokenSupply(poolAddress: Address): BigInt {
  let poolContract = ClipperVerifiedExchange.bind(poolAddress);
  let poolTokenSupply = poolContract.totalSupply();

  return poolTokenSupply;
}

export function getPoolTokenValue(
  poolLiquidity: BigDecimal,
  totalSupply: BigInt,
  poolTokenAmount: BigInt
): BigDecimal {
  if (totalSupply.isZero()) return BIG_DECIMAL_ZERO;

  let poolTokenPercentage = poolTokenAmount
    .toBigDecimal()
    .div(totalSupply.toBigDecimal());
  let poolTokenValue = poolLiquidity.times(poolTokenPercentage);

  return poolTokenValue;
}
