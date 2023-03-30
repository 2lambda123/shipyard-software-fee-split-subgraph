import { Address, TypedMap } from "@graphprotocol/graph-ts";

export let CLIPPER_EXCHANGE_ADDRESS_BY_FEE_SPLIT = new TypedMap<
  string, //lowercase address of fee split
  string
>();
CLIPPER_EXCHANGE_ADDRESS_BY_FEE_SPLIT.set(
  "0x51b0efa27ff4f29f8315496f01952377d581ce73".toLowerCase(), // v4 fee split
  "0xe7b0ce0526fbe3969035a145c9e9691d4d9d216c" // v3 verified caravel
);
CLIPPER_EXCHANGE_ADDRESS_BY_FEE_SPLIT.set(
  "0x84f4625C3E92b368E403cB002A9bF9bc7a9ae1b9".toLowerCase(), // v5 protocol deposit
  "0x655eDCE464CC797526600a462A8154650EEe4B77" // v5 approx caravel
);

export function getExchangeAddress(feeSplitAddress: Address): Address {
  let exchangeAddress = CLIPPER_EXCHANGE_ADDRESS_BY_FEE_SPLIT.get(
    feeSplitAddress.toHexString().toLowerCase()
  );
  return Address.fromString(
    exchangeAddress
      ? exchangeAddress
      : "0xe7b0ce0526fbe3969035a145c9e9691d4d9d216c"
  );
}

export let PriceOracleAddresses = new TypedMap<string, string>();
PriceOracleAddresses.set("WETH", "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"); // eth / usd chainlink oracle
PriceOracleAddresses.set("WBTC", "0xf4030086522a5beea4988f8ca5b36dbc97bee88c"); // wbtc / usd cahainlink oracle
PriceOracleAddresses.set("DAI", "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9"); // dai / usd chainlink oracle
PriceOracleAddresses.set("USDC", "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6"); // usdc / usd chainlink oracle
PriceOracleAddresses.set("USDT", "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D"); // usdt / usd chainlink oracle

export let AddressZeroSymbol = "ETH";
export let AddressZeroAddress = "0x0000000000000000000000000000000000000000";
export let AddressZeroDecimals = "18";
export let AddressZeroName = "Ether";

export let ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
