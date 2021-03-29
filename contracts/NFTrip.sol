// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract NFTrip is ERC721, VRFConsumerBase {

    bytes32 public keyHash;
    address public vrfCoordinator;
    uint256 internal fee;

    uint public randomResult;

    struct Place{
        uint256 adventure;
        uint256 attractions;
        uint256 services;
        uint256 experience;
        string name;
    }
    Place[] public places;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) public
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721('MyTrip', 'MYT')  {
        vrfCoordinator = _VRFCoordinator;
        keyHash= _keyhash;
        fee = 0.1 * 10*18; //0.1 LINK
    }

    function requestRandomNumber(uint providedSeed, string memory _name) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyHash, fee, providedSeed);
        return requestId;
    }
        function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        uint256 newId = places.length;
        uint256 adventure = (randomNumber % 100);
        uint256 attractions = ((randomNumber % 10000) / 100 );
        uint256 services = ((randomNumber % 1000000) / 10000 );
        uint256 experience = ((randomNumber % 100000000) / 1000000 );

        places.push(
            Place(
                adventure,
                attractions,
                services,
                experience
            )
        );
        _safeMint(requestToSender[requestId], newId);
    }
}