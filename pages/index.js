import React,{Component} from 'react';
import {Card,Button,Form,Icon} from 'semantic-ui-react';
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
    var date = await factory.methods.getDate().call();
    return {address:address,contracts,info_string,status_array,receiver_Name,manager_Name,date};
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
      var date=this.props.date;
      var accounts;
      var add;
      console.log(date);
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
    var date=this.props.date;
    const item1 = this.props.info_string.map(function(info_string,i){
      var address=array[i];
      var status=status_array[i];
      var manager=manager_Name[i];
      var receiver=receiver_Name[i];
      var d=date[i];
      if(!status)
      {
        return {

          header: <h3 class="ui header" class="ui red header">{info_string}</h3>,
          description:(
              <Link route={`/contracts/${address}`} color="green" >
              <Button animated className="item" floated="right" basic color="red">
                <Button.Content visible>View Contract</Button.Content>
                <Button.Content hidden>
                  <Icon name='envelope open outline' />
                </Button.Content>
              </Button>
              </Link>
            ),
          fluid:true,
          color:"red",
          meta:<h4 class="ui header" class="ui grey header">NOT-ACCEPTED <br/>Manager: {manager}<br/> Receiver: {receiver}<br/>Date: {d}</h4>

        }
      }
      else
      {
        return {
            header: <h3 class="ui header" class="ui green header">{info_string}</h3>,
            description:(
                <Link route={`/contracts/${address}`} color="green" >
                  <Button animated className="item" floated="right" basic color="green">
                    <Button.Content visible>View Contract</Button.Content>
                    <Button.Content hidden>
                      <Icon name='envelope open outline' />
                    </Button.Content>
                  </Button>
                </Link>
              ),
            fluid:true,
            color:"green",
            meta:<h4 class="ui header" class="ui grey header">ACCEPTED <br/>Manager: {manager}<br/> Receiver: {receiver}<br/>Date: {d}</h4>
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
      <h2 class="ui header" class="ui grey header">
      <div class="content">
      <Icon name="globe"/>
        Global Contracts
      <div class="sub header" basic color="grey">List of all contracts deployed on Contract Management</div>
      </div>
      </h2>
      {this.renderContracts()}
    </div>
    </Layout>
  );
  }
}
export default ContractIndex;
