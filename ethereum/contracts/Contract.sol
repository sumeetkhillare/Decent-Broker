pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;
contract ContractDeployer {

    mapping(address=>bool) public map;
    address[] public deployedContracts;
        function createContract(address _reciever, string info_string,string filehash,string ManagerName,string ReceiverName,string Date) public {
        if(_reciever!=msg.sender){
        address newContract = new MyContract( _reciever , info_string,msg.sender,filehash,ManagerName,ReceiverName,Date);
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
    function getDate() public view returns (string[]){
        string[] str;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyContract my=MyContract(deployedContracts[i]);
            str.push(my.getDate());
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
    string public Date;
    string public filehash;
    constructor(address _reciever, string info_string,address Contract_manager,string _filehash,string ManagerName,string ReceiverName,string date) public {
        manager = Contract_manager;
        reciever = _reciever;
        contract_info=info_string;
        filehash = _filehash;
        isAccepted = false;
        manager_Name=ManagerName;
        reciever_Name=ReceiverName;
        Date=date;

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
    function acceptRequest(string date) public{
        require(msg.sender == reciever);
        isAccepted = true;
        Date=date;
    }
    function checkAccepted() public view returns(bool){
      return isAccepted;
    }

    function setMsgfromReceiver(string msgReceiver) public {
        require(msg.sender==reciever&&!isAccepted);
        msgFromReceiver.push(msgReceiver);
    }
    function getDate() public returns(string){
        return Date;
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


contract DeployMyProfile{
    address[] public deployedContracts;
    function createContract(string Name,uint Mbno,string Email,string ResidentialAddress,string Profession) public{
        uint i=0;
        address newContract;
        for(i=0;i<deployedContracts.length;i++)
        {
            MyProfile my=MyProfile(deployedContracts[i]);
            if(msg.sender==my.getAddress())
                break;
        }
        if(deployedContracts.length==0){
            newContract=new MyProfile(msg.sender,Name,Mbno,Email,ResidentialAddress,Profession);
            deployedContracts.push(newContract);
        }else
        if(i==deployedContracts.length)
        {
            newContract=new MyProfile(msg.sender,Name,Mbno,Email,ResidentialAddress,Profession);
            deployedContracts.push(newContract);
        }
    }
    function getDeployedContracts() public view returns (address[]){
        return deployedContracts;
    }
    function getNumberofContracts() public view returns (uint) {
        return deployedContracts.length;
    }
    function getUsersInfo(address a) public view returns (string,uint,string,string,string){
        string memory name;
        uint mbno;
        string memory email;
        string memory residentialAddress;
        string memory profession;

        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyProfile my=MyProfile(deployedContracts[i]);
            if(my.getAddress()==a){
            name=my.getName();
            mbno=(my.getMbno());
            email=(my.getEmail());
            residentialAddress=(my.getResdentialAddress());
            profession=(my.getProfession());
            }
        }
        return (name,mbno,email,residentialAddress,profession);
    }
    function getUsersAddress(string a) public view returns (address){
     address add;
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyProfile my=MyProfile(deployedContracts[i]);
            if(keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(my.getName()))){
                add=my.getAddress();
            }
        }
        return (add);
    }
    function getAllUsers() public view returns (address[],string[] ,uint[],string[],string[],string[]){
        address[] memory add=new address[](deployedContracts.length);
        string[] memory name= new string[](deployedContracts.length);
        uint[] memory mbno=new uint[](deployedContracts.length);
        string[] memory email=new string[](deployedContracts.length);
        string[] memory residentialAddress=new string[](deployedContracts.length);
        string[] memory profession=new string[](deployedContracts.length);
        for(uint i=0;i<deployedContracts.length;i++)
        {
            MyProfile my=MyProfile(deployedContracts[i]);
            add[i]=my.getAddress();
            name[i]=my.getName();
            mbno[i]=my.getMbno();
            email[i]=my.getEmail();
            residentialAddress[i]=my.getResdentialAddress();
            profession[i]=my.getProfession();
        }
        return (add,name,mbno,email,residentialAddress,profession);
    }

}
contract MyProfile{
    address public addressOfUser;
    string public name;
    uint public mbno;
    string public email;
    string public residentialAddress;
    string public profession;
    constructor(address Address,string Name,uint Mbno,string Email,string ResidentialAddress,string Profession) public
    {
        addressOfUser=Address;
        name=Name;
        mbno=Mbno;
        email=Email;
        residentialAddress=ResidentialAddress;
        profession=Profession;
    }
    function getAddress() public view returns(address){
        return addressOfUser;
    }
    function getName() public view returns(string){
        return name;
    }
    function getMbno() public view returns(uint){
        return mbno;
    }
    function getEmail() public view returns(string){
        return email;
    }
    function getResdentialAddress() public view returns(string){
        return residentialAddress;
    }
    function getProfession() public view returns(string){
        return profession;
    }
    function setAddress(address a) public{
        addressOfUser=a;
    }
    function setName(string a) public{
        name=a;
    }
    function setMbno(uint a) public{
        mbno=a;
    }
    function setEmail(string a) public{
        email=a;
    }
    function setResdentialAddress(string a) public{
        residentialAddress=a;
    }
    function setProfession(string a) public{
        profession=a;
    }
}
