// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;


contract HasName {
  string internal _name;

  constructor(string memory name) {
    _name = name;
  }

  function getName() view public returns(string memory name) {
    return _name;
  }
}