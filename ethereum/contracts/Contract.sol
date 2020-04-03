pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;
contract ContractDeployer {

    mapping(address=>bool) public map;
    address[] public deployedContracts;
        function createContract(address _reciever, string info_string,string filehash,string ManagerName,string ReceiverName) public {
        if(_reciever!=msg.sender){
        address newContract = new MyContract( _reciever , info_string,msg.sender,filehash,ManagerName,ReceiverName);
        deployedContracts.push(newContract);
        }
    }

    function summaryOfInfo(address a,string s)public view returns (string []){
        string[] array;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Manager"))&&my.getManagerAddress()==a){
                array.push(my.getInfo());
            }
            else if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Receiver"))&&my.getReceiverAddress()==a){
                array.push(my.getInfo());
            }
            else if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Both"))&&((my.getReceiverAddress()==a)||(my.getManagerAddress()==a))){
                array.push(my.getInfo());
            }
        }
           return (array);
    }
    function summaryOfStatus(address a,string s)public view returns (bool []){
        bool[] array;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Manager"))&&my.getManagerAddress()==a){
                array.push(my.checkAccepted());
            }
            else if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Receiver"))&&my.getReceiverAddress()==a){
                array.push(my.checkAccepted());
            }
            else if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Both"))&&((my.getReceiverAddress()==a)||(my.getManagerAddress()==a))){
                array.push(my.checkAccepted());
            }
        }
           return (array);
    }
    function arrayGetAddress(address a,string s)public view returns (address []){
        address[] array;

        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Manager"))&&my.getManagerAddress()==a){
                array.push(deployedContracts[i]);
            }
            else if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Receiver"))&&my.getReceiverAddress()==a){
                array.push(deployedContracts[i]);
            }
            else if(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("Both"))&&((my.getReceiverAddress()==a)||(my.getManagerAddress()==a))){
                array.push(deployedContracts[i]);
            }
        }
           return array;
    }

    function getDeployedContracts() public view returns (address[]){
        return deployedContracts;
    }
    function getNumberofContracts() public view returns (uint) {
        return deployedContracts.length;
    }

    function getStatus() public view returns(bool[]){

        bool[] status;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            status.push(my.checkAccepted());
        }
        return status;
    }
    function getInfo() public view returns (string[]){
        string[] str;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            str.push(my.getInfo());
        }
        return str;
    }
    function getReceiver(address add) public view returns(address){
        MyContract my=MyContract(add);
        address t=my.getReceiverAddress();
        return t;
    }
    function getManager(address add) public view returns(address){
        MyContract my=MyContract(add);
        address t=my.getManagerAddress();
        return t;
    }
    function getReceiverAndManager(address add) public view returns(address,address){
        MyContract my=MyContract(add);
        address r=my.getReceiverAddress();
        address m=my.getManagerAddress();
        return (r,m);
    }
    function getManagerName() public view returns(string[]){
        string[] str;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            str.push(my.getManagerName());
        }
        return str;
    }
    function getReceiverName()public view returns(string[]){
        string[] str;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            str.push(my.getReceiverName());
        }
        return str;
    }
}

contract MyContract {
    address public manager;
    address reciever;
    string manager_Name;
    string reciever_Name;
    bool public isAccepted;
    string public contract_info;
    string[] public msgFromReceiver;
    string[] public msgFromManager;
    string public filehash;
    constructor(address _reciever, string info_string,address Contract_manager,string _filehash,string ManagerName,string ReceiverName) public {
        manager = Contract_manager;
        reciever = _reciever;
        contract_info=info_string;
        filehash = _filehash;
        isAccepted = false;
        manager_Name=ManagerName;
        reciever_Name=ReceiverName;


    }

    function getManagerAddress() public view returns(address){
      return manager;
    }
    function getInfo() public view returns(string)
    {
        return contract_info;
    }
    function getReceiverAddress() public view returns(address)
    {
      return reciever;
    }
    function getfilehash() public view returns(string){
      return filehash;
    }
    function setfilehash(string hash) public {
      filehash=hash;
    }
    function acceptRequest() public{
        require(msg.sender == reciever);
        isAccepted = true;
    }
    function checkAccepted() public view returns(bool){
      return isAccepted;
    }

    function setMsgfromReceiver(string msgReceiver) public {
        require(msg.sender==reciever&&!isAccepted);
        msgFromReceiver.push(msgReceiver);
    }

    function getmsgFromReceiver() public view returns(string[]){
      return msgFromReceiver;
    }

    function setMsgfromManager(string msgManager) public {
        require(msg.sender==manager&&!isAccepted);
        msgFromManager.push(msgManager);
    }
    function getmsgFromManager() public view returns(string[]){
      return msgFromManager;
    }
    function setContract_Info(string s) public{
        require(msg.sender==manager&&!isAccepted);
        contract_info=s;
    }
    function getSummary() public view returns(address,string,address,string,string,string
      ){
        return(
          reciever,contract_info,manager,filehash,manager_Name,reciever_Name
          );
    }

    function setManagerName(string ManagerName) public{
        require(msg.sender==manager);
        manager_Name=ManagerName;
    }
    function getManagerName() public view returns(string){
        //require(msg.sender==manager||msg.sender==reciever);
        return manager_Name;
    }

    function setReceiverName(string ReceiverName) public{
            require(msg.sender==manager);
            reciever_Name=ReceiverName;
    }
    function getReceiverName() public view returns(string){
        //require(msg.sender==manager||msg.sender==reciever);
        return reciever_Name;
    }

}
