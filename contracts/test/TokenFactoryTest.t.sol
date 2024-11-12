// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/TokenFactory.sol";
import "../src/BaseERC20.sol";

/// @title TokenFactoryTest
/// @notice This contract contains tests for the TokenFactory contract.
contract TokenFactoryTest is Test {
    TokenFactory private factory; // Instance of the TokenFactory
    address private owner; // Address of the contract owner
    address private user; // Address of a user for testing

    /// @notice Sets up the test environment.
    /// @dev Initializes the owner and user addresses and deploys a new TokenFactory.
    function setUp() public {
        owner = address(this);
        user = address(0x123);
        factory = new TokenFactory();
    }

    /// @notice Tests the creation of an ERC20 token.
    /// @dev Verifies that a new token is created and stored in the user's tokens.
    function testCreateERC20() public {
        // Arrange
        string memory name = "TestToken";
        string memory symbol = "TTK";
        uint256 initialSupply = 1000e18;
        uint8 decimalsValue = 18;
        bool isMintable = true;
        bool isBurnable = true;
        bool isWhitelistingEnabled = true;
        bool isTransferFeeEnabled = true;

        // Act
        address tokenAddress = factory.createERC20(
            name,
            symbol,
            initialSupply,
            decimalsValue,
            isMintable,
            isBurnable,
            isWhitelistingEnabled,
            isTransferFeeEnabled
        );

        // Assert
        TokenFactory.TokenInfo[] memory tokens = factory.getUserTokens(owner);
        assertEq(tokens.length, 1); // Check if one token is created
        assertEq(tokens[0].tokenAddress, tokenAddress); // Check if the token address is correct
        assertEq(tokens[0].name, name); // Check if the token name is correct
        assertEq(tokens[0].symbol, symbol); // Check if the token symbol is correct
        assertEq(tokens[0].isMintable, isMintable); // Check if mintable status is correct
        assertEq(tokens[0].isBurnable, isBurnable); // Check if burnable status is correct
        assertEq(tokens[0].isWhitelistingEnabled, isWhitelistingEnabled); // Check if whitelisting status is correct
        assertEq(tokens[0].isTransferFeeEnabled, isTransferFeeEnabled); // Check if transfer fee status is correct
    }

    /// @notice Tests the retrieval of user tokens.
    /// @dev Verifies that the correct tokens are returned for a user.
    function testGetUserTokens() public {
        // Arrange
        string memory name = "TestToken1";
        string memory symbol = "TTK1";
        uint256 initialSupply = 1000e18;
        uint8 decimalsValue = 18;
        factory.createERC20(name, symbol, initialSupply, decimalsValue, true, true, true, true);

        string memory name2 = "TestToken2";
        string memory symbol2 = "TTK2";
        factory.createERC20(name2, symbol2, initialSupply, decimalsValue, false, false, false, false);

        // Act
        TokenFactory.TokenInfo[] memory tokens = factory.getUserTokens(owner);

        // Assert
        assertEq(tokens.length, 2); // Check if two tokens are created
        assertEq(tokens[0].name, name); // Check first token name
        assertEq(tokens[1].name, name2); // Check second token name
    }

    /// @notice Tests the retrieval of specific token information.
    /// @dev Verifies that the correct token information is returned for a given index.
    function testGetTokenInfo() public {
        // Arrange
        string memory name = "TestToken";
        string memory symbol = "TTK";
        uint256 initialSupply = 1000e18;
        uint8 decimalsValue = 18;
        factory.createERC20(name, symbol, initialSupply, decimalsValue, true, true, true, true);

        // Act
        TokenFactory.TokenInfo memory tokenInfo = factory.getTokenInfo(owner, 0);

        // Assert
        assertEq(tokenInfo.name, name); // Check token name
        assertEq(tokenInfo.symbol, symbol); // Check token symbol
        assertEq(tokenInfo.tokenType, "ERC20"); // Check token type
    }

    /// @notice Tests the retrieval of token information with an out-of-bounds index.
    /// @dev Verifies that the correct error is thrown when accessing an invalid index.
    function testGetTokenInfoOutOfBounds() public {
        // Arrange
        factory.createERC20("TestToken", "TTK", 1000e18, 18, true, true, true, true);

        // Act & Assert
        vm.expectRevert("Token index out of bounds");
        factory.getTokenInfo(owner, 1); // Attempt to access an out-of-bounds index
    }
}

