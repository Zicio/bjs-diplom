'use strict'
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    const logoutUser = (response) => {
      if(response.success) {
          return location.reload();
      }  
    }
    return ApiConnector.logout(logoutUser);
}

const getCurrent = (response) => {
    if(response.success) {
        return ProfileWidget.showProfile(response.data);
    }  
}
ApiConnector.current(getCurrent);

const ratesBoard = new RatesBoard();
const updatedRatesBoard  = () => {
    const getExchangeRate = (response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    }
    ApiConnector.getStocks(getExchangeRate);
}
updatedRatesBoard();
setInterval(updatedRatesBoard, 60000);


