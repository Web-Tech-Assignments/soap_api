const Employee = require("../models/Employee");

const employeeService = {
  EmployeeService: {
    EmployeePort: {
      getEmployee: async ({ id }) => {
        const employee = await Employee.findById(id);
        return employee ? { name: employee.name, position: employee.position } : { message: "Not Found" };
      },
      addEmployee: async ({ name, position }) => {
        try {
          const employee = new Employee({ name, position });
          await employee.save();
          return { message: "Employee added", id: employee._id.toString() };
        } catch (error) {
          return { message: "Failed to add employee" };
        }
      },
      updateEmployee: async ({ id, name, position }) => {
        const employee = await Employee.findByIdAndUpdate(id, { name, position }, { new: true });
        return employee ? { message: "Employee updated" } : { message: "Employee not found" };
      },
      deleteEmployee: async ({ id }) => {
        const result = await Employee.findByIdAndDelete(id);
        return result ? { message: "Employee deleted" } : { message: "Employee not found" };
      },
      getAllEmployees: async () => {
        const employees = await Employee.find();
        return { employees: employees.map(emp => ({ name: emp.name, position: emp.position })) };
      }
    }
  }
};

module.exports = employeeService;
