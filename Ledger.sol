// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Ledger {
    mapping(address => uint256) public balances;
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
    }
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}