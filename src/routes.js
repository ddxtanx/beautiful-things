import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from './components/Navbar';
import App from './components/App';
import NotFound from './components/404';
import Login from './components/Login';
import Register from './components/Register';
import Session from './Session';
import Posts from './components/Posts';
import NotLoggedIn from './components/NotLoggedIn';
import autoBind from 'react-autobind';
const cookies = new Cookies();
class Routes extends React.Component {
  constructor(props){
    super(props);
    this.state = {loggedin:false, loginData:{
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
            <Route path="/" exact component={()=><App/>}/>
            <Route path="/login" component={()=><Login cookies={cookies} updateSession={this.updateSession}/>}/>
            <Route path="/register" component={()=><Register/>}/>
            <Route path="/posts" component={()=>{
              if(this.state.loggedin){
                return <Posts cookies={cookies} loginData={this.state.loginData}/>;
              } else{
                return <NotLoggedIn/>;
              }
            }}/>
            <Route component={()=><NotFound/>} />
        </Switch>
      </Router>
    </div>);
  }
}
export default Routes;