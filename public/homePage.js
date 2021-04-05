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
setInterval(updatedRatesBoard, 60000);

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
        if (!response.success) {
            return moneyManager.setMessage(response, response.error);
        }
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response, 'Деньги успешно конвертированы');
        return;
    }
    return ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, checkForConversionMoney);
}

moneyManager.sendMoneyCallback = ({ to, currency, amount }) => {
    const checkForSendMoney = (response) => {
        if (!response.success) {
            return moneyManager.setMessage(response, response.error);
        }
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response, 'Деньги успешно переведены');
        return;
    }
    return ApiConnector.transferMoney({ to, currency, amount }, checkForSendMoney);
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();
const getFavoriteList = (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        return;
    }
}
ApiConnector.getFavorites(getFavoriteList);

favoritesWidget.addUserCallback = ({ id, name }) => {
    const addNewFavoritesUser = (response) => {
        if(!response.success) {
            return favoritesWidget.setMessage(response, response.error);
        }
        getFavoriteList(response);
        favoritesWidget.setMessage(response, `Пользователь ${name} успешно добавлен в список избранных`);
        return;
    }
    return ApiConnector.addUserToFavorites({ id, name }, addNewFavoritesUser);
}

favoritesWidget.removeUserCallback = (id) => {
    const removeNewFavoritesUser = (response) => {
        if(!response.success) {
            return favoritesWidget.setMessage(response, response.error);
        }
        getFavoriteList(response);
        favoritesWidget.setMessage(response, 'Пользователь успешно удалён из списка избранных');
        return;
    }
    return ApiConnector.removeUserFromFavorites(id, removeNewFavoritesUser);
}
