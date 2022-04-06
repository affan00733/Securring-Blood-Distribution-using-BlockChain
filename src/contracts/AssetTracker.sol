// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

library AssetLibrary {
    struct Status {
        uint256 time;
        string status;
        string owner;
        uint256 verified;
    }
    struct Blood {
        uint256 id;
        string uniqueid;
        string batch;
        string aadhar;
        string currentPosition;
        string blood_group;
        string expiry_date;
        uint256 verified;
        uint256 statusCount;
        mapping(uint256 => Status) status;
    }

    struct Login {
        // uint id;
        address payable user_address;
        string email;
        string password;
        string name;
        string typeID;
        string addressUser;
        string phone;
        string location;
    }
}

contract AssetTracker {
    mapping(uint256 => AssetLibrary.Blood) public BloodStore;

    uint256 public bloodCount = 0;

    function createAsset(
        string memory _uniqueid,
        string memory _batch,
        string memory _aadhar,
        string memory _currentPosition,
        string memory _blood_group,
        string memory _expiry_date,
        string memory _status
    ) public returns (uint256) {
        bloodCount++;
        BloodStore[bloodCount] = AssetLibrary.Blood(
            bloodCount,
            _uniqueid,
            _batch,
            _aadhar,
            _currentPosition,
            _blood_group,
            _expiry_date,
            0,
            0
        );
        BloodStore[bloodCount].statusCount++;
        BloodStore[bloodCount].status[
            BloodStore[bloodCount].statusCount
        ] = AssetLibrary.Status(block.timestamp, _status, _currentPosition, 0);
        emit BloodCreate(bloodCount, _currentPosition, _status, 0);
    }

    function getBlood(uint256 _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            BloodStore[_id].uniqueid,
            BloodStore[_id].batch,
            BloodStore[_id].aadhar,
            BloodStore[_id].currentPosition,
            BloodStore[_id].blood_group,
            BloodStore[_id].expiry_date
        );
    }

    function getBlood2(uint256 _id) public view returns (uint256, uint256) {
        return (BloodStore[_id].verified, BloodStore[_id].statusCount);
    }

    function transferAsset(
        uint256 _id,
        string memory _oldUser,
        uint256 verified,
        string memory _status,
        string memory _newUser
    ) public returns (string memory) {
        require(
            sha256(
                abi.encodePacked(
                    (BloodStore[_id].status[BloodStore[_id].statusCount].owner)
                )
            ) == sha256(abi.encodePacked((_oldUser)))
        );
        BloodStore[_id].statusCount++;
        BloodStore[_id].status[BloodStore[_id].statusCount] = AssetLibrary
            .Status(block.timestamp, _status, _newUser, verified);
        emit BloodTransfer(_id, _newUser, verified, _status);
    }

    function getBloodCount() public view returns (uint256) {
        return bloodCount;
    }

    function getStatus(uint256 _id, uint256 _statusCount)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            uint256
        )
    {
        AssetLibrary.Status memory s = BloodStore[_id].status[_statusCount];
        return (s.time, s.status, s.owner, s.verified);
    }

    event BloodTransfer(
        uint256 id,
        string newOwner,
        uint256 verified,
        string status
    );

    event BloodCreate(
        uint256 id,
        string currentPosition,
        string status,
        uint256 verified
    );

    mapping(address => AssetLibrary.Login) public LoginStore;
    mapping(string => string) nametoemail;
    
    uint256 public userCount = 0;

    function addidentity(
        string memory _name,
        address payable user_address,
        string memory _email,
        string memory _password,
        string memory _typeID,
        string memory _address,
        string memory _phone,
        string memory _location
    ) public {
        userCount++;
        nametoemail[_name] = _email;
        LoginStore[user_address] = AssetLibrary.Login(
            user_address,
            _email,
            _password,
            _name,
            _typeID,
            _address,
            _phone,
            _location
        );
    }
    
    function getemail(string memory _name) public view returns (string memory) {
        return nametoemail[_name];
    }

    function getLogin(
        address payable _add,
        string memory _email,
        string memory _password
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(
            sha256(abi.encodePacked((LoginStore[_add].email))) ==
                sha256(abi.encodePacked((_email)))
        );
        require(
            sha256(abi.encodePacked((LoginStore[_add].password))) ==
                sha256(abi.encodePacked((_password)))
        );
        return (
            LoginStore[_add].name,
            LoginStore[_add].typeID,
            LoginStore[_add].addressUser,
            LoginStore[_add].phone,
            LoginStore[_add].location
        );
    }

    function getUserCount() public view returns (uint256) {
        return userCount;
    }
}