// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTrip is ERC721, VRFConsumerBase {
    using SafeMath for uint256;
    using Strings for string;

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;
    address public LinkToken;

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
    mapping(bytes32 => uint256) requestToTokenId;
    
    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) public
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721('MyTrip', 'MYT')  {
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    function requestNewRandomPlace(uint256 userProvidedSeed, string memory place) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        ); 
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToPlaceName[requestId] = place;
        requestToSender[requestId] = msg.sender;    //Sender of this function will be the owner of the NFT;
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
                experience,
                requestToPlaceName[requestId]
            )
        );
        _safeMint(requestToSender[requestId], newId);
    }

    function getNumberOfPlaces() public view returns (uint256) {
        return places.length; 
    }

    function getPlaceStats(uint256 tokenId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            places[tokenId].adventure,
            places[tokenId].attractions,
            places[tokenId].services,
            places[tokenId].experience
        );
    }
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}