const initialEmployees = [{
  id: 1,
  name: 'Claire Ruffing',
  ext: '1124',
  email: 'claire.ruffing@sdsu.edu',
  title: 'Software Engineer',
  dateHired: new Date('2020-01-15'),
  isEmployed: true
}, {
  id: 2,
  name: 'John Doe',
  ext: '5678',
  email: 'john.doe@sdsu.edu',
  title: 'Project Manager',
  dateHired: new Date('2019-06-01'),
  isEmployed: true
}];
class EmployeeFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the employee filter.");
  }
}
function EmployeeTable(props) {
  const employeeRows = props.employees.map(employee => /*#__PURE__*/React.createElement(EmployeeRow, {
    key: employee.id,
    employee: employee
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Extension"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Date Hired"), /*#__PURE__*/React.createElement("th", null, "Currently Employed?"))), /*#__PURE__*/React.createElement("tbody", null, employeeRows));
}
function EmployeeRow(props) {
  const employee = props.employee;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, employee.id), /*#__PURE__*/React.createElement("td", null, employee.name), /*#__PURE__*/React.createElement("td", null, employee.ext), /*#__PURE__*/React.createElement("td", null, employee.email), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.dateHired.toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, employee.isEmployed ? 'Yes' : 'No'));
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
    };
    this.props.createEmployee(employee);
    form.name.value = "";
    form.ext.value = "";
    form.email.value = "";
    form.title.value = "";
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "employeeAdd",
      onSubmit: e => this.handleSubmit(e)
    }, "Name: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name"
    }), "Extension: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "ext"
    }), "Email: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "email"
    }), "Title: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title"
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Add Employee"));
  }
}
class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
    this.createEmployee = this.createEmployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    setTimeout(() => {
      this.setState({
        employees: initialEmployees
      });
    }, 500);
  }
  createEmployee(employee) {
    employee.id = this.state.employees.length + 1;
    // newEmployeeList represents our state which holds the list of employees. 
    // We create a copy of the current state using slice() and then add the new employee to it. 
    const newEmployeeList = this.state.employees.slice();
    newEmployeeList.push(employee);
    // Finally, we update the state with the new list of employees.
    this.setState({
      employees: newEmployeeList
    });
  }
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Employee Management Application"), /*#__PURE__*/React.createElement(EmployeeFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeAdd, {
      createEmployee: this.createEmployee
    }));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(EmployeeList, null)), document.getElementById('content'));