import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { BigInt, Address } from "@graphprotocol/graph-ts";
import { FeesTaken } from "../types/FeeSplit/FeeSplit";
import { handleFeesTaken } from "../src/fee-split";
import { createFeesTakenEvent } from "./fee-split-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let entitledFeesInDollars = BigInt.fromI32(234);
    let averagePoolBalanceInDollars = BigInt.fromI32(234);
    let tokensTransferred = BigInt.fromI32(234);
    let newFeesTakenEvent = createFeesTakenEvent(
      entitledFeesInDollars,
      averagePoolBalanceInDollars,
      tokensTransferred
    );
    handleFeesTaken(newFeesTakenEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("ExampleEntity", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "entitledFeesInDollars",
      "234"
    );
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "averagePoolBalanceInDollars",
      "234"
    );
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "tokensTransferred",
      "234"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
