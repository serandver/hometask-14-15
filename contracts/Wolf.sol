// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import './Predator.sol';
import './StringComparer.sol';

contract Wolf is Predator {
    constructor(string memory name) HasName(name) {
    }
  
    function speak() pure override public returns (string memory) {
        return "Awoo";
    }
}