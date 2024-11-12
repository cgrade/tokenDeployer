// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TokenFactory.sol";

/// @title DeployTokenFactory
/// @notice A script to deploy the TokenFactory contract.
contract DeployTokenFactory is Script {
    /// @notice Deploys the TokenFactory contract.
    function run() external {
        // Start the broadcast to deploy the contract
        vm.startBroadcast();

        // Deploy the TokenFactory contract
        TokenFactory tokenFactory = new TokenFactory();

        // Log the address of the deployed contract
        console.log("TokenFactory deployed to:", address(tokenFactory));

        // Stop the broadcast
        vm.stopBroadcast();
    }
}
