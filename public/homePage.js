'use strict'
//Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    const logoutUser = (response) => {
      if(response.success) {
          return location.reload();
      }  
    }
    return ApiConnector.logout(logoutUser);
}

//Получение информации о пользователе
const getCurrent = (response) => {
    if(response.success) {
        return ProfileWidget.showProfile(response.data);
    }  
}
ApiConnector.current(getCurrent);

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
const updatedRatesBoard  = () => {
    const getExchangeRate = (response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            console.log(response);
        }
    }
    return ApiConnector.getStocks(getExchangeRate);
}
updatedRatesBoard();
setInterval(updatedRatesBoard, 60000); //Проверить корректность работы счетчика!!!

//Операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = ({currency, amount}) => {
    const checkForAddMoney = (response) => {
        if (!response.success) {
            return moneyManager.setMessage(response, response.error);
        }
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response, 'Деньги успешно зачислены на Ваш баланс');
        return;
    }
    return ApiConnector.addMoney({currency, amount}, checkForAddMoney);
}

moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
    const checkForConversionMoney = (response) => {
        console.log({ fromCurrency, targetCurrency, fromAmount })
        console.log(response);
        if (!response.success) {
            return moneyManager.setMessage(response, response.error);
        }
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response, 'Деньги успешно конвертированы');//вместо текста выводится [Object]
        return;
    }
    return ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, checkForConversionMoney);
}


