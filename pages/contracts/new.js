import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import ipfs from '../../ipfs/ipfs';
import storehash from '../../ipfs/storehash';



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
    reciever_Name:''

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
    const accounts =await web3.eth.getAccounts();
    const ethAddress= await storehash.options.address;
    this.setState({ethAddress});

    await factory.methods
    .createContract(this.state.address,this.state.stringinfo,this.state.ipfsHash,this.state.manager_Name,this.state.reciever_Name)
    .send({
      from:accounts[0]
    });
    var x= await factory.methods.getfilehash().call();
    console.log(x);
    Router.pushRoute('/');
    }catch(err){
    this.setState({errorMsg: err.message});
    }

    this.setState({loading:false});
  };
  onClick=async (event)=>{
    event.preventDefault();



    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash:ipfsHash[0].hash });
      console.log("hash"+this.state.ipfsHash);


      })


  };
  render(){
    return (
      <Layout >
        <h3>Create a Contract or Agreement</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <Form.Field>
          <label>Manager Name</label>
          <Input
          value={this.state.manager_Name}
          onChange={event =>this.setState({manager_Name:event.target.value})}
          />

          <label>Receiver Name</label>
          <Input
          value={this.state.reciever_Name}
          onChange={event =>this.setState({reciever_Name:event.target.value})}
          />
          <label>Receiver Address</label>
          <Input label="address" labelPosition="right"
          value={this.state.address}
          onChange={event =>this.setState({address:event.target.value})}
          />

          <label>Info about Contract</label>
          <Input
          value={this.state.stringinfo}
          onChange={event =>this.setState({stringinfo:event.target.value})}
          />
          {/* <Message error header="Oops!" content={this.state.errorMsg}/>  faltu error detoy*/}

          <label>Upload a Single File on IPFS</label>
          <Input type="file" onChange = {this.captureFile}></Input>
          <Button primary onClick={this.onClick}>Upload File</Button>
          <Button primary loading={this.state.loading}>Create!</Button>
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}

export default contractNew;
