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
        token = new ERC20Mock();
        airdrop = new AirdropContract();
        token.mint(address(this), 200e18);
    }

    function testSetTokenCreator() public {
        airdrop.setTokenCreator(address(token));
        assertEq(airdrop.tokenCreators(address(token)), owner);
    }

    function testSetTokenCreatorRevertsIfAlreadySet() public {
        airdrop.setTokenCreator(address(token));
        vm.expectRevert("Token creator already set");
        airdrop.setTokenCreator(address(token));
    }

    function testSendAirdrop() public {
        airdrop.setTokenCreator(address(token));
        token.transfer(address(airdrop), 100); // Transfer tokens to airdrop contract

        address[] memory recipients = new address[](5);
        recipients[0] = addr1;
        recipients[1] = addr2;
        recipients[2] = addr3;
        recipients[3] = addr4;
        recipients[4] = addr5;
        console.log("Before Airdroping\n Balance was: ", token.balanceOf(address(airdrop)));
        airdrop.sendAirdrop(address(token), recipients, 1);
        console.log("After Airdroping\n Balance was: ", token.balanceOf(address(airdrop)));

        assertEq(token.balanceOf(addr1), 1);
        assertEq(token.balanceOf(addr2), 1);
        assertEq(token.balanceOf(addr3), 1);
        assertEq(token.balanceOf(addr4), 1);
        assertEq(token.balanceOf(addr5), 1);
        console.log(IERC20(token).balanceOf(address(airdrop)));
    }

    function testSendAirdropRevertsIfNotTokenCreator() public {
        airdrop.setTokenCreator(address(token));
        token.transfer(address(airdrop), 100e18); // Transfer tokens to airdrop contract

        address[] memory recipients = new address[](2);
        recipients[0] = addr1;
        recipients[1] = addr2;

        vm.prank(addr3); // Simulate addr1 calling the function
        vm.expectRevert(AirdropContract.AirdropContract__NotTokenCreator.selector);
        airdrop.sendAirdrop(address(token), recipients, 10e18);
    }

    function testSendAirdropRevertsIfTransferFails() public {
        airdrop.setTokenCreator(address(token));
        token.transfer(address(airdrop), 20e18); // Transfer 20 tokens to airdrop contract

        address[] memory recipients = new address[](2);
        recipients[0] = addr1;
        recipients[1] = addr2;

        vm.expectRevert();
        airdrop.sendAirdrop(address(token), recipients, 30e18); // Trying to send more than available
    }
}
