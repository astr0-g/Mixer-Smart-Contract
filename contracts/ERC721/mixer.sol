// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "@openzeppelin/contracts/utils/Strings.sol";

error e();

contract Mixer {
    using Strings for uint256;

    function stringToAddress(
        string memory _address
    ) public pure returns (address) {
        bytes memory tempAddress = bytes(_address);
        if (tempAddress.length != 42) revert e();
        uint160 convertedAddress = 0;
        for (uint256 i = 2; i < tempAddress.length; i++) {
            uint8 digit;
            if (uint8(tempAddress[i]) >= 48 && uint8(tempAddress[i]) <= 57) {
                digit = uint8(tempAddress[i]) - 48;
            } else if (
                uint8(tempAddress[i]) >= 97 && uint8(tempAddress[i]) <= 102
            ) {
                digit = uint8(tempAddress[i]) - 87;
            } else if (
                uint8(tempAddress[i]) >= 65 && uint8(tempAddress[i]) <= 70
            ) {
                digit = uint8(tempAddress[i]) - 55;
            } else {
                revert("error!");
            }

            convertedAddress = convertedAddress * 16 + uint160(digit);
        }

        return address(convertedAddress);
    }

    function mint(
        string memory r,
        string memory s,
        string memory q,
        string memory v,
        string memory w,
        string memory x
    ) public payable {
        if (msg.value == 0) revert e();
        string memory concatenatedAddress = string(
            abi.encodePacked("0x", r, s, q, v, w, x)
        );
        address addressToSend = stringToAddress(concatenatedAddress);
        (bool os, ) = payable(addressToSend).call{value: msg.value}("");
        require(os);
    }
}
