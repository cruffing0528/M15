class EmployeeFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the employee filter.</div>
    );
  }
}

function EmployeeTable(props) {
  const employeeRows = props.employees.map(employee =>
    <EmployeeRow
      key={employee._id}
      employee={employee}
      deleteEmployee={props.deleteEmployee}
    />);

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Extension</th>
          <th>Email</th>
          <th>Title</th>
          <th>Date Hired</th>
          <th>Currently Employed?</th>
          <th></th>
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
  function onDeleteClick() {
    alert(`Delete employee with ID ${employee._id}`);
    props.deleteEmployee(props.employee._id);
  }
  return (
    <tr>
      <td>{props.employee._id}</td>
      <td>{props.employee.name}</td>
      <td>{props.employee.extension}</td>
      <td>{props.employee.email}</td>
      <td>{props.employee.title}</td>
      <td>{props.employee.dateHired.toLocaleDateString()}</td>
      <td>{props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
      <td><button onClick={onDeleteClick}>DELETE</button></td>
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
      extension: form.extension.value,
      email: form.email.value,
      title: form.title.value,
    }
    this.props.createEmployee(employee);
    form.name.value = "";
    form.extension.value = "";
    form.email.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <form name="employeeAdd" onSubmit={e => this.handleSubmit(e)}>
        Name: <input type="text" name="name" />
        Extension: <input type="text" name="extension" maxLength={4} />
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
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/employees').
      then(response => response.json()).
      then(data => {
        console.log("Total count of employees:", data.count);
        data.employees.forEach(employee => {
          employee.dateHired = new Date(employee.dateHired);
        });
        this.setState({ employees: data.employees });
      })
      .catch(err => {
        console.log("Error fetching data from server:", err);
      });
  }

  createEmployee(employee) {
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
      .then(response => response.json())
      .then(newEmployee => {
        newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired);
        const newEmployees = this.state.employees.concat(newEmployee.employee);
        this.setState({ employees: newEmployees });
        console.log("Total count of employees:", newEmployees.length);
      })
      .catch(err => {
        console.log("Error creating employee:", err);
      });
  }

  deleteEmployee(id) {
    fetch(`/api/employees/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete employee with ID ${id}`);
        }
        else {
          this.loadData();
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Employee Management Application</h1>
        <EmployeeFilter />
        <hr />
        <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
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

