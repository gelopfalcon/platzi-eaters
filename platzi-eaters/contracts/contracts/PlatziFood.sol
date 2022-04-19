//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PlatziFood {
    constructor() {}

    struct PlatziFoodItem {
        address owner;
        string foodUrl;
        string foodName;
        string originCountry;
    }

    PlatziFoodItem[] private platziFoods;

    function addPlatziFood(
        string memory foodUrl,
        string memory foodName,
        string memory originCountry
    ) public {
        platziFoods.push(
            PlatziFoodItem(msg.sender, foodUrl, foodName, originCountry)
        );
    }

    function getAllPlatziFoods() public view returns (PlatziFoodItem[] memory) {
        return platziFoods;
    }

    function getPlatziFoodsByOwner(address owner)
        public
        view
        returns (PlatziFoodItem[] memory)
    {
        PlatziFoodItem[] memory myfoods;
        for (uint256 i = 0; i < platziFoods.length; i++) {
            if (platziFoods[i].owner == owner) {
                myfoods[i] = platziFoods[i];
            }
        }

        return myfoods;
    }
}
