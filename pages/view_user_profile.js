import React,{Component} from 'react';
import {Link} from '../routes';
import Layout from '../components/Layout';
import {Card,Grid,Button,Form,Input,Message,Icon} from 'semantic-ui-react';
import Contract from '../ethereum/contract';
import {Router} from '../routes';
import web3 from '../ethereum/web3';
import factoryMyProfile from '../ethereum/factoryMyProfile'
class ContractShow extends Component{
  state={
    Name:'',
    Email:'',
    ResidentialAddress:'',
    Mbno:'',
    Profession:''
  };
  static async getInitialProps(props){
    var fac=await factoryMyProfile.methods.getUsersInfo(props.query.address).call();
    var name=fac[0];
    var mbno=fac[1];
    var gmail=fac[2];
    var radd=fac[3];
    var profession=fac[4];
    return {name,mbno,gmail,radd,profession};
  }
    render(){
    return (
      <Layout>
        <h1 class="ui header" class="ui grey header" >
        <div class="content">
        <Icon name="user"/>
          {this.props.name}
        <div class="sub header" basic color="grey">Profession:{this.props.profession}</div>
        </div>
        </h1>
        <h4 class="ui header" class="ui grey header">Mbno:{this.props.mbno}</h4>
        <h4 class="ui header" class="ui grey header">Gmail:{this.props.gmail}</h4>
        <h4 class="ui header" class="ui grey header">Residential Address:{this.props.radd}</h4>
        <h4 class="ui header" class="ui grey header">Profession:{this.props.profession}</h4>

      </Layout>
    );
  }
}

export default ContractShow;
