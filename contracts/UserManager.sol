pragma solidity ^0.8.0;

import "./ReputationSystem.sol";

contract UserManager {
    ReputationSystem public reputationSystem;

    struct User {
        address userAddress;
        string username;
    }

    mapping(address => User) public users;
    address[] public userList;

    constructor(address _reputationSystemAddress) {
        reputationSystem = ReputationSystem(_reputationSystemAddress);
    }

    function addUser(string memory _username) public {
        require(users[msg.sender].userAddress == address(0), "User already exists");
        users[msg.sender] = User(msg.sender, _username);
        userList.push(msg.sender);
    }

    function getReputation(address _user) public view returns (uint256) {
        return reputationSystem.getReputation(_user);
    }

    function giveFeedback(address _to, uint256 _points) public {
        require(users[msg.sender].userAddress != address(0), "You must register first");
        reputationSystem.giveFeedback(_to, _points);
    }

    function getAllUsers() public view returns (address[] memory) {
        return userList;
    }
}
