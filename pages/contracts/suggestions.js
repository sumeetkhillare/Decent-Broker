import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout';
import {Card,Grid,Button,Form,Input,Message} from 'semantic-ui-react';
import Campaign from '../../ethereum/contract';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class Suggestions extends Component{

  static async getInitialProps(props){

    const campaign=Campaign(props.query.address);
    const campaigns2=await campaign.methods.getmsgFromManager().call();
    const campaigns1=await campaign.methods.getmsgFromReceiver().call();
    return{
      campaigns1:campaigns1,
      campaigns2:campaigns2,
      address:props.query.address,
    };
  }
  renderContractsReceiverMsg(){
    const items = this.props.campaigns1.map(address =>{
      return {
        header: address,
        description:"",
        fluid:true
      }
    });
    return <Card.Group items={items}/>;
  }

  renderContractsManagerMsg(){
    const items = this.props.campaigns2.map(address =>{
      return {
        header: address,
        description:"",
        fluid:true
      }
    });
    return <Card.Group items={items}/>;
  }


        render(){
          return (
            <Layout>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>Receiver</h3>
                    {this.renderContractsReceiverMsg()}
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <h3>Manager</h3>
                    {this.renderContractsManagerMsg()}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Layout>
          );
        };
}
export default Suggestions;
