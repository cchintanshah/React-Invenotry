import React from 'react';
import logo from './logo.jpg';
import pet from './pet_img.jpg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';



class About extends React.Component {
  render() {
    return (
      <div>
        <p id="text_img"><img src={pet} alt="cat and dog" id="pet" />

          Pet Store Warehouse Outlet was opened in October 2019 in Hamilton, Ontario.
          <br />Pet Store is one of the largest independent pet food stores in Ontario and has recently<br /> expanded into Burlington, Ontario.
          Pet Store is family owned and operated and proudly<br /> 100% Canadian. The two owners, live in Burlington and Hamilton respectively and are proud to give back to a community that has given them so much.
          <br />Both our retail and online store offer a large selection of national brand name products,<br /> both pet food and supplies. At Pet Store Hamilton, we offer full service pet grooming for <br />both dogs and cats.

        </p>
      </div>
    );
  }
};
class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""

    };
  }
  componentDidMount() {
    fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            inventory: result
          });

          this.createTable();
        },
        () => {
          this.setState({
            inventory: "error making AJAX request"
          });
        }
      )

  }
  idUp() {

    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return a.id - b.id })
    });
    this.createTable();
  }
  idDown() {
    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return b.id - a.id })
    });
    this.createTable();
  }
  priceUp() {
    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return a.price - b.price })
    });
    this.createTable();
  }
  priceDown() {
    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return b.price - a.price })
    });
    this.createTable();
  }
  animalUp() {
    this.setState({
      inventory: this.state.inventory.sort((a, b) => a.animal.localeCompare(b.animal))
    });
    this.createTable();
  }
  animalDown() {
    this.setState({
      inventory: this.state.inventory.sort((a, b) => b.animal.localeCompare(a.animal))
    });
    this.createTable();
  }
  descriptionDown() {
    this.setState({
      inventory: this.state.inventory.sort((a, b) => b.description.localeCompare(a.description))
    });
    this.createTable();
  }
  descriptionUp() {
    this.setState({
      inventory: this.state.inventory.sort((a, b) => a.description.localeCompare(b.description))
    });
    this.createTable();
  }
  ageUp() {
    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return a.age - b.age })
    });
    this.createTable();
  }
  ageDown() {
    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return b.age - a.age })
    });
    this.createTable();
  }

  createTable() {
    if (typeof this.state.inventory !== 'undefined') {
      const b = this.state.inventory.map((itmes, id) => {
        return (
          <tr key={id}>
            <td>{itmes.id}</td>
            <td>{itmes.animal}</td>
            <td>{itmes.age}</td>
            <td>{itmes.description}</td>
            <td>{itmes.price}</td>
          </tr>
        )
      })
      this.setState({
        data: b
      });

    }
  }

  render() {
    return (
      <table id="inventory">
        <tbody>
          <tr>
            <td>ID &nbsp;<button onClick={() => this.idUp()}>&uarr;</button>&nbsp;<button onClick={() => this.idDown()}>&darr;</button></td>
            <td>Animal &nbsp;<button onClick={() => this.animalUp()}>&uarr;</button>&nbsp;<button onClick={() => this.animalDown()}>&darr;</button></td>
            <td>Age &nbsp;<button onClick={() => this.ageUp()}>&uarr;</button>&nbsp;<button onClick={() => this.ageDown()}>&darr;</button></td>
            <td>Description &nbsp;<button onClick={() => this.descriptionUp()}>&uarr;</button>&nbsp;<button onClick={() => this.descriptionDown()}>&darr;</button></td>
            <td>Price &nbsp;<button onClick={() => this.priceUp()}>&uarr;</button>&nbsp;<button onClick={() => this.priceDown()}>&darr;</button></td>
          </tr>
          {this.state.data}
        </tbody>
      </table>
    );
  }

};


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      buttonName: "Insert",
      animal: "",
      description: "",
      age: 0,
      price: 0.0,
      flag:true,
      id:0

    };
  }
  componentDidMount() {
    fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            inventory: result
          });

          this.createTable();
        },
        () => {
          this.setState({
            inventory: "error making AJAX request"
          });
        }
      )

  }
  createTable() {
    if (typeof this.state.inventory !== 'undefined') {
      const b = this.state.inventory.map((itmes, id) => {
        return (
          <tr key={id}>
            <td>{itmes.id}</td>
            <td>{itmes.animal}</td>
            <td>{itmes.age}</td>
            <td>{itmes.description}</td>
            <td>{itmes.price}</td>
            <td><button className="btn" onClick={() => this.editItem(itmes)} ><i className="fa fa-edit"></i></button></td>
            <td><button className="btn" onClick={() => this.deleteItem(itmes)}><i className="fa fa-trash"></i></button></td>

          </tr>
        )
      })
      this.setState({
        data: b
      });

    }
  }
  animalStateChange(e) { this.setState({ animal: e.target.value }) }
  descriptionStateChange(e) { this.setState({ description: e.target.value }) }
  ageStateChange(e) { this.setState({ age: e.target.value }) }
  priceStateChange(e) { this.setState({ price: e.target.value }) }
  deleteItem(i) {
    fetch("http://localhost:3001/api?act=delete&id=" + i.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            deleteResult: result
          });
          this.getAllAfterDelete();

        },
        (error) => {
          this.setState({
            deleteResult: "error making AJAX request"
          });
        }
      )
  }
  getAllAfterDelete() {
    fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            inventory: result
          });

          this.createTable();
        },
        () => {
          this.setState({
            inventory: "error making AJAX request"
          });
        }
      )

  }
  editItem(data) {
    this.animalName.value = data.animal;
    this.animalDescription.value = data.description;
    this.animalAge.value = data.age;
    this.animalPrice.value = data.price;

    this.setState({
      id:data.id,
      animal:data.animal,
      description:data.description,
      age:data.age,
      price:data.price,
      buttonName:"Update"
    });
  
  }
 
  addItem(e) {

    if(this.state.buttonName === "Update"){
      fetch('http://localhost:3001/api?act=update&id='+this.state.id+'&animal=' + this.state.animal + '&description=' + this.state.description + '&age=' + this.state.age + '&price=' + this.state.price)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            addResult: result
          });
          this.getAllAfterDelete();
        },
        (error) => {
          this.setState({
            addResult: "error making AJAX request"
          });
        }
      )
      this.animalName.value = "";
      this.animalDescription.value = "";
      this.animalAge.value = "";
      this.animalPrice.value = "";
      this.setState({
        buttonName:"Insert"
      });
    }
    else{
    fetch('http://localhost:3001/api?act=add&animal=' + this.state.animal + '&description=' + this.state.description + '&age=' + this.state.age + '&price=' + this.state.price)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            addResult: result
          });
          this.getAllAfterDelete();
        },
        (error) => {
          this.setState({
            addResult: "error making AJAX request"
          });
        }
      )
    
    this.animalName.value = "";
    this.animalDescription.value = "";
    this.animalAge.value = "";
    this.animalPrice.value = "";
      }
  }
  render() {
    return (
      <div>
        <form id="form">
          <h3>Add New Entry</h3>
          <input placeholder="Enter type of Animla" onChange={this.animalStateChange.bind(this)} type="text" ref={(a) => this.animalName = a}></input><br />
          <input placeholder="Enter Description" onChange={this.descriptionStateChange.bind(this)} type="text" ref={(b) => this.animalDescription = b}></input><br />
          <input placeholder="Enter Age" onChange={this.ageStateChange.bind(this)} type="text" ref={(c) => this.animalAge = c}></input><br />
          <input placeholder="Enter Price" onChange={this.priceStateChange.bind(this)} type="text" ref={(d) => this.animalPrice = d}></input><br /><br />
          <button type="button" id="submit" onClick={() => this.addItem(this)}>{this.state.buttonName}</button>&nbsp;
        
        </form>
        <div>
          <table id="editTable">
            <tbody>
              <tr>
                <td>ID </td>
                <td>Animal</td>
                <td>Age </td>
                <td>Description</td>
                <td>Price</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
              {this.state.data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTearm: "",

    };
  }

  componentDidMount() {

    this.setState({
      input: this.props.match.params.term
    });
    let link = "";
    if (typeof this.props.match.params.term !== 'undefined') {
      link = 'http://localhost:3001/api?act=search&term=' + this.props.match.params.term
    }
    else {
      link = 'http://localhost:3001/api?act=getall'
    }
    fetch(link)
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            inventory: result
          });
          // console.log(this.state.inventory);
          this.createTable();
        },
        () => {
          this.setState({
            inventory: "error making AJAX request"
          });
        }
      )

  }
  inputStateChange(e) {
    this.setState({ searchTearm: e.target.value }, () => {
      if (typeof this.state.searchTearm !== 'undefined') {

        fetch('http://localhost:3001/api?act=search&term=' + this.state.searchTearm)
          .then(res => res.json())
          .then(
            (result) => {

              this.setState({
                inventory: result
              });

              this.createTable();
            },
            () => {
              this.setState({
                inventory: "error making AJAX request"
              });
            }
          )
      }
      console.log(this.state.inventory);
    });
  }
  createTable() {
    if (typeof this.state.inventory !== 'undefined') {
      const b = this.state.inventory.map((itmes, id) => {
        return (
          <tr key={id}>
            <td>{itmes.id}</td>
            <td>{itmes.animal}</td>
            <td>{itmes.age}</td>
            <td>{itmes.description}</td>
            <td>{itmes.price}</td>
          </tr>
        )
      })
      this.setState({
        data: b
      });

    }
  }
  idUp() {

    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return a.id - b.id })
    });
    this.createTable();
  }
  idDown() {
    this.setState({
      inventory: this.state.inventory.sort(function (a, b) { return b.id - a.id })
    });
    this.createTable();
  }
  render() {
    return (
      <div>
        <div>
          <h4>Search</h4>
          <input type="text" onChange={this.inputStateChange.bind(this)} />
        </div>
        <div>
          <table id="inventory">
            <tbody>
              <tr>
                <td>ID &nbsp;<button onClick={() => this.idUp()}>&uarr;</button>&nbsp;<button onClick={() => this.idDown()}>&darr;</button></td>
                <td>Animal</td>
                <td>Age </td>
                <td>Description</td>
                <td>Price</td>
              </tr>
              {this.state.data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};


class App extends React.Component {
  render() {
    return (

      <Router>
        <div>
          <img src={logo} alt="pet store logo" id="logo"></img>
          <h1 id="title">Welcome to Pet Store</h1>
          <br />
          <ul>
            <li><NavLink exact to="/">About</NavLink></li>

            <li><NavLink to="/inventory">Inventory</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/edit">Edit</NavLink></li>

          </ul>


          <Route exact path="/" component={About} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/edit" component={Edit} />
          <Route path="/search/:term" component={Search} />
          <Route exact path="/search" component={Search} />

          {
            //<Route path="/search/:someid" component={Search} />
          }
        </div>
        <div id="footer">
          <hr />
          <h4> Copyright &copy; 2019 PetStore</h4>
        </div>
      </Router>
    );
  }
}

export default App;
