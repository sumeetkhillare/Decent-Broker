import React,{Component} from 'react';
import {Link} from '../routes';
import Layout from '../components/Layout';
import {Card,Grid,Button,Form,Input,Message} from 'semantic-ui-react';
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
        <h2>{this.props.name}</h2>
        <div>
        Mbno:{this.props.mbno}
        <br/>
        Gmail:{this.props.gmail}
        <br/>
        Residential Address:{this.props.radd}
        <br/>
        Profession:{this.props.profession}
        </div>
      </Layout>
    );
  }
}

export default ContractShow;
