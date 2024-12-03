// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    // Struct și alte variabile
    struct Feedback {
        uint256 points;
        uint256 timestamp;
    }

    mapping(address => Feedback[]) public feedbacks;
    mapping(address => uint256) public reputation;

    // Constructor
    constructor() {}

    // Funcții publice
    function giveFeedback(address _to, uint256 _points) public {
        feedbacks[_to].push(Feedback(_points, block.timestamp));
        reputation[_to] += _points;
    }

    function getReputation(address _user) public view returns (uint256) {
        return reputation[_user];
    }
}
