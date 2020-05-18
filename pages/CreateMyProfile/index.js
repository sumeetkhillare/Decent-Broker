import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout-Profile'
import {Card,Grid,Button,Form,Input,Message,Icon} from 'semantic-ui-react';
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
        <h2 class="ui header" class="ui grey header">
        <div class="content">
        <Icon name="user plus"/>
          Create New Profile
        </div>
        </h2>
        <Form onSubmit={this.onSubmit} >
          <Form.Field>
          <label><h4 class="ui header" class="ui grey header">Name</h4></label>
          <Input
          value={this.state.Name}
          onChange={event =>this.setState({Name:event.target.value})}
          />
          <label><h4 class="ui header" class="ui grey header">Email</h4></label>
          <Input
          value={this.state.Email}
          onChange={event =>this.setState({Email:event.target.value})}
          />
          <label><h4 class="ui header" class="ui grey header">ResidentialAddress</h4></label>
          <Input value={this.state.ResidentialAddress}
          onChange={event =>this.setState({ResidentialAddress:event.target.value})}
          />
          <label><h4 class="ui header" class="ui grey header">Mbno</h4></label>
          <Input
          value={this.state.Mbno}
          onChange={event =>this.setState({Mbno:event.target.value})}
          />
          <label><h4 class="ui header" class="ui grey header">Profession</h4></label>
          <Input
          value={this.state.Profession}
          onChange={event =>this.setState({Profession:event.target.value})}
          />
          <Button basic color="teal" loading={this.state.loading} onClick={this.onClick}>Create!</Button>
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}

export default ContractShow;
