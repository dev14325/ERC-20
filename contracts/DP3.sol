// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DP3Token is ERC20 {
     constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 10 * 10 ** 18);
    }


}
