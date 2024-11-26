// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/token/ERC20/IERC20.sol";

/// @title AirdropContract
/// @author Abraham Elijah (Mr. Grade)
/// @notice This contract allows the creator of an ERC20 token to send airdrops to multiple recipients.
/// @dev The contract maintains a mapping of token creators to their respective token addresses.
contract AirdropContract {
    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error AirdropContract__TransferFailed(address recipient, uint256 amount);
    error AirdropContract__NotTokenCreator();
    error AirdropContract__TokenCreatorAlreadySet();

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/
    // Mapping to store the token creator for each token address
    mapping(address => address) public tokenCreators;

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/
    /// @dev Modifier to restrict access to the token creator.
    modifier onlyTokenCreator(address token) {
        if (msg.sender != tokenCreators[token]) revert AirdropContract__NotTokenCreator();
        _;
    }

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    // Event emitted when a token creator is set
    event TokenCreatorSet(address indexed token, address indexed creator);
    // Event emitted when an airdrop is sent
    event AirdropSent(address indexed token, address indexed sender, address[] recipients, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR FUNCTION
    //////////////////////////////////////////////////////////////*/
    /// @notice Constructor for the AirdropContract.
    constructor() { }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    /// @notice Sets the token creator for a specific token.
    /// @param token The address of the ERC20 token.
    /// @dev Can only be called by the token creator once per token.
    function setTokenCreator(address token) external {
        // Ensure that the token creator can only set their own token
        if (tokenCreators[token] != address(0)) revert AirdropContract__TokenCreatorAlreadySet();
        tokenCreators[token] = msg.sender;

        emit TokenCreatorSet(token, msg.sender); // Emit event for setting token creator
    }

    /// @notice Sends an airdrop of tokens to multiple recipients.
    /// @param token The address of the ERC20 token to be airdropped.
    /// @param _recipients An array of addresses to receive the airdrop.
    /// @param _amount The amount of tokens each recipient will receive.
    /// @dev Can only be called by the token creator of the specified token.
    function sendAirdrop(address token, address[] memory _recipients, uint256 _amount)
        external
        onlyTokenCreator(token)
    {
        _batchTransfer(token, _recipients, _amount);
        emit AirdropSent(token, msg.sender, _recipients, _amount); // Emit event for airdrop
    }

    /*//////////////////////////////////////////////////////////////
                           INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Internal function to batch transfer tokens to multiple recipients.
    /// @param token The address of the ERC20 token to be transferred.
    /// @param _recipients An array of addresses to receive the tokens.
    /// @param _amount The amount of tokens each recipient will receive.
    function _batchTransfer(address token, address[] memory _recipients, uint256 _amount) internal {
        for (uint256 i = 0; i < _recipients.length; i++) {
            bool success = _transfer(token, _recipients[i], _amount);
            if (!success) revert AirdropContract__TransferFailed(_recipients[i], _amount);
        }
    }

    /// @notice Internal function to transfer tokens to a recipient.
    /// @param token The address of the ERC20 token to be transferred.
    /// @param recipient The address of the recipient.
    /// @param amount The amount of tokens to transfer.
    function _transfer(address token, address recipient, uint256 amount) internal returns (bool) {
        // Use the ERC20 token interface to transfer tokens
        bool success = IERC20(token).transfer(recipient, amount);
        if (!success) revert AirdropContract__TransferFailed(recipient, amount);
        return success;
    }
}
