import React,{Component} from 'react';
import {Link} from '../../routes';
import Layout from '../../components/Layout';
import {Card,Grid,Button,Form,Input,Message} from 'semantic-ui-react';
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
          header: name,
          description:(
            <Link route={`/view_user_profile/${add}`} color="green" >
              <Button color="green" floated="right">
                View My Profile
              </Button>
            </Link>
            ),
          fluid:true,
        }
      }else {
        return {
          header: name,
          description:(
            <Link route={`/view_user_profile/${add}`} color="green" >
              <Button color="teal" floated="right">
                View Profile
              </Button>
            </Link>
            ),
          fluid:true,
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
        <h3>Users</h3>
        <h5 style={{color:"red"}} style={this.props.visibility ? { display: 'none' } : {}} >
        You don't have account!!! Please create account in order to use contract management project</h5>
        <Button className="item" onClick={this.clickViewProfile} style={this.props.visibility ? { display: 'none' } : {}}
        content="Create Account" floated="right"
        primary
        />
        {this.renderContracts()}

      </Layout>
    );
  }
}
export default ContractShow;
