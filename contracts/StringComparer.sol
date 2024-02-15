// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

library StringComparer {
  function compare(string memory str1, string memory str2) internal pure returns (bool) {
    return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
  }
}