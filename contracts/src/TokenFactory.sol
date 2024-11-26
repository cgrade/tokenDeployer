// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import { Ownable } from "@openzeppelin/access/Ownable.sol";
import { BaseERC20 } from "./BaseERC20.sol";

/// @title TokenFactory
/// @author Abraham Elijah (Mr. Grade)
/// @notice A factory contract for creating ERC20 tokens with various features.
contract TokenFactory is Ownable {
    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error TokenFactory__TokenIndexOutOfBound(uint256);

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    /// @dev Struct to hold information about created tokens.
    struct TokenInfo {
        address tokenAddress; // Address of the created token
        string name; // Name of the token
        string symbol; // Symbol of the token
        string tokenType; // Type of the token (e.g., ERC20)
        bool isMintable; // Indicates if the token is mintable
        bool isBurnable; // Indicates if the token is burnable
        bool isWhitelistingEnabled; // Indicates if whitelisting is enabled
        bool isTransferFeeEnabled; // Indicates if transfer fees are enabled
        address deployer; // Indicates the address that deployed the token.
    }

    // Maps user address to their tokens
    mapping(address => TokenInfo[]) public userTokens;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    // Event emitted when a new token is created
    event TokenCreated(
        address indexed creator,
        address indexed tokenAddress,
        string tokenType,
        string name,
        string symbol,
        uint256 initialSupply,
        uint8 decimalsValue,
        bool isMintable,
        bool isBurnable,
        bool isWhitelistingEnabled,
        bool isTransferFeeEnabled
    );

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Constructor to initialize the TokenFactory.
    constructor() Ownable(msg.sender) { }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Creates a new ERC20 token with specified parameters.
    /// @param name The name of the token.
    /// @param symbol The symbol of the token.
    /// @param initialSupply The initial supply of tokens.
    /// @param decimalsValue The number of decimals for the token.
    /// @param _isMintable Flag indicating if minting is enabled.
    /// @param _isBurnable Flag indicating if burning is enabled.
    /// @param _isWhitelistingEnabled Flag indicating if whitelisting is enabled.
    /// @param _isTransferFeeEnabled Flag indicating if transfer fees are enabled.
    /// @param _account This is the Account that deployed the ERC20 Token.
    /// @return The address of the newly created token.
    function createERC20(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimalsValue,
        bool _isMintable,
        bool _isBurnable,
        bool _isWhitelistingEnabled,
        bool _isTransferFeeEnabled,
        address _account
    ) public returns (address) {
        // Create a new BaseERC20 token
        BaseERC20 token = new BaseERC20(
            name,
            symbol,
            initialSupply,
            decimalsValue,
            _isMintable,
            _isBurnable,
            _isWhitelistingEnabled,
            _isTransferFeeEnabled,
            _account
        );

        // Create a TokenInfo struct to store token details
        TokenInfo memory tokenInfo = TokenInfo({
            tokenAddress: address(token),
            name: name,
            symbol: symbol,
            tokenType: "ERC20",
            isMintable: _isMintable,
            isBurnable: _isBurnable,
            isWhitelistingEnabled: _isWhitelistingEnabled,
            isTransferFeeEnabled: _isTransferFeeEnabled,
            deployer: _account
        });

        // Store the token information for the creator

        userTokens[msg.sender].push(tokenInfo);

        // Emit an event for the token creation
        emit TokenCreated(
            msg.sender,
            address(token),
            "ERC20",
            name,
            symbol,
            initialSupply,
            decimalsValue,
            _isMintable,
            _isBurnable,
            _isWhitelistingEnabled,
            _isTransferFeeEnabled
        );

        return address(token);
    }

    /// @notice Retrieves the tokens created by a specific user.
    /// @param user The address of the user.
    /// @return An array of TokenInfo structs containing the user's tokens.
    function getUserTokens(address user) public view returns (TokenInfo[] memory) {
        return userTokens[user];
    }

    /// @notice Retrieves information about a specific token created by a user.
    /// @param user The address of the user.
    /// @param index The index of the token in the user's token list.
    /// @return The TokenInfo struct containing the token's details.
    /// @dev Reverts if the index is out of bounds.
    function getTokenInfo(address user, uint256 index) public view returns (TokenInfo memory) {
        if (index >= userTokens[user].length) revert TokenFactory__TokenIndexOutOfBound(index);
        return userTokens[user][index];
    }
}
