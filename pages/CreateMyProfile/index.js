import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout';
import {Card,Grid,Button,Form,Input,Message} from 'semantic-ui-react';
import Contract from '../../ethereum/contract';
import {Router} from '../../routes';
import web3 from '../../ethereum/web3';
import factoryMyProfile from '../../ethereum/factoryMyProfile'
import { isUserEthereumAddressInBloom } from 'web3-utils';
class ContractShow extends Component{
  state={
    Name:'',
    Email:'',
    ResidentialAddress:'',
    Mbno:'',
    Profession:''
  };
  onClick=async event=> {
    var accounts;
    var add;
    var name=this.state.Name;
    var email=this.state.Email;
    var residentialAddress=this.state.ResidentialAddress;
    var mbno=this.state.Mbno;
    var profession=this.state.Profession;
    var x= await ethereum.enable();
    if(name==''||email==''||residentialAddress==''||mbno==''||profession=='')
    {
      alert("fill all details");
    } 
    else
    {
    Promise.all(
      accounts= await web3.eth.getAccounts(),
      add=accounts[0]
    );
    var p=await factoryMyProfile.methods.getUsersInfo(accounts[0]).call();
    if(p[0]!='')
    {
      alert("Account exist");
    }else{
    var xx=await factoryMyProfile.methods.createContract(name,mbno,email,residentialAddress,profession).send({
    from:accounts[0]
  }).then(console.log);
    Router.pushRoute(`/`);
  }
  }
}
  render(){
    return (
      <Layout>
        <h3>Create Profile</h3>
        <Form onSubmit={this.onSubmit} >
          <Form.Field>
          <label>Name</label>
          <Input
          value={this.state.Name}
          onChange={event =>this.setState({Name:event.target.value})}
          />
          <label>Email</label>
          <Input
          value={this.state.Email}
          onChange={event =>this.setState({Email:event.target.value})}
          />
          <label>Residential Address</label>
          <Input value={this.state.ResidentialAddress}
          onChange={event =>this.setState({ResidentialAddress:event.target.value})}
          />
          <label>MbNo</label>
          <Input
          value={this.state.Mbno}
          onChange={event =>this.setState({Mbno:event.target.value})}
          />
          <label>Profession</label>
          <Input
          value={this.state.Profession}
          onChange={event =>this.setState({Profession:event.target.value})}
          />
          <Button primary loading={this.state.loading} onClick={this.onClick}>Created!</Button>
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}

export default ContractShow;
