import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { ClipperVerifiedExchange } from "../../types/FeeSplit/ClipperVerifiedExchange";
import { getUsdPrice } from "./prices";
import {
  fetchTokenBalance,
  fetchTokenDecimals,
  fetchTokenSymbol,
} from "./token";

export function getCurrentPoolLiquidity(poolId: string): BigDecimal {
  let poolAddress = Address.fromString(poolId);
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
        tokenAddress.toString(),
        poolAddress,
        tokenDecimals.toI32()
      );
      let tokenUsdPrice = getUsdPrice(tokenSymbol);
      let usdTokenLiquidity = tokenBalance.times(tokenUsdPrice);

      currentLiquidity = currentLiquidity.plus(usdTokenLiquidity);
    } else {
      log.info("Not able to fetch nToken {}", [i.toString()]);
    }
  }

  return currentLiquidity;
}

export function getPoolTokenSupply(poolId: string): BigInt {
  let poolAddress = Address.fromString(poolId);
  let poolContract = ClipperVerifiedExchange.bind(poolAddress);
  let poolTokenSupply = poolContract.totalSupply();

  return poolTokenSupply;
}
