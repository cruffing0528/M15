
const employees = [
  {
    id: 1,
    name: 'Claire Ruffing',
    ext: '1124',
    email: 'claire.ruffing@sdsu.edu',
    title: 'Software Engineer',
    dateHired: new Date('2020-01-15'),
    isEmployed: true
  },
  {
    id: 2,
    name: 'John Doe',
    ext: '5678',
    email: 'john.doe@sdsu.edu',
    title: 'Project Manager',
    dateHired: new Date('2019-06-01'),
    isEmployed: true
  }
]

class BorderWrap extends React.Component {
  render() {
    const borderStyle = { border: "3px solid silver", padding: 6 };
    return (
      <div style={borderStyle}>
        {this.props.children}
      </div>
    );
  }
}

class EmployeeFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the employee filter.</div>
    );
  }
}

class EmployeeTable extends React.Component {
  render() {
    const employeeRows = employees.map(employee => 
          <EmployeeRow key={employee.id} employee={employee} />);
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Extension</th>
            <th>Email</th>
            <th>Title</th>
            <th>Date Hired</th>
            <th>Currently Employed?</th>
          </tr>
        </thead>
        <tbody>
          {employeeRows}
        </tbody>
      </table>
    );
  }
}

class EmployeeRow extends React.Component {
  render() {
    const employee = this.props.employee;
    return (
      <tr>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.ext}</td>
        <td>{employee.email}</td>
        <td>{employee.title}</td>
        <td>{employee.dateHired.toLocaleDateString()}</td>
        <td>{employee.isEmployed ? 'Yes' : 'No'}</td>
      </tr>
    );
  }
}

class EmployeeAdd extends React.Component {
  render() {
    return (
      <div>This is a placeholder for a form to add a new employee.</div>
    );
  }
}

class EmployeeList extends React.Component {
  render() {
    return (
      <React.Fragment>    
        <BorderWrap>
          <h1>Employee Management Application</h1>
          <EmployeeFilter />
          <hr />
          <EmployeeTable />
          <hr />
          <EmployeeAdd />
        </BorderWrap>
      </React.Fragment>
    );
  }
}
  
ReactDOM.render(
  <React.StrictMode>
    <EmployeeList />
  </React.StrictMode>,
  document.getElementById('content')
);



// class EmployeeList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             employees: []
//         };
//     }

//     componentDidMount() {
//         fetch('/api/employees')
//             .then(response => response.json())
//             .then(data => this.setState({ employees: data }))
//             .catch(error => console.error('Error fetching employees:', error));
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Employee List</h1>
//                 <ul>
//                     {this.state.employees.map(employee => (
//                         <li key={employee.id}>{employee.name}</li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     }
// }