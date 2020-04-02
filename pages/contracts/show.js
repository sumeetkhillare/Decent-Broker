import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout';
import {Card,Grid,Button,Form,Input,Message} from 'semantic-ui-react';
import Contract from '../../ethereum/contract';
import {Router} from '../../routes';

import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
class ContractShow extends Component{
  state={
    loading1:false,
    loading2:false,
    btnViewMsg:false,
    filehash:''
  };
  static async getInitialProps(props){


    const contract=Contract(props.query.address);
    const isAccepted=await contract.methods.checkAccepted().call();
    const summary=await contract.methods.getSummary().call();
    const hash= await contract.methods.filehash().call();
    const array=await contract.methods.getmsgFromReceiver().call();
    const manager=await contract.methods.getManagerAddress().call();
    var isManager=false;
    const accounts = await web3.eth.getAccounts();
    if(accounts[0]==manager)
    {
      isManager=true;
    }
    var not_visibility=false;
    if(isManager)
    {
      not_visibility=true;
    }else if(isAccepted){
      not_visibility=true;
    }
    console.log("not_visibility: "+not_visibility);
    console.log(array);

    return {
        address:props.query.address,
        receiver_address: summary[0],
        contract_info:  summary[1],
        manager_address: summary[2],
        filehash:"https://ipfs.infura.io/ipfs/"+hash,
        visibility:not_visibility,
        isAccepted:isAccepted,
        manager_Name: summary[4],
        receiver_Name: summary[5]
         };
    }

    onSubmit=async event=> {
      event.preventDefault();
      Router.pushRoute(`/contracts/${this.props.address}/suggestions`);
    }

    onClick=async event=> {
      event.preventDefault();
      const contract = Contract(this.props.address);

      this.setState({loading2:true});
      try {

        const accounts = await web3.eth.getAccounts();
        await contract.methods.acceptRequest().send({
          from:accounts[0]
        });

        this.setState({loading:false});
              Router.pushRoute(`/`);
      }catch(err) {
        //console.log(Contract);
      }
      this.setState({loading2:false,value:''});
    };


  renderCards(){
    const {
      receiver_address,
      contract_info,
      manager_address,
      filehash,
      manager_Name,
      receiver_Name
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
      },
      {
        header:manager_Name,
        meta:'Manager of Contract',
        description:'The Name of Manager is name of person who created contract',
        style:{overflowWrap:'break-word'}
      },
      {
        header:receiver_Name,
        meta:'Name of Receiver',
        description:'The Name of Receiver is name of person with which manager wants contract',
        style:{overflowWrap:'break-word'}
      },
      {
        header:<Button primary href={this.props.filehash} Download >Download</Button>,
        meta:'Data Link',
        description:'Download our resources here',
        style:{overflowWrap:'break-word'}
      }
    ];
    return <Card.Group items={items}/>;
  }
  render(){
    return (
      <Layout>
        <h3>Contract Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} isAccepted={this.props.isAccepted}/>
              <Link route={`/contracts/${this.props.address}/suggestions`}>
                <a>
                  <Button floated="right"
                    content="View Suggestions"
                    primary/>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form onClick={this.onClick}>
              <Button primary loading={this.state.loading2} style={this.props.visibility ? { display: 'none' } : {} }>
              Accept Contract</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default ContractShow;
