'use strict'
const userForm = new UserForm();
userForm.loginFormCallback = (data) => { 
  const loginUser = (response) => {
    if (!response.success) {
      return userForm.setLoginErrorMessage(response.error);
    }
    return location.reload();
  } 
  return ApiConnector.login(data, loginUser);
}

userForm.registerFormCallback = (data) => {
  const registerUser = (response) => {
    if (!response.success) {
      return userForm.setRegisterErrorMessage(response.error);
    }
    return location.reload();
  } 
  return ApiConnector.register(data, registerUser);
}