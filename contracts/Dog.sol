// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import './Omnivorous.sol';
import './StringComparer.sol';

contract Dog is Omnivorous {
    constructor(string memory name) HasName(name) {
    }

    function speak() pure override public returns (string memory) {
        return "Woof";
    }
}