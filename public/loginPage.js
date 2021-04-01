'use strict'
const userForm = new UserForm();
const base = {
    users: [
        {
          created_at: '2019-10-15T05:28:25.593Z',
          login: 'oleg@demo.ru',
          password: 'demo',
          id: 1,
          balance: {
            RUB: 1000, USD: 20, EUR: 20, NTC: 3000,
          },
        }, {
          created_at: '2019-11-16T05:28:25.593Z',
          login: 'ivan@demo.ru',
          password: 'demo',
          id: 2,
          netocoins: 100,
          balance: {
            RUB: 20, USD: 0, EUR: 0, NTC: 100,
          },
        }, {
          created_at: '2019-5-14T05:28:25.593Z',
          login: 'petr@demo.ru',
          password: 'demo',
          id: 3,
          balance: {
            RUB: 20000, USD: 300, EUR: 500, NTC: 50000,
          },
        }, {
          created_at: '2020-1-15T05:28:25.593Z',
          login: 'galina@demo.ru',
          password: 'demo',
          id: 4,
          balance: {
            RUB: 30000, USD: 150, EUR: 300, NTC: 20000,
          },
        }, {
          created_at: '2020-2-16T05:28:25.593Z',
          login: 'vladimir@demo.ru',
          password: 'demo',
          id: 5,
          balance: {
            RUB: 60000, USD: 500, EUR: 600, NTC: 90000,
          },
        },
      ],
      favorites: {
        1: { 2: 'Ваня дурачок', 3: 'Пират Петр' },
        2: { 1: 'Чувак, который должен 20к неткойнов', 3: 'Партнёр по бизнесу' },
        3: { 2: 'Важный клиент' },
        5: { 1: 'Важный пацан', 3: 'Дедуля', 4: 'Галя' },
      },
}
userForm.loginFormCallback = (data) => {
    const fn = (response) => {
        let error = '';
        if (data.login.length === 0) {
            error += 'Поле "Логин" обязательно для заполнения.';
        }
        if (data.password.length === 0) {
            error += ' Поле "Пароль" обязательно для заполнения.';
        }
        if (error !== '') {
            console.log(error);
            return userForm.setLoginErrorMessage(error);
        }
        const targetUser = base.users.find(user => {user.login === data.login && user.password === data.password});
        if (targetUser) {
          return response.json({ success: true, userId: targetUser.id });
        } else {
          return response.json({ success: false, error: `Пользователь c логином ${data.login} и указанным паролем не найден` });
        }
    }
    ApiConnector.login(data, fn);
}