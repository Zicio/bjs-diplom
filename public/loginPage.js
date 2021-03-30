'use strict'
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    const fn = () => console.log(data);
    ApiConnector.login(data, fn);
}

