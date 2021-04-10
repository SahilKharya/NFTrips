// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract NFTrip is ERC721, VRFConsumerBase {

    bytes32 internal keyHash;
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

    mapping(bytes32 => string) requestToPlaceName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint) requestToTokenId;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) public
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721('MyTrip', 'MYT')  {
        vrfCoordinator = _VRFCoordinator;
        keyHash= _keyhash;
        fee = 0.1 * 10*18; //0.1 LINK
    }

    function requestRandomNumber(uint providedSeed, string memory _place) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyHash, fee, providedSeed);
        requestToPlaceName[requestId] = _place;
        requestToSender[requestId] = msg.sender;    //Sender of this function will be the owner of the NFT;
        return requestId;
    }
        function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        uint256 placeId = places.length;
        uint256 adventure = (randomNumber % 100);
        uint256 attractions = ((randomNumber % 10000) / 100 );
        uint256 services = ((randomNumber % 1000000) / 10000 );
        uint256 experience = ((randomNumber % 100000000) / 1000000 );

        places.push(
            Place(
                adventure,
                attractions,
                services,
                experience,
                requestToPlaceName[requestId]
            )
        );
        _safeMint(requestToSender[requestId], placeId);
    }
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenUri(uint _tokenId, string memory _tokenURI) public {
        require(_isApprovedOrOwner(_msgSender(), _tokenId),"ERC721: transfer caller is not owner nor approved");
        _setTokenURI(_tokenId, _tokenURI);
    }
}