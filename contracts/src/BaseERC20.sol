// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/token/ERC20/ERC20.sol";
import { IERC20 } from "@openzeppelin/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/access/Ownable.sol";
import { Pausable } from "@openzeppelin/utils/Pausable.sol";

/// @title BaseERC20
/// @author Abraham Elijah (Mr. Grade)
/// @notice  A modular ERC20 token implementation with minting, burning, whitelisting, and transfer fee features.
contract BaseERC20 is ERC20, Ownable {
    /*//////////////////////////////////////////////////////////////
                                 CUSTOM ERROR
    //////////////////////////////////////////////////////////////*/
    error MintingDisabled();
    error WhitelistingDisabled();
    error InvalidTransferFee();
    error AddressNotWhitelisted();
    error BurningDisabled();

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/
    bool public isMintable;
    bool public isBurnable;
    bool public isWhitelistingEnabled; // Flag for whitelisting
    bool public isTransferFeeEnabled; // Flag for transfer fee
    uint8 private _decimals;
    address private deployer;

    // Constants for gas optimization
    uint256 private constant BASIS_POINTS = 10000; // Basis points for fee calculations
    uint256 private constant TRANSFER_FEE = 100; // 100 = 1%

    // Whitelist
    mapping(address => bool) public isWhitelisted;

    /*//////////////////////////////////////////////////////////////
                            EVENTS
    //////////////////////////////////////////////////////////////*/
    event AddressWhitelisted(address indexed account);
    event AddressRemovedFromWhitelist(address indexed account);

    /*//////////////////////////////////////////////////////////////
                          CONSTRUCTOR FUNCTION
    //////////////////////////////////////////////////////////////*/

    /// @notice Constructor to initialize the token with specified parameters.
    /// @param name The name of the token.
    /// @param symbol The symbol of the token.
    /// @param initialSupply The initial supply of tokens.
    /// @param decimalsValue The number of decimals for the token.
    /// @param _isMintable Flag indicating if minting is enabled.
    /// @param _isWhitelistingEnabled Flag indicating if whitelisting is enabled.
    /// @param _isTransferFeeEnabled Flag indicating if transfer fees are enabled.
    /// @param _account.
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimalsValue,
        bool _isMintable,
        bool _isBurnable,
        bool _isWhitelistingEnabled,
        bool _isTransferFeeEnabled,
        address _account
    ) ERC20(name, symbol) Ownable(_account) {
        isMintable = _isMintable;
        isBurnable = _isBurnable;
        isWhitelistingEnabled = _isWhitelistingEnabled;
        isTransferFeeEnabled = _isTransferFeeEnabled;
        _decimals = decimalsValue;
        deployer = _account;

        if (initialSupply > 0) {
            _mint(deployer, initialSupply * (10 ** decimalsValue));
        }
        _transferOwnership(deployer);
    }

    /*//////////////////////////////////////////////////////////////
                            PUBLIC FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    /// @notice Returns the number of decimals used for the token.
    /// @return The number of decimals.
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    /// @notice Mints new tokens to a specified address.
    /// @param to The address to mint tokens to.
    /// @param amount The amount of tokens to mint.
    /// @dev Can only be called by the owner if minting is enabled.
    function mint(address to, uint256 amount) public onlyOwner {
        if (!isMintable) revert MintingDisabled();
        _mint(to, amount);
    }

    /// @notice Burns a specified amount of tokens from the caller's account.
    /// @param amount The amount of tokens to burn.
    /// @dev Can only be called if burning is enabled.
    function burn(uint256 amount) public {
        if (!isBurnable) revert BurningDisabled();

        _burn(msg.sender, amount);
    }

    /// @notice Whitelists an address.
    /// @param account The address to whitelist.
    /// @dev Can only be called by the owner if whitelisting is enabled.
    function whitelistAddress(address account) public onlyOwner {
        if (!isWhitelistingEnabled) revert WhitelistingDisabled();
        isWhitelisted[account] = true;
        emit AddressWhitelisted(account);
    }

    /// @notice Removes an address from the whitelist.
    /// @param account The address to remove from the whitelist.
    /// @dev Can only be called by the owner if whitelisting is enabled.
    function removeWhitelistAddress(address account) public onlyOwner {
        if (!isWhitelistingEnabled) revert WhitelistingDisabled();
        isWhitelisted[account] = false;
        emit AddressRemovedFromWhitelist(account);
    }

    function tokenTransfer(address sender, address recipient, uint256 amount) external {
        _transfer(sender, recipient, amount);
    }

    /*//////////////////////////////////////////////////////////////
                           INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    /// @notice Internal function to transfer tokens, including transfer fee logic.
    /// @param sender The address sending the tokens.
    /// @param recipient The address receiving the tokens.
    /// @param amount The amount of tokens to transfer.
    /// @dev Overrides the internal transfer function to include transfer fee logic.
    function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
        uint256 fee = 0;

        if (isTransferFeeEnabled && !isWhitelisted[sender] && TRANSFER_FEE > 0) {
            fee = (amount * TRANSFER_FEE) / BASIS_POINTS; // Calculate fee
            super._transfer(sender, address(this), fee); // Transfer fee to contract
        }

        super._transfer(sender, recipient, amount - fee); // Transfer remaining amount
    }
}
