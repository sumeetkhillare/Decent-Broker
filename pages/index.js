import React,{Component} from 'react';
import {Card,Button,Form} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout'
import {Link} from '../routes';
import Contract from '../ethereum/contract';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class ContractIndex extends Component{
  state={
    val:[''],
    status:false
  };
  static async getInitialProps(){
    var contracts=await factory.methods.getDeployedContracts().call();
    const accounts=await web3.eth.getAccounts();
    const add=accounts[0];

    return {add:add,contracts};
  }
  onReceiver=async event=> {
    var deployedContracts=this.props.contracts;
    const len=deployedContracts.length;
    var accounts;
    var add;
    Promise.all(
      accounts= await web3.eth.getAccounts(),
      add=accounts[0]
    )
    await deployedContracts.forEach(async(item, i) => {
      const val =await factory.methods.getReceiver(item).call();
      if(add!=val)
      {
        const index=deployedContracts.indexOf(item);
        deployedContracts.splice(index,1);
      }
      if(i==len-1){
      this.setState({status:true});
      }
    });
  }
  onManagerClick=async event=> {
      var deployedContracts=this.props.contracts;
      const len=deployedContracts.length;
      var accounts;
      var add;
      Promise.all(
        accounts= await web3.eth.getAccounts(),
        add=accounts[0]
      )
      await deployedContracts.forEach(async(item, i) => {
        const val =await factory.methods.getManager(item).call();
        if(add!=val)
        {
          const index=deployedContracts.indexOf(item);
          deployedContracts.splice(index,1);
        }
        if(i==len-1){
        this.setState({status:true});
        }
      });
    }
    onAll=async event=> {
      var deployedContracts=this.props.contracts;
        /*this.setState({
        val: [ ...this.state.val, deployedContracts],
      });*/
      //console.log(this.state.val[2]);
      const len=deployedContracts.length;
      var accounts;
      var add;
      Promise.all(
        accounts= await web3.eth.getAccounts(),
        add=accounts[0]
      )
      await deployedContracts.forEach(async(item, i) => {
        const val =await factory.methods.getReceiverAndManager(item).call();
        if(add!=val[0]&&add!=val[1])
        {
          const index=deployedContracts.indexOf(item);
          deployedContracts.splice(index,1);
        }
        if(i==len-1){
          this.setState({status:true});
        }
      });
    }

  renderContracts(){
    const items = this.props.contracts.map(function(address){
      //var contracts=await factory.methods.getStatus(address).call();
      return {
        header: address,
        description:(
          <Link route={`/contracts/${address}`}>
          <a>View Contract
          </a>
          </Link>
        ),
        fluid:true
      }
    });
    return <Card.Group items={items}/>;
  }
  render(){
    return (
      <Layout>
      <div>
    <h3>Current Contracts</h3>
    <Link route="/contracts/new">
    <a>
    <Button floated="right"
    content="Create Contract"
    icon="add circle"
    primary
    />
    </a>
    </Link>
    {this.renderContracts()}
    </div>
    <Button onClick={this.onReceiver} primary >
    Assigned</Button>
    <Button primary onClick={this.onManagerClick} >
    Created</Button>
    <Button onClick={this.onAll} primary >
    View All</Button>
    </Layout>
  );
  }
}
export default ContractIndex;
