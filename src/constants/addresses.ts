import { Address, TypedMap } from "@graphprotocol/graph-ts";

export let clipperExchangeAddress = Address.fromString(
  "0xe7b0ce0526fbe3969035a145c9e9691d4d9d216c"
);

export let PriceOracleAddresses = new TypedMap<string, string>();
PriceOracleAddresses.set("WETH", "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"); // eth / usd chainlink oracle
PriceOracleAddresses.set("EARTH", "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"); // eth / usd chainlink oracle
PriceOracleAddresses.set("ERTH", "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"); // eth / usd chainlink oracle
PriceOracleAddresses.set("WBTC", "0xf4030086522a5beea4988f8ca5b36dbc97bee88c"); // wbtc / usd cahainlink oracle
PriceOracleAddresses.set("DAI", "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9"); // dai / usd chainlink oracle
PriceOracleAddresses.set("USDC", "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6"); // usdc / usd chainlink oracle
PriceOracleAddresses.set("USDT", "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D"); // usdt / usd chainlink oracle

export let FallbackAssetPrice = new TypedMap<string, string>();
FallbackAssetPrice.set("GLMR", "2.74");
FallbackAssetPrice.set("MOVR", "53.88");
FallbackAssetPrice.set("WETH", "2948.37");
FallbackAssetPrice.set("USDT", "1");
FallbackAssetPrice.set("DAI", "1");
FallbackAssetPrice.set("USDC", "1");
FallbackAssetPrice.set("WBTC", "41741.74");
FallbackAssetPrice.set("GYEN", "0.008391");
FallbackAssetPrice.set("MATIC", "1.52");
FallbackAssetPrice.set("WMATIC", "1.52");
FallbackAssetPrice.set("DOT", "19.03");
FallbackAssetPrice.set("LINK", "14.91");

export let AddressZeroSymbol = "ETH";
export let AddressZeroAddress = "0x0000000000000000000000000000000000000000";
export let AddressZeroDecimals = "18";
export let AddressZeroName = "Ether";
