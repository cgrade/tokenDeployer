// test/AirdropContract.t.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Test, console } from "forge-std/Test.sol";
import { AirdropContract } from "../src/AirdropContract.sol";
import { IERC20 } from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { ERC20Mock } from "../lib/openzeppelin-contracts/contracts/mocks/token/ERC20Mock.sol"; // Assuming you have a mock ERC20 token

contract AirdropContractTest is Test {
    AirdropContract airdrop;
    ERC20Mock token;

    address owner = address(this);
    address addr1 = makeAddr("address1");
    address addr2 = makeAddr("address2");
    address addr3 = makeAddr("address3");
    address addr4 = makeAddr("address4");
    address addr5 = makeAddr("address5");

    function setUp() public {
        // Deploy the token and airdrop contract
        token = new ERC20Mock(); // Create a new mock ERC20 token
        airdrop = new AirdropContract(); // Create a new instance of the AirdropContract
        token.mint(address(this), 200e18); // Mint 200 tokens to the test contract
    }

    function testSetTokenCreator() public {
        // Test setting the token creator
        airdrop.setTokenCreator(address(token));
        assertEq(airdrop.tokenCreators(address(token)), owner); // Verify the token creator is set correctly
    }

    function testSetTokenCreatorRevertsIfAlreadySet() public {
        // Test that setting the token creator again reverts
        airdrop.setTokenCreator(address(token));
        vm.expectRevert(AirdropContract.AirdropContract__TokenCreatorAlreadySet.selector); // Expect revert message
        airdrop.setTokenCreator(address(token)); // Attempt to set again
    }

    function testSendAirdrop() public {
        // Test sending an airdrop to multiple recipients
        airdrop.setTokenCreator(address(token));
        token.transfer(address(airdrop), 100); // Transfer tokens to airdrop contract

        address[] memory recipients = new address[](5); // Create an array of recipients
        recipients[0] = addr1;
        recipients[1] = addr2;
        recipients[2] = addr3;
        recipients[3] = addr4;
        recipients[4] = addr5;
        console.log("Before Airdroping\n Balance was: ", token.balanceOf(address(airdrop))); // Log balance before airdrop
        airdrop.sendAirdrop(address(token), recipients, 1); // Send 1 token to each recipient
        console.log("After Airdroping\n Balance was: ", token.balanceOf(address(airdrop))); // Log balance after airdrop

        // Verify each recipient received the correct amount
        assertEq(token.balanceOf(addr1), 1);
        assertEq(token.balanceOf(addr2), 1);
        assertEq(token.balanceOf(addr3), 1);
        assertEq(token.balanceOf(addr4), 1);
        assertEq(token.balanceOf(addr5), 1);
        console.log(IERC20(token).balanceOf(address(airdrop))); // Log remaining balance in airdrop contract
    }

    function testSendAirdropRevertsIfNotTokenCreator() public {
        // Test that only the token creator can send an airdrop
        airdrop.setTokenCreator(address(token));
        token.transfer(address(airdrop), 100e18); // Transfer tokens to airdrop contract

        address[] memory recipients = new address[](2); // Create an array of recipients
        recipients[0] = addr1;
        recipients[1] = addr2;

        vm.prank(addr3); // Simulate addr3 calling the function
        vm.expectRevert(AirdropContract.AirdropContract__NotTokenCreator.selector); // Expect revert message
        airdrop.sendAirdrop(address(token), recipients, 10e18); // Attempt to send tokens
    }

    function testSendAirdropRevertsIfTransferFails() public {
        // Test that the airdrop fails if the transfer amount exceeds available tokens
        airdrop.setTokenCreator(address(token));
        token.transfer(address(airdrop), 20e18); // Transfer 20 tokens to airdrop contract

        address[] memory recipients = new address[](2); // Create an array of recipients
        recipients[0] = addr1;
        recipients[1] = addr2;

        vm.expectRevert(); // Expect revert due to insufficient balance
        airdrop.sendAirdrop(address(token), recipients, 30e18); // Attempt to send more than available
    }
}
