// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Digilocker is ERC721Enumerable, AccessControl, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct Certificate {
        string name;
        string course;
        string date;
        string issuer;
        uint256 validUntil;
    }

    mapping(uint256 => Certificate) private _certificates;

    constructor() ERC721("Digilocker", "DIGI") Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment(); // Ensure we start token IDs from 1
    }

    function mintCertificate(
        address recipient, 
        string memory name,
        string memory course,
        string memory date,
        string memory issuer,
        uint256 validUntilTimestamp
    )
        external
        onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        uint256 newTokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(recipient, newTokenId); // Mint to the specified recipient's address
        _certificates[newTokenId] = Certificate(name, course, date, issuer, validUntilTimestamp);
        return newTokenId;
    }

    function batchMintCertificate(
        address[] memory recipients,
        string[] memory names,
        string[] memory courses,
        string[] memory dates,
        string[] memory issuers,
        uint256[] memory validUntilTimestamps
    ) external onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        require(
            recipients.length == names.length &&
                names.length == courses.length &&
                courses.length == dates.length &&
                dates.length == issuers.length &&
                issuers.length == validUntilTimestamps.length,
            "Mismatched array lengths"
        );

        uint256[] memory newTokenIds = new uint256[](recipients.length);

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 newTokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();

            _safeMint(recipients[i], newTokenId);
            _certificates[newTokenId] = Certificate(
                names[i],
                courses[i],
                dates[i],
                issuers[i],
                validUntilTimestamps[i]
            );

            newTokenIds[i] = newTokenId;
        }

        return newTokenIds;
    }

    function isCertificateValid(uint256 tokenId) external view returns (bool) {
        // Check if the token exists by checking if ownerOf does not revert
        try this.ownerOf(tokenId) returns (address) {
            Certificate memory cert = _certificates[tokenId];
            return (block.timestamp <= cert.validUntil);
        } catch {
            revert("Token ID does not exist");
        }
    }

    function getCertificateDetails(uint256 tokenId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        // Ensure the token exists
        try this.ownerOf(tokenId) returns (address) {
            Certificate memory cert = _certificates[tokenId];
            return (cert.name, cert.course, cert.date, cert.issuer);
        } catch {
            revert("Token ID does not exist");
        }
    }

    function verifyCertificate(uint256 tokenId) external view returns (bool) {
        // Attempt to get the owner of the tokenId to check existence
        try this.ownerOf(tokenId) returns (address) {
            return true; // If this line is reached, the token exists
        } catch {
            return false; // If ownerOf reverts, the token does not exist
        }
    }

    function addMinter(address minterAddress) external onlyOwner {
        grantRole(MINTER_ROLE, minterAddress);
    }

    function removeMinter(address minterAddress) external onlyOwner {
        revokeRole(MINTER_ROLE, minterAddress);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
