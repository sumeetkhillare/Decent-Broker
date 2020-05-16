import React,{Component} from 'react';
import {Card,Button,Form} from 'semantic-ui-react';
import Layout from '../components/Layout'
import {Link} from '../routes';
import Contract from '../ethereum/contract';
import {Router} from '../routes';
class ContractIndex extends Component{
  static async getInitialProps(props){
    return {props};
  }
  render(){
    return (
      <Layout>
      <div>
    <h3>Current Global Contracts</h3></div>
    </Layout>
  );
  }
}
export default ContractIndex;
