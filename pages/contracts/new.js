import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
class contractNew extends Component{
  state = {
    address:'',
    stringinfo:'',
    errorMsg:'',
    loading:false

  };
  onSubmit=async (event)=>{
    event.preventDefault();

    this.setState({loading:true,errorMsg:''});
    try{
    const accounts =await web3.eth.getAccounts();
    await factory.methods
    .createContract(this.state.address,this.state.stringinfo)
    .send({
      from:accounts[0]
    });
    console.log(factory.methods.getDeployedContracts().call());
    Router.pushRoute('/');
    }catch(err){
    this.setState({errorMsg: err.message});
    }
    this.setState({loading:false});
  };
  render(){
    return (
      <Layout >
      <h3>Create a Campaign</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
      <Form.Field>
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
      <Message error header="Oops!" content={this.state.errorMsg}/>
      <Button primary loading={this.state.loading}>Create!</Button>
      </Form.Field>
      </Form>
      </Layout>
    );
  }
}

export default contractNew;
