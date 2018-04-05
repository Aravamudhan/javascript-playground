class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        return "[" + this.name + " " + this.age + "]";
    }
    recordName() {
        console.log("Recording ", this.name);
    }
}

function classTest() {
    let userObj = new User("John", 25);
    console.log(userObj.getDetails());
    for (prop in userObj) {
        console.log(prop); // The methods in the class won't show up here.
    }
}

function delegating() {
    // Here we are creating a function and setting a prototype link to another function
    // This is not inheritance in the literal sense of object oriented programming
    // But it uses it's terminology though
    class Employee extends User {
        constructor(name, age, designation) {
            super(name, age);
            this.designation = designation;
        }
        getDetails() {
            return "[" + this.name + " " + this.age + " " + this.designation + "]";
        }
    }
    let emp1 = new Employee("James",27,"007-License to kill");
    console.log(emp1.getDetails());
}
// classTest();
delegating();