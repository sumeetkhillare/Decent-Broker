import React,{Component} from 'react';
import {Card,Button,Form,Icon} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout-Profile'
import {Link} from '../routes';
import Contract from '../ethereum/contract';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class CreatedContracts extends Component{
  static async getInitialProps(props){
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
          header: <h3 class="ui header" class="ui green header">{info}</h3>,
          description:(
              <Link route={`/contracts/${address}`} >
              <Button animated className="item" floated="right" basic color="green">
                <Button.Content visible>View Contract</Button.Content>
                <Button.Content hidden>
                  <Icon name='envelope open outline' />
                </Button.Content>
              </Button>
              </Link>
            ),
          fluid:true,
          color:"green"
        }
      }
    else if(!status){
        return{
          header: <h3 class="ui header" class="ui red header">{info}</h3>,
          description:(
            <Link route={`/contracts/${address}`} >
            <Button animated className="item" floated="right" basic color="red">
              <Button.Content visible>View Contract</Button.Content>
              <Button.Content hidden>
                <Icon name='envelope open outline' />
              </Button.Content>
            </Button>
            </Link>
          ),
        fluid:true,
        color:"red"
      }
    };
  });

    return <Card.Group items={item1}/>;
  }
  render(){
    return(
      <Layout>
      <div>
      <h2 class="ui header" class="ui grey header">
      <div class="content">
      <Icon name="history icon"/>
        Created Contracts
      </div>
      </h2>
      {this.renderContracts()}
    </div>
    </Layout>
    );
  }
}

export default CreatedContracts;
