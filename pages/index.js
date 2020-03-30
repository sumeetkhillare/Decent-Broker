import React,{Component} from 'react';
import {Card,Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout'
import {Link} from '../routes';
class CampaignIndex extends Component{
  static async getInitialProps(){
    const campaigns=await factory.methods.getDeployedContracts().call();
    console.log(campaigns);
    return {campaigns};
  }

  renderCampaigns(){
    const items = this.props.campaigns.map(address =>{
      return {
        header: address,
        description:(
          <Link route={`/campaigns/${address}`}>
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
    <Link route="/campaigns/new">
    <a>
    <Button floated="right"
    content="Create Contract"
    icon="add circle"
    primary
    />
    </a>
    </Link>
    {this.renderCampaigns()}
    </div>
    </Layout>
  );
  }
}
export default CampaignIndex;
