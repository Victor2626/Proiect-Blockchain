// PlatformManager contract (Solidity)
pragma solidity ^0.8.0;

import "./CharityEvent.sol";

contract PlatformManager {
    struct CharityEventDetails {
        address contractAddress;
        string name;
    }

    address public manager;
    CharityEventDetails[] public charityEvents;
    uint256 public totalCollected;

    event DonationReceived(address indexed donor, uint256 amount);
    event FundsDistributed(address indexed charityEvent, uint256 amount);

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can perform this action");
        _;
    }

    constructor() {
        manager = msg.sender;
    }

    function createCharityEvent(string memory _name) public onlyManager {
        CharityEvent newEvent = new CharityEvent(_name, msg.sender, 1);
        charityEvents.push(CharityEventDetails(address(newEvent), _name));
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        totalCollected += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function distributeFunds() public onlyManager {
        require(charityEvents.length > 0, "No charity events available");
        require(totalCollected > 0, "No funds to distribute");

        uint256 amountPerEvent = totalCollected / charityEvents.length;
        totalCollected = 0;

        for (uint256 i = 0; i < charityEvents.length; i++) {
            address payable charityEvent = payable(charityEvents[i].contractAddress);
            charityEvent.transfer(amountPerEvent);
            emit FundsDistributed(charityEvent, amountPerEvent);
        }
    }

    function getCharityEvents() public view returns (CharityEventDetails[] memory) {
        return charityEvents;
    }
}
