import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Form,Button,Input,Message,Icon} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import ipfs from '../../ipfs/ipfs';
import storehash from '../../ipfs/storehash';
import factoryMyProfile from '../../ethereum/factoryMyProfile';



class contractNew extends Component{
  state = {
    address:'',
    stringinfo:'',
    errorMsg:'',
    ipfsHash:'',
    buffer:'',
    ethAddress:'',
    blockNumber:'',
    transactionHash:'',
    gasUsed:'',
    txReceipt: '',
    loading:false,
    manager_Name:'',
    reciever_Name:'',
    fileload:false
  };

  captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };
  convertToBuffer = async(reader) => {
    //file is converted to a buffer for upload to IPFS
      const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
      this.setState({buffer});
  };


  onSubmit=async (event)=>{
    event.preventDefault();
    this.setState({loading:true,errorMsg:''});
    try{
    var accMan=await factoryMyProfile.methods.getUsersAddress(this.state.manager_Name).call();
    var accRec=await factoryMyProfile.methods.getUsersAddress(this.state.reciever_Name).call();
    const accounts =await web3.eth.getAccounts();
    const ethAddress= await storehash.options.address;
    this.setState({ethAddress});
    if(this.state.manager_Name==""||this.state.receiver_Name==""||this.state.stringinfo==""||this.state.ipfsHash=="")
    {
      alert("Fill all information");
    }else
    if(accMan=="0x0000000000000000000000000000000000000000")
    {
      alert("Create Account First");
      Router.pushRoute('/CreateMyProfile/index');
    }else
    if(accRec=="0x0000000000000000000000000000000000000000")
    {
      alert("Receiver Not Found!!!\nCheck List of Users!!!");
      Router.pushRoute('/contracts/new');
    }else
    if(accRec==accMan){
      alert("Manager should not be receiver");
      Router.pushRoute('/contracts/new');
    }else
    if(accMan!=accounts[0])
    {
      alert("Sign in with same accounts");
      Router.pushRoute('/');
    }else {
      var d=new Date();
      var date=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"   "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
      console.log(date);
      await factory.methods
      .createContract(accRec,this.state.stringinfo,this.state.ipfsHash,this.state.manager_Name,this.state.reciever_Name,date)
      .send({
        from:accounts[0]
      }).then(function(){
        Router.pushRoute('/');
      });
      var x= await factory.methods.getfilehash().call();
      console.log(x);
    }
    }catch(err){
    this.setState({errorMsg: err.message});
    }

    this.setState({loading:false});
  };
  onClick=async (event)=>{
    event.preventDefault();


    this.setState({fileload:true})
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash:ipfsHash[0].hash });
      console.log("hash"+this.state.ipfsHash);
      this.setState({fileload:false})


      })


  };
  render(){
    return (
      <Layout >
        <h2 class="ui header" class="ui grey header">
        <div class="content">
        <Icon name="address book outline"/>
          Create New Contract
        </div>
        </h2>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <Form.Field>
          <label><h4 class="ui header" class="ui grey header">Manager Name</h4></label>
          <Input
          value={this.state.manager_Name}
          onChange={event =>this.setState({manager_Name:event.target.value})}
          />

          <label><h4 class="ui header" class="ui grey header">Receiver Name</h4></label>
          <Input
          value={this.state.reciever_Name}
          onChange={event =>this.setState({reciever_Name:event.target.value})}
          />

          <label><h4 class="ui header" class="ui grey header">Info About Contact</h4></label>
          <Input
          value={this.state.stringinfo}
          onChange={event =>this.setState({stringinfo:event.target.value})}
          />
          {/* <Message error header="Oops!" content={this.state.errorMsg}/>  faltu error detoy*/}

          <label><h4 class="ui header" class="ui grey header">Upload a single file on IPFS</h4></label>
          <Input type="file" onChange = {this.captureFile}></Input>
          <Button basic color="teal" onClick={this.onClick} loading={this.state.fileload}>Upload File</Button>
          <Button basic color="teal" loading={this.state.loading}>Created!</Button>
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}

export default contractNew;
