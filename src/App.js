import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { auth } from './firebase/firebase.utils'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { theme, themeWithRtl } from './theme';
import { configureStore } from './store';
import routes from './routes';
import GoogleAnalytics from './components/GoogleAnalytics';
import CookiesNotification from './components/CookiesNotification';
import ScrollReset from './components/ScrollReset';
import StylesProvider from './components/StylesProvider';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/main.scss';

const history = createBrowserHistory();
const store = configureStore();

class App extends React.Component {
  unsubscribeFromAuth = null;

  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    // close the subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={this.direction === 'rtl' ? themeWithRtl : theme}>
          <StylesProvider direction={this.direction}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Router history={history}>
                <ScrollReset />
                <GoogleAnalytics />
                <CookiesNotification />
                {renderRoutes(routes)}
              </Router>
            </MuiPickersUtilsProvider>
          </StylesProvider>
        </ThemeProvider>
      </StoreProvider>
    );
  }
}

export default App;
