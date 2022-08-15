import { Address, BigDecimal, BigInt, TypedMap } from "@graphprotocol/graph-ts";
import { convertTokenToDecimal } from ".";
import { AggregatorV3Interface } from "../../types/FeeSplit/AggregatorV3Interface";
import {
  FallbackAssetPrice,
  PriceOracleAddresses,
} from "../constants/addresses";
import { ADDRESS_ZERO } from "../constants";

export function getUsdPrice(tokenSymbol: string): BigDecimal {
  let priceOracleAddress = PriceOracleAddresses.get(tokenSymbol);
  let oracleAddressString = priceOracleAddress
    ? priceOracleAddress.toString()
    : ADDRESS_ZERO;
  let oracleValueExist = PriceOracleAddresses.isSet(tokenSymbol);
  let fallbackExist = FallbackAssetPrice.isSet(tokenSymbol);

  if (
    (!oracleValueExist || oracleAddressString === ADDRESS_ZERO) &&
    fallbackExist
  ) {
    let fallbackPrice = FallbackAssetPrice.get(tokenSymbol);
    return BigDecimal.fromString(
      fallbackPrice ? fallbackPrice.toString() : "1"
    );
  }

  if (
    (!oracleValueExist || oracleAddressString === ADDRESS_ZERO) &&
    !fallbackExist
  )
    return BigDecimal.fromString("1");

  let oracleAddress = Address.fromString(oracleAddressString);
  let oracleContract = AggregatorV3Interface.bind(oracleAddress);
  let answer = oracleContract.latestRoundData();
  let decimals = oracleContract.decimals();
  let price = answer.value1;

  let usdValue = convertTokenToDecimal(price, BigInt.fromI32(decimals));

  return usdValue;
}
