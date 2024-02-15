// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import './Animal.sol';
import './HasName.sol';
import './StringComparer.sol';


abstract contract Herbivore is Animal, HasName {

  string constant PLANT = "plant";

  modifier eatOnlyPlant(string memory food) {
    require(StringComparer.compare(food, PLANT), "Can only eat plant food");
    _;
  }

  function eat(string memory food) pure virtual override public eatOnlyPlant(food) returns (string memory) {
    return super.eat(food);
  }
}