pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;
contract ContractDeployer {

    address[] public deployedContracts;
        function createContract(address _reciever, string info_string,string filehash,string ManagerName,string ReceiverName) public {
        if(_reciever!=msg.sender){
        address newContract = new MyContract( _reciever , info_string,msg.sender,filehash,ManagerName,ReceiverName);
        deployedContracts.push(newContract);
        }
    }
    function getDeployedContracts() public view returns (address[]){
        return deployedContracts;
    }
    function getNumberofContracts() public view returns (uint) {
        return deployedContracts.length;
    }

    function getStatus(address add) public view returns(bool){
        MyContract my=MyContract(add);
        bool t=my.checkAccepted();
        return t;
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
        require(msg.sender==manager||msg.sender==reciever);
        return manager_Name;
    }

    function setReceiverName(string ReceiverName) public{
            require(msg.sender==manager);
            reciever_Name=ReceiverName;
    }
    function getReceiverName() public view returns(string){
        require(msg.sender==manager||msg.sender==reciever);
        return reciever_Name;
    }

}
