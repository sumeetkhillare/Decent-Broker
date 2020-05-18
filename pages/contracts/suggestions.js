import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout';
import {Card,Grid,Button,Form,Input,Message} from 'semantic-ui-react';
import Contract from '../../ethereum/contract';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class Suggestions extends Component{

  static async getInitialProps(props){

    const contract=Contract(props.query.address);
    const contracts2=await contract.methods.getmsgFromManager().call();
    const contracts1=await contract.methods.getmsgFromReceiver().call();
    return{
      contracts1:contracts1,
      contracts2:contracts2,
      address:props.query.address,
    };
  }
  renderContractsReceiverMsg(){
    const items = this.props.contracts1.map(address =>{
      return {
        header: <h3 class="ui header" class="ui grey header">{address}</h3>,
        description:"",
        fluid:true,
        color:"blue"
      }
    });
    return <Card.Group items={items}/>;
  }

  renderContractsManagerMsg(){
    const items = this.props.contracts2.map(address =>{
      return {
        header: <h3 class="ui header" class="ui grey header">{address}</h3>,
        description:"",
        fluid:true,
        color:"blue"
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
                    <h3 class="ui header" class="ui grey header">Receiver</h3>
                    {this.renderContractsReceiverMsg()}
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <h3 class="ui header" class="ui grey header">Manager</h3>
                    {this.renderContractsManagerMsg()}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Layout>
          );
        };
}
export default Suggestions;
