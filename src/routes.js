import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from './components/Navbar';
import Bundle from './components/Bundle';
import loadApp from 'bundle-loader?lazy!./components/App';
import loadNotFound from 'bundle-loader?lazy!./components/404';
import loadLogin from 'bundle-loader?lazy!./components/Login';
import loadRegister from 'bundle-loader?lazy!./components/Register';
import loadPosts from 'bundle-loader?lazy!./components/Posts';
import loadNotLoggedIn from 'bundle-loader?lazy!./components/NotLoggedIn';
import Loading from './components/Loading';
import Session from './Session';
import autoBind from 'react-autobind';
const cookies = new Cookies();
const Loader = (props) => (
  <Bundle load={props.loader}>
    {function (Comp) {
      return (Comp ? <Comp {...props}/> : <Loading/>)
    }}
  </Bundle>
)
class Routes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedin:false,
      loginData:{
        name:"",
        email:"",
        id:""
      }
    };
    autoBind(this);
  }
  updateSession(alertData){
    var self = this;
    Session.getSession(cookies.get('id'), (sessionData) => {
      self.setState(Object.assign({}, alertData, sessionData));
    });
  }
  componentWillMount(){
    if(cookies.get('id')==undefined){
      cookies.set('id', Math.round(Math.random() * Math.pow(10, 17)));
    }
    this.updateSession();
  }
  render(){
    return (
    <div>
      <Navbar loggedin={this.state.loggedin} loginData={this.state.loginData} cookies={cookies}/> 
      <Router>
        <Switch>
            <Route path="/" exact component={()=><Loader loader={loadApp} />}/>
            <Route path="/login" component={()=><Loader loader={loadLogin} cookies={cookies} updateSession={this.updateSession}/>}/>
            <Route path="/register" component={()=><Loader loader={loadRegister}/>}/>
            <Route path="/posts" component={()=>{
              if(this.state.loggedin){
                return <Loader loader={loadPosts} cookies={cookies} loginData={this.state.loginData}/>;
              } else{
                return <Loader loader={loadNotLoggedIn}/>;
              }
            }}/>
            <Route component={()=><Loader loader={loadNotFound}/>} />
        </Switch>
      </Router>
    </div>);
  }
}
export default Routes;