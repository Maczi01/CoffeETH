// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuyMeACoffee {
    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //address of contract deployer
    address payable owner;

    //    Array of Memos
    Memo[] memos;

    //    Constructor
    constructor() {
        owner = payable(msg.sender);
    }

    ///*
    // @dev buy a coffee for contract getownpropertydescriptors
    // @param _name name of the coffee buyer
    // @param _message a some nice message to coffee buyer

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy coffee with 0ETH!");
        //        add memo to memos array(storage)
        memos.push(Memo(
                msg.sender,
                block.timestamp,
                _name,
                _message
            ));

//        Emit a log when a new memo is created
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

//**
//*   @dev withdraw all the contract balance to owner
//*/
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    //**
    // @dev get all memos received and stored in blockchain
    //*/
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
