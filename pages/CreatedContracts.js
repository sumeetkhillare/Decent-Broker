import React,{Component} from 'react';
import {Card,Button,Form} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout'
import {Link} from '../routes';
import Contract from '../ethereum/contract';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class CreatedContracts extends Component{
  static async getInitialProps(props){
    //var array_getManager = await factory.methods.arrayGetManager(this.props.address).call();
    console.log(props.query.address);
    var contracts=await factory.methods.arrayGetAddress(props.query.address,"Manager").call();
    var info_string=await factory.methods.summaryOfInfo(props.query.address,"Manager").call();
    var status=await factory.methods.summaryOfStatus(props.query.address,"Manager").call();
    console.log(status);
    return {contracts,info_string,status};
  }
  renderContracts(){

    var array=this.props.contracts;
    var info_string=this.props.info_string;
    var status_array=this.props.status;
    console.log(status_array);
    const item1 = this.props.contracts.map(function(address,i){
      var info=info_string[i];
      var status=status_array[i];
      if(status){
        return {
          header: info,
          description:(
              <Link route={`/contracts/${address}`} color="green" >
                <Button color="green" floated="right">
                  View Contract
                </Button>
              </Link>
            ),
          fluid:true
        }
      }
    else if(!status){
        return{
          header: info,
          description:(
            <Link route={`/contracts/${address}`} color="green" >
              <Button color="red" floated="right">
                View Contract
              </Button>
            </Link>
          ),
        fluid:true
      }
    };
  });

    return <Card.Group items={item1}/>;
  }
  render(){
    return(
      <Layout>
      <div>
    <h3>Created Contracts</h3>
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

export default CreatedContracts;
