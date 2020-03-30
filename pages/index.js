import React,{Component} from 'react';
import {Card,Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout'
import {Link} from '../routes';
class ContractIndex extends Component{
  static async getInitialProps(){
    const contracts=await factory.methods.getDeployedContracts().call();
    console.log(contracts);
    return {contracts};
  }

  renderContracts(){
    const items = this.props.contracts.map(address =>{
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
    </Layout>
  );
  }
}
export default ContractIndex;
