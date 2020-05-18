import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout';
import {Card,Grid,Button,Form,Input,Message,Icon} from 'semantic-ui-react';
import Contract from '../../ethereum/contract';
import {Router} from '../../routes';

import factoryMyProfile from '../../ethereum/factoryMyProfile'
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
    //var dep_contracts=await factoryMyProfile.methods.getDeployedContracts().call();
    const contract=Contract(props.query.address);
    const isAccepted=await contract.methods.checkAccepted().call();
    const summary=await contract.methods.getSummary().call();
    const hash= await contract.methods.filehash().call();
    const array=await contract.methods.getmsgFromReceiver().call();
    const manager=await contract.methods.getManagerAddress().call();
    const receiver=await contract.methods.getReceiverAddress().call();
    var isReceiver=false;
    var date = await contract.methods.getDate().call();
    const accounts = await web3.eth.getAccounts();
    if(accounts[0]==receiver)
    {
      isReceiver=true;
    }
    var not_visibility=true;
    if(isReceiver&&!isAccepted)
    {
      not_visibility=false;
    }else if(isAccepted){
      not_visibility=true;
    }
    return {
        address:props.query.address,
        receiver_address: summary[0],
        contract_info:  summary[1],
        manager_address: summary[2],
        filehash:"https://ipfs.infura.io/ipfs/"+hash,
        visibility:not_visibility,
        isAccepted:isAccepted,
        manager_Name: summary[4],
        receiver_Name: summary[5],date
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
        var d=new Date();
        var date=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"   "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
        console.log(date);
        const accounts = await web3.eth.getAccounts();
        await contract.methods.acceptRequest(date).send({
          from:accounts[0]
        });

        this.setState({loading:false});
              Router.pushRoute(`/`);
      }catch(err) {
        console.log(err);
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
      receiver_Name,date
    } = this.props;
    const items = [
      {
        header:<h3 class="ui header" class="ui grey header">{receiver_address}</h3>,
        meta:'Address of Receiver',
        description:'The Receiver is person with which manager wants contract',
        style:{overflowWrap:'break-word'}
      },
      {
        header:<h3 class="ui header" class="ui grey header">{contract_info}<br/>{date}</h3>,
        meta:'Contract info',
        description:'Information of terms and conditions of contract'
      },
      {
        header:<h3 class="ui header" class="ui grey header">{manager_address}</h3>,
        meta:'Manager Address',
        description:'Manager created this contract',
        style:{overflowWrap:'break-word'}
      },
      {
        header:<h3 class="ui header" class="ui grey header">{manager_Name}</h3>,
        meta:'Manager of Contract',
        description:'The Name of Manager is name of person who created contract',
        style:{overflowWrap:'break-word'}
      },
      {
        header:<h3 class="ui header" class="ui grey header">{receiver_Name}</h3>,
        meta:'Name of Receiver',
        description:'The Name of Receiver is name of person with which manager wants contract',
        style:{overflowWrap:'break-word'}
      },
      {
        header:<Button basic color="blue" href={this.props.filehash} Download >Download</Button>,
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
      <h2 class="ui header" class="ui grey header">
      <div class="content">
      <Icon name="envelope open outline"/>
        Contract Details
      </div>
      </h2>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} isAccepted={this.props.isAccepted}/>
              <Link route={`/contracts/${this.props.address}/suggestions`}>
                <a>
                    <Button animated className="item" floated="right" basic color="blue">
                      <Button.Content visible>View Suggestions</Button.Content>
                      <Button.Content hidden>
                        <Icon name='eye' />
                      </Button.Content>
                    </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form onClick={this.onClick}>
              <Button basic color="blue" loading={this.state.loading2} style={this.props.visibility ? { display: 'none' } : {} }>
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
