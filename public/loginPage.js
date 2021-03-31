'use strict'
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    const fn = () => {
        let error = '';
        if (data.login.length === 0) {
            error += 'Поле "Логин" обязательно для заполнения.';
        }
        if (data.password.length === 0) {
            error += ' Поле "Пароль" обязательно для заполнения.';
        }
        
        if (error !== '') {
            console.log(error);
            userForm.loginErrorMessageBox.style.display = 'block';
            userForm.loginErrorMessageBox.innerHTML = error;
            return;
        }
    }
    ApiConnector.login(data, fn);
}