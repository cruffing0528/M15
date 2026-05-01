
const initialEmployees = [
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

class EmployeeFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the employee filter.</div>
    );
  }
}

function EmployeeTable(props) {
  const employeeRows = props.employees.map(employee =>
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

function EmployeeRow(props) {
  const employee = props.employee;
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

class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.employeeAdd;
    const employee = {
      name: form.name.value,
      ext: form.ext.value,
      email: form.email.value,
      title: form.title.value,
      dateHired: new Date(),
      isEmployed: true
    }
    this.props.createEmployee(employee);
    form.name.value = "";
    form.ext.value = "";
    form.email.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <form name="employeeAdd" onSubmit={e => this.handleSubmit(e)}>
        Name: <input type="text" name="name" />
        Extension: <input type="text" name="ext" />
        Email: <input type="text" name="email" />
        Title: <input type="text" name="title" />
        <button type="submit">Add Employee</button>
      </form>
    )
  }
}

class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.createEmployee = this.createEmployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    setTimeout(() => {
      this.setState({ employees: initialEmployees });
    }, 500);
  }
  createEmployee(employee) {
    employee.id = this.state.employees.length + 1;
    // newEmployeeList represents our state which holds the list of employees. 
    // We create a copy of the current state using slice() and then add the new employee to it. 
    const newEmployeeList = this.state.employees.slice();
    newEmployeeList.push(employee);
    // Finally, we update the state with the new list of employees.
    this.setState({ employees: newEmployeeList });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Employee Management Application</h1>
        <EmployeeFilter />
        <hr />
        <EmployeeTable employees={this.state.employees} />
        <hr />
        <EmployeeAdd createEmployee={this.createEmployee} />
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

