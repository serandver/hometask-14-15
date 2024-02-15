// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import './Animal.sol';
import './HasName.sol';
import './StringComparer.sol';

abstract contract Predator is Animal, HasName {

  string constant MEAT = "meat";

  modifier eatOnlyMeat(string memory food) {
    require(StringComparer.compare(food, MEAT), "Can only eat meat food");
    _;
  }

  function eat(string memory food) pure virtual override public eatOnlyMeat(food) returns (string memory) {
    return super.eat(food);
  }
}