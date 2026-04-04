'use strict';

let userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login = (data => {
        if (data.login === true && data.password === true) {
            console.log(data.login, data.password);
        } else {
           throw new Error("Такой пользователь не зарегестрирован");
        }
    });

};
