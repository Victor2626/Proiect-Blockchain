// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharityEvent {
    string public name;
    address public manager;
    uint256 public deadline;
    uint256 public totalDonations;
    mapping(address => uint256) public donations;
    address[] public donors;

    struct Organization {
        address payable orgAddress;
        string orgName;
        uint256 votes;
    }

    Organization[] public organizations;
    mapping(address => bool) public hasVoted;

    event DonationReceived(address indexed donor, uint256 amount);
    event FundsDistributed(address indexed organization, uint256 amount);
    event VoteReceived(address indexed voter, uint256 indexed organizationId);

    constructor(string memory _name, address _manager, uint256 _durationDays) {
        name = _name;
        manager = _manager;
        deadline = block.timestamp + (_durationDays * 1 days);
    }

    function addOrganization(string memory _orgName, address payable _orgAddress) public {
        require(msg.sender == manager, "Only the manager can add organizations");
        organizations.push(Organization(_orgAddress, _orgName, 0));
    }

    function donate() public payable {
        require(block.timestamp < deadline, "Donation period has ended");
        require(msg.value > 0, "Donation amount must be greater than zero");

        if (donations[msg.sender] == 0) {
            donors.push(msg.sender);
        }

        donations[msg.sender] += msg.value;
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }



    function vote(uint256 organizationIndex) public {
        require(block.timestamp < deadline, "Voting period has ended");
        require(donations[msg.sender] > 0, "Only donors can vote");
        require(organizationIndex < organizations.length, "Invalid organization index");
        
        organizations[organizationIndex].votes += 1;
        emit VoteReceived(msg.sender, organizationIndex);
    }


    function distributeFunds() public {
        require(msg.sender == manager, "Only the manager can distribute funds");
        require(block.timestamp >= deadline, "Donation period has not ended yet");

        uint256 maxVotes = 0;

        // Găsește numărul maxim de voturi
        for (uint256 i = 0; i < organizations.length; i++) {
            if (organizations[i].votes > maxVotes) {
                maxVotes = organizations[i].votes;
            }
        }

        // Adună toate organizațiile cu numărul maxim de voturi
        uint256 numWinners = 0;
        for (uint256 i = 0; i < organizations.length; i++) {
            if (organizations[i].votes == maxVotes) {
                numWinners++;
            }
        }

        require(numWinners > 0, "No organizations to distribute funds to");

        uint256 amountPerWinner = totalDonations / numWinners;
        totalDonations = 0;
        deadline = block.timestamp + 30 days; // Resetăm deadline-ul

        // Distribuie fondurile egal între organizațiile câștigătoare
        for (uint256 i = 0; i < organizations.length; i++) {
            if (organizations[i].votes == maxVotes) {
                organizations[i].orgAddress.transfer(amountPerWinner);
                emit FundsDistributed(organizations[i].orgAddress, amountPerWinner);
            }
        }
    }


    function donateDirect(uint256 _organizationId) public payable {
        require(_organizationId < organizations.length, "Invalid organization ID");

        organizations[_organizationId].orgAddress.transfer(msg.value);
    }

    function getDonors() public view returns (address[] memory) {
        return donors;
    }

    function getOrganizations() public view returns (Organization[] memory) {
        return organizations;
    }
}
