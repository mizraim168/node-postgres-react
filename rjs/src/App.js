import React, {Component} from 'react';
import logo from './logo.svg';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
// constructor() {
//    super();
//   this.state = {
//     username: '',
//     email: '',
//     password: ''
//   };
//   this.addUser = this.addUser.bind(this);
// };



class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      users: [],
      _id: ''
    };
    // this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  };
  getUsers(){
    let bind = this;
    console.log(this.state);
    fetch('http://localhost:4000/users')
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      // console.log(data);
      bind.setState({users: data})
      // console.log(this.state.users);
      console.log('los datos del state son' );
      console.log(bind.state.users);
    })
  }
  componentDidMount(){
    console.log('soy el on init ');
    this.getUsers();
  }

  deleteUser(id){
    let bind = this;
    if (window.confirm('Seguro que lo quieres eliminar?')) {
      fetch('http://localhost:4000/users/' + id ,{
          method: 'DELETE',
          body: JSON.stringify(this.state),
          headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
      .then(function(response) {
          return response.json();
          // console.log(response);
      })
      .then(function(data){
        console.log(data);
        bind.getUsers();
        alert('Se elimino correctamente')

      })
      .catch(function(err) {
          console.error(err);
      });
      console.log('se va a eliminar el id' , id);
    }
  }

  updateUser(id){
    let bind = this;
    fetch('http://localhost:4000/users/' + id )
    .then(function(response) {
        return response.json();
        // console.log(response);
    })
    .then(function(data){
      console.log(data);
      // bind.getUsers();

      bind.setState(
        {
          username: data[0].username,
          email: data[0].email,
          password: data[0].password,
          _id: data[0]._id
        }
      )
      console.log('esto son los estados actuales');
      console.log(bind.state._id);

    })
    .catch(function(err) {
        console.error(err);
    });
  }



  addUser(e){
      let bind = this;
      if (bind.state._id) {
        fetch('http://localhost:4000/users/' + bind.state._id,{
            method: 'PUT',
            body: JSON.stringify(bind.state),
            headers: {
              'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
            // console.log(response);
        })
        .then(function(data){
          console.log(data);
          bind.getUsers();
          alert('Se actualizo correctamente')

        })
        .catch(function(err) {
            console.error(err);
        });
      }else {
        console.log('hey soy una función medio rara');
        // console.log(this.state);
        fetch('http://localhost:4000/users',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
            // console.log(response);
        })
        .then(function(data){
          console.log(data);
          bind.setState({username: '', email: '', password:'' })
          bind.getUsers();
          alert('Se agrego correctamente')

        })
        .catch(function(err) {
            console.error(err);
        });
      }


    e.preventDefault();
  };

  handleChange(e){
    const {name, value} = e.target
    // console.log(name);
    // console.log(value);
    this.setState({
      [name]: value
    })
  }

  render(){
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div class="container" >
          <h3>Users Management</h3>
      <div class="row" className="App">
          <div class="col" >

                <form onSubmit={this.addUser}>
              <label>
                username:
                <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
              </label><br/><br/>
              <label>
                email:
                <input type="text" name="email"  onChange={this.handleChange} value={this.state.email}/>
              </label><br/><br/>
              <label>
                password:
                <input type="password" name="password"  onChange={this.handleChange} value={this.state.password}/>
              </label>
              <br/><br/>
              <input class="btn" type="submit" value="Create user" />
            </form>
        </div>

          <div class="col">
          <table>
          <thead>
             <tr>
               <th>username</th>
               <th>email</th>
             </tr>
           </thead>

           <tbody>
              {
                this.state.users.map(el_users =>{
                  return(
                    <tr key={el_users._id}>
                        <td>{el_users.username}</td>
                        <td>{el_users.email}</td>
                        <td>
                          <button class="btn" onClick={() => this.updateUser(el_users._id)}>Editar</button>
                          <button class="btn" onClick={()=> this.deleteUser(el_users._id)}>Eliminar</button>
                        </td>
                    </tr>
                  )
                })
              }

           </tbody>
          </table>

          </div>
      </div>






          </div>


    );
  }

}


export default App;
