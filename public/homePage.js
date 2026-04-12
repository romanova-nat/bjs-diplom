'use strict';

let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            console.error("Ошибка выхода");
        }
    });
};

ApiConnector.current(response => {
    console.log(response);
    if (response.success) {
        ProfileWidget.showProfile(response);
    } else {
        console.error("Ошибка получения данных");
    }
});

let ratesBoard = new RatesBoard();

function updateRates() {
    ApiConnector.getStocks(response => {
        console.log(response);

        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response);
        } else {
            console.error("Ошибка получения данных");
        }
    });
}

updateRates();
setInterval(updateRates, 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, (response) => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response);
            moneyManager.setMessage(true, "Баланс пополнен");
        } else {
            moneyManager.setMessage(false, "Баланс не пополнен");
        }
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, (response) => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response);
            moneyManager.setMessage(true, "Конвертация прошла успешно");
        } else {
            moneyManager.setMessage(false, "Не конвертировано");
        }
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, (response) => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response);
            moneyManager.setMessage(true, "Перевод выполнен");
        } else {
            moneyManager.setMessage(false, "Перевод не выполнен");
        }
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    console.log(response);

    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response);
        moneyManager.updateUsersList(response);
    } else {
        console.error("Ошибка получения данных");
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, (response) => {
        console.log(response);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response);
            moneyManager.updateUsersList(response);
            favoritesWidget.setMessage(true, "Пользователь добавлен");
        } else {
            favoritesWidget.setMessage(false, "Пользователь не добавлен");
        }
    });
};

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        console.log(response);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response);
            moneyManager.updateUsersList(response);
            favoritesWidget.setMessage(true, "Пользователь удалён");
        } else {
            favoritesWidget.setMessage(false, "Удалить пользователя не получилось");
        }
    });
};