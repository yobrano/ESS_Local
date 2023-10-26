import { lazy, Suspense, useEffect } from "react";
/// Components
import Index from './jsx/index';
import { connect, useDispatch } from 'react-redux';
import {  Route, Switch, withRouter } from 'react-router-dom';

// import './App.css';
// import { useDispatch } from 'react-redux';

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
import Landing from "./jsx/pages/Landing";
import Jobdetails from "./jsx/pages/Jobdetails";
import NewStaff from "./jsx/pages/NewStaff";
import NewStaffPassword from "./jsx/pages/NewStaffPassword";
import Newpassword from "./jsx/pages/Newpassword";
import { handelRightClick } from "./AppUtility";
// import Forgot from "./jsx/pages/Forgotpassword";
// import Resetpassword from "./jsx/pages/Resetpassword";
// import AdminRegister from "./jsx/pages/AdminRegister";
// import Register from "./jsx/pages/Register";

// import {  Route, Switch, withRouter } from 'react-router-dom';

const SignUp = lazy(() => import('./jsx/pages/Register'));
const AdminSignUp = lazy(() => import('./jsx/pages/AdminRegister'));
const Forgot = lazy(() => import('./jsx/pages/Forgotpassword'));
const Reset = lazy(() => import('./jsx/pages/Resetpassword'));
// const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
		setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
	});
});
// const Login = lazy(() => import('./jsx/pages/Login'));

// const Login = lazy(() => import('./jsx/pages/Login'));

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener('contextmenu', handelRightClick);
    checkAutoLogin(dispatch,props.history)
  }, [dispatch,props.history]);

  let routes = (
    <Switch>
      {/* testing priority */}
      <Route exact path='/' component={Landing}/>
      <Route exact  path='/jobdata' component={Jobdetails}/>
      <Route exact path='/login' component={Login}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/asignup'  component={AdminSignUp}/>
      <Route path='/forgot' exact component={Forgot} />
      <Route path='/resetpwd' exact component={Reset} />
      <Route path='/sendpasswordreset' exact component={NewStaff} />
      <Route path='/newpassword' exact component={Newpassword} />
      <Route path='/postpasswordreset/:customerNo/:passwordResetToken'  component={NewStaffPassword} />
    </Switch>
  );
  // // =>console.log(props.isAuthenticated);
  if (props.isAuthenticated) {
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index />
                </Suspense>
            </>
        );
	
	}else{
		return (
			<div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >
                    {routes}
                </Suspense>
			</div>
		);
	}

};

const mapStateToProps = (state) => {
  return {
      isAuthenticated: isAuthenticated(state),
  };
};
export default withRouter(connect(mapStateToProps)(App)); 
// export default App;
