import Home from './components/Home';
import Product from './components/Product';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import SQLInjection from './components/SQLInjection';
import CustomerMember from './components/CustomerMember';
import InsertProduct from './components/InsertProduct';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NavigationBar/>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Product}/>
            <Route path="/sql" exact component={SQLInjection}/>
            <Route path="/customerMember" exact component={CustomerMember}/>
            <Route path="/insertProduct" exact component={InsertProduct}/>
          </Switch>
        </Router>   
      </header>
    </div>
  );
}

export default App;
