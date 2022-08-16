import { Address, BigDecimal, BigInt, TypedMap } from "@graphprotocol/graph-ts";
import { convertTokenToDecimal } from ".";
import { AggregatorV3Interface } from "../../types/FeeSplit/AggregatorV3Interface";
import { PriceOracleAddresses, ADDRESS_ZERO } from "../constants/addresses";

export function getUsdPrice(tokenSymbol: string): BigDecimal {
  let priceOracleAddress = PriceOracleAddresses.get(tokenSymbol);
  let oracleAddressString = priceOracleAddress
    ? priceOracleAddress.toString()
    : ADDRESS_ZERO;

  let oracleAddress = Address.fromString(oracleAddressString);
  let oracleContract = AggregatorV3Interface.bind(oracleAddress);
  let answer = oracleContract.latestRoundData();
  let decimals = oracleContract.decimals();
  let price = answer.value1;

  let usdValue = convertTokenToDecimal(price, BigInt.fromI32(decimals));

  return usdValue;
}
