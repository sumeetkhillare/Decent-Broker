import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout';
import {Card,Grid,Button,Form,Input,Message} from 'semantic-ui-react';
import Campaign from '../../ethereum/contract';
import {Router} from '../../routes';

import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
class CampaignShow extends Component{
state={
  loading1:false,
  loading2:false,
  btnViewMsg:false
};
  static async getInitialProps(props){
   //    console.log(campaigns1);

  const campaign=Campaign(props.query.address);
//
  //  console.log("receiver_address "+receiver_address);

  const summary=await campaign.methods.getSummary().call();
  const array=await campaign.methods.getmsgFromReceiver().call();
  console.log(array);
    console.log(summary[0]+" "+summary[1]+" "+summary[2]);
    return{
      address:props.query.address,
      receiver_address: summary[0],
      contract_info:  summary[1],
      manager_address: summary[2]    };
  }

  /*onSubmit=async event=>{
    event.preventDefault();

             var d=new Date();
             var n=d.getTime();
             console.log(n);
    const campaign = Campaign(this.props.address);
    console.log(campaign);
    this.setState({loading1:true});
      try{

      const accounts = await web3.eth.getAccounts();
      const t=await campaign.methods.getmsgFromReceiver().call();
        console.log(t);
          //  Router.replaceRoute(`/campaigns/${this.props.address}`);
    }catch(err){
      //console.log(Campaign);
    }
    this.setState({loading1:false,value:''});
  };*/
  onSubmit=async event=>{
    event.preventDefault();
    Router.pushRoute(`/campaigns/${this.props.address}/suggestions`);
  }

    onClick=async event=>{
      event.preventDefault();
      const campaign = Campaign(this.props.address);
      console.log(campaign);
      this.setState({loading2:true});
      try{

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.acceptRequest().send({
          from:accounts[0]
        });
        this.setState({loading:false});
              Router.pushRoute(`/`);
      }catch(err){
        //console.log(Campaign);
      }
      this.setState({loading2:false,value:''});
    };


  renderCards(){
    const {
      receiver_address,
      contract_info,
      manager_address
    } = this.props;
    //console.log(receiver_address+" "+string_info+" "+manager);
    const items = [
      {
        header:receiver_address,
        meta:'Address of Receiver',
        description:'The Receiver is person with which manager wants contract',
        style:{overflowWrap:'break-word'}
      },
      {
        header:contract_info,
        meta:'Contract info',
        description:'Information of terms and conditions of contract'
      },
      {
        header:manager_address,
        meta:'Manager Address',
        description:'Manager created this contract',
        style:{overflowWrap:'break-word'}
      }
    ];
    return <Card.Group items={items}/>;
  }
  render(){
    return (
      <Layout>
      <h3>Campaign Show</h3>
      <Grid>
      <Grid.Row>
      <Grid.Column width={10}>
      {this.renderCards()}
      </Grid.Column>
      <Grid.Column width={6}>
      <ContributeForm address={this.props.address}/>
      <Link route={`/campaigns/${this.props.address}/suggestions`}>
      <a>
      <Button floated="right"
      content="View Suggestions"
      primary
      /></a>
      </Link>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column>
      <Form onClick={this.onClick}>
      <Button primary loading={this.state.loading2}>Accept Contract</Button>
      </Form>
      </Grid.Column>
      </Grid.Row>
      </Grid>

    </Layout>);
  }
}

export default CampaignShow;
