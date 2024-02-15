// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import './Animal.sol';
import './HasName.sol';
import './StringComparer.sol';

abstract contract Omnivorous is Animal, HasName {

    string constant PLANT = "plant";
    string constant MEAT = "meat";

    modifier eatOnlyMeatAndPlant(string memory food) {
        bool plantOrMeat = StringComparer.compare(food, MEAT) || StringComparer.compare(food, PLANT);
        require(plantOrMeat, "Can only eat meat or plant food");
        _;
    }

    function eat(string memory food) pure virtual override public eatOnlyMeatAndPlant(food) returns (string memory) {
        return super.eat(food);
    }
}