import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout-Profile';
import {Card,Grid,Button,Form,Input,Message,Icon} from 'semantic-ui-react';
import Contract from '../../ethereum/contract';
import {Router} from '../../routes';
import web3 from '../../ethereum/web3';
import factoryMyProfile from '../../ethereum/factoryMyProfile'
var p=false;
class ContractShow extends Component{
  state={
    Name:'',
    Email:'',
    ResidentialAddress:'',
    Mbno:'',
    Profession:'',
    };
  static async getInitialProps(props){
    var contracts=await factoryMyProfile.methods.getDeployedContracts().call();

    var info=await factoryMyProfile.methods.getAllUsers().call();
    var accounts;
    var address;
    var add;
    var value=false;
    Promise.all(
      accounts= await web3.eth.getAccounts(),
      add=accounts[0]
    );
  address = props.query.address;
    var i=0;
    for(i=0;i<info[0].length;i++)
    {
      if(info[0][i]==address)
      {
        value=true;
        break;
      }
    }
    var visibility=value;
    return {address,contracts,info,visibility};
  }
  onClick=async event=> {
    var accounts;
    var add;
    var name=this.state.Name;
    var email=this.state.Email;
    var residentialAddress=this.state.ResidentialAddress;
    var mbno=this.state.Mbno;
    var profession=this.state.Profession;
    Promise.all(
      accounts= await web3.eth.getAccounts(),
      add=accounts[0]
    );

    var t=await factoryMyProfile.methods.createContract(name,mbno,email,residentialAddress,profession).send({
    from:accounts[0]
  }).then();
    Router.pushRoute(`/`);
  }

  renderContracts(){
    var info=this.props.info;
    var array=this.props.contracts;
    var user_add=this.props.address;
    const item1 = this.props.contracts.map(function(address,i){
        var name=info[1][i];
        var add=info[0][i];
        if(add==user_add){
          p=true;

        return {
          header: <h3 class="ui header" class="ui green header">{name}</h3>,
          description:(
            <Link route={`/view_user_profile/${add}`} color="green" >
              <Button animated className="item" floated="right" basic color="green">
                <Button.Content visible>View My Profile</Button.Content>
                <Button.Content hidden>
                  <Icon name='eye' />
                </Button.Content>
              </Button>
            </Link>
            ),
          fluid:true,
          color:"green"
        }
      }else {
        return {
          header: <h3 class="ui header" class="ui teal header">{name}</h3>,
          description:(
            <Link route={`/view_user_profile/${add}`} color="green" >
              <Button animated className="item" floated="right" basic color="teal">
                <Button.Content visible>View Profile</Button.Content>
                <Button.Content hidden>
                  <Icon name='eye' />
                </Button.Content>
              </Button>
            </Link>
            ),
          fluid:true,
          color:"teal"
        }
      }
    });
    return <Card.Group items={item1}/>;
  }
  clickViewProfile=async event=> {
    Router.pushRoute(`/CreateMyProfile/index`);
  }
  render(){
    return (
      <Layout>
      <h2 class="ui header" class="ui grey header">
      <div class="content">
      <Icon name="users"/>
        Users
      </div>
      </h2>
        <h5 style={this.props.visibility ? { display: 'none' } : {}} class="ui header" class="ui red header" >
        You don't have account!!!<br/> Please create account in order to use contract management project</h5>
        <Button className="item" basic color="red" onClick={this.clickViewProfile} style={this.props.visibility ? { display: 'none' } : {}}
        content="Create Account" floated="right"
        />
        {this.renderContracts()}

      </Layout>
    );
  }
}
export default ContractShow;
