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
    var acc;
    var address;
    Promise.all(
      acc= await web3.eth.getAccounts(),
      address=acc[0]
    ).then(function(val){
      console.log(val);
    });

    var info_string=await factory.methods.getInfo().call();
    var status_array=await factory.methods.getStatus().call();
    const accounts=await web3.eth.getAccounts();
    var manager_Name=await factory.methods.getManagerName().call();
    var receiver_Name=await factory.methods.getReceiverName().call();

    return {address:address,contracts,info_string,status_array,receiver_Name,manager_Name};
  }
  onReceiver=async event=> {
    var deployedContracts=this.props.contracts;
    const len=deployedContracts.length;
    var info_string=this.props.info_string;
    var status_array=this.props.status_array;
    var manager_Name=this.props.manager_Name;
    var receiver_Name=this.props.receiver_Name;

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
        info_string.splice(index,1);
        status_array.splice(index,1);
        manager_Name.splice(index,1);
        receiver_Name.splice(index,1);
      }
      if(i==len-1){
      this.setState({status:true});
      }
    });
  }
  onManagerClick=async event=> {
      var deployedContracts=this.props.contracts;
      const len=deployedContracts.length;
      var info_string=this.props.info_string;
      var status_array=this.props.status_array;
      var manager_Name=this.props.manager_Name;
      var receiver_Name=this.props.receiver_Name;
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
          info_string.splice(index,1);
          status_array.splice(index,1);
          manager_Name.splice(index,1);
          receiver_Name.splice(index,1);
        }
        if(i==len-1){
        this.setState({status:true});
        }
      });
    }
    onAll=async event=> {
      var deployedContracts=this.props.contracts;
      const len=deployedContracts.length;
      var info_string=this.props.info_string;
      var status_array=this.props.status_array;
      var manager_Name=this.props.manager_Name;
      var receiver_Name=this.props.receiver_Name;
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
          info_string.splice(index,1);
          status_array.splice(index,1);
          manager_Name.splice(index,1);
          receiver_Name.splice(index,1);
        }
        if(i==len-1){
          this.setState({status:true});
        }
      });
    }
  clickMe=async event=> {
    var accounts;
    var add;
    Promise.all(
      accounts= await web3.eth.getAccounts(),
      add=accounts[0]
    );
    Router.pushRoute(`/${add}`);
  }

  clickMeToView=async event=> {
    var accounts;
    var add;
    Promise.all(
      accounts= await web3.eth.getAccounts(),
      add=accounts[0]
    );
    Router.pushRoute(`/AssignedToMe/${add}`);
  }
  renderContracts(){

    var array=this.props.contracts;
    var status_array=this.props.status_array;
    var receiver_Name=this.props.receiver_Name;
    var manager_Name=this.props.manager_Name;
    const item1 = this.props.info_string.map(function(info_string,i){
      var address=array[i];
      var status=status_array[i];
      var manager=manager_Name[i];
      var receiver=receiver_Name[i];
      if(!status)
      {
        return {
          header: info_string,
          description:(
              <Link route={`/contracts/${address}`} color="green" >
                <Button color="red" floated="right">
                  View Contract
                </Button>
              </Link>
            ),
          fluid:true,
          meta:"NOT-ACCEPTED \nManager: "+manager+'\nReceiver: '+receiver

        }
      }
      else
      {
        return {
          header: info_string,
          description:(
              <Link route={`/contracts/${address}`} color="green" >
                <Button color="green" floated="right">
                  View Contract
                </Button>
              </Link>
            ),
          fluid:true,
          meta:"ACCEPTED \nManager: "+manager+'\nReceiver: '+receiver
        }
      }
    });
    return <Card.Group items={item1}/>;
  }
  render(){
    var address=this.props.address;
    return (
      <Layout>
      <div>
    <h3>Current Global Contracts</h3>
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
    </Layout>
  );
  }
}
export default ContractIndex;
