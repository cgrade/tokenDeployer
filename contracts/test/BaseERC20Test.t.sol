// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/BaseERC20.sol";

/// @title BaseERC20Test
/// @notice This contract contains tests for the BaseERC20 token contract.
contract BaseERC20Test is Test {
    BaseERC20 private token; // Instance of the BaseERC20 token
    address private owner; // Address of the contract owner
    address private user; // Address of a user for testing

    /// @notice Sets up the test environment.
    /// @dev Initializes the owner and user addresses and deploys a new BaseERC20 token.
    function setUp() public {
        owner = address(this);
        user = address(0x123);
        token = new BaseERC20("TestToken", "TTK", 1000e18, 18, true, true, true, true);
    }

    /// @notice Tests the minting of tokens.
    /// @dev Verifies that the owner's balance increases after minting tokens.
    function testMint() public {
        // Arrange
        uint256 initialBalance = token.balanceOf(owner);

        // Act
        token.mint(owner, 100e18);

        // Assert
        assertEq(token.balanceOf(owner), initialBalance + 100e18);
    }

    /// @notice Tests the burning of tokens.
    /// @dev Verifies that the owner's balance decreases after burning tokens.
    function testBurn() public {
        // Arrange
        token.mint(owner, 100e18);
        uint256 initialBalance = token.balanceOf(owner);

        // Act
        token.burn(50e18);

        // Assert
        assertEq(token.balanceOf(owner), initialBalance - 50e18);
    }

    /// @notice Tests the whitelisting of an address.
    /// @dev Verifies that a user can be whitelisted and is recognized as such.
    function testWhitelistAddress() public {
        // Arrange & Act
        token.whitelistAddress(user);

        // Assert
        assertTrue(token.isWhitelisted(user));
    }

    /// @notice Tests the removal of an address from the whitelist.
    /// @dev Verifies that a user can be removed from the whitelist and is no longer recognized as such.
    function testRemoveWhitelistAddress() public {
        // Arrange
        token.whitelistAddress(user);

        // Act
        token.removeWhitelistAddress(user);

        // Assert
        assertFalse(token.isWhitelisted(user));
    }

    /// @notice Tests the transfer of tokens with a fee for whitelisted addresses.
    /// @dev Verifies that a whitelisted user can receive tokens.
    function testTransferWithFee() public {
        // Arrange
        token.whitelistAddress(user); // Whitelist the user
        token.mint(owner, 1000e18); // Mint tokens to the owner

        // Act
        token.transfer(user, 100e18); // Transfer tokens to the user

        // Assert
        assertEq(token.balanceOf(user), 100e18); // Check if the user's balance is correct
    }

    /// @notice Tests the transfer of tokens without a fee for non-whitelisted addresses.
    /// @dev Verifies that a non-whitelisted user can receive tokens.
    function testTransferWithoutFee() public {
        // Arrange
        token.mint(owner, 1000e18); // Mint tokens to the owner

        // Act
        token.transfer(user, 100e18); // Transfer tokens to the user

        // Assert
        assertEq(token.balanceOf(user), 100e18); // Check if the user's balance is correct
    }
}
