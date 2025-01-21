// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CharityEvent.sol";

contract PlatformManager {
    struct CharityEventDetails {
        address contractAddress;
        string name;
    }

    CharityEventDetails[] public charityEvents;

    function createCharityEvent(string memory _name, uint256 _durationDays) public {
        CharityEvent newEvent = new CharityEvent(_name, msg.sender, _durationDays);
        charityEvents.push(CharityEventDetails(address(newEvent), _name));
    }

    function getCharityEvents() public view returns (CharityEventDetails[] memory) {
        return charityEvents;
    }
}
