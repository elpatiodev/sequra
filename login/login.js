"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Webflow = Webflow || [];
Webflow.push(() => {
    const loginForm = document.getElementById('login-form');
    const submitButton = loginForm.querySelector('input[type="submit"]');
    const loginLoader = document.getElementById('login-loader');
    const loginErrorTrigger = document.getElementById('login-error-trigger');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberSessionCheckbox = document.getElementById('remember-session');
    const authURL = 'https://simbox.sequrapi.com/internal_api/users/authenticate';
    const submitText = submitButton.value;
    const waitText = submitButton.dataset.wait;
    let loginErrorDisplayed = false;
    loginForm.addEventListener('submit', handleLogin);
    function handleLogin(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            triggerLoginError('hide');
            const loginDetails = getLoginDetails();
            if (!loginDetails)
                return;
            const { email, password } = loginDetails;
            setLoadingState(true);
            const authResponse = yield authenticateUser(email, password);
            storeSession();
            console.log(authResponse);
            if (authResponse.status === 'ok')
                window.location.replace('/');
            else
                triggerLoginError('show');
            setLoadingState(false);
            return false;
        });
    }
    function getLoginDetails() {
        const email = emailInput.value;
        const password = passwordInput.value;
        if (!email || !validateEmail(email) || !password)
            return false;
        else
            return { email, password };
    }
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function setLoadingState(active) {
        if (active) {
            submitButton.classList.add('loading');
            if (waitText)
                submitButton.value = waitText;
            loginLoader.classList.remove('hidden');
        }
        else {
            submitButton.classList.remove('loading');
            if (submitText)
                submitButton.value = submitText;
            loginLoader.classList.add('hidden');
        }
    }
    function triggerLoginError(state) {
        if (state === 'show' && !loginErrorDisplayed) {
            loginErrorTrigger.click();
            loginErrorDisplayed = true;
        }
        if (state === 'hide' && loginErrorDisplayed) {
            loginErrorTrigger.click();
            loginErrorDisplayed = false;
        }
    }
    function authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = window.btoa(`${email}:${password}`);
            const response = yield fetch(authURL, {
                method: 'POST',
                mode: 'cors',
                headers: { Authorization: `Basic ${authToken}` },
            });
            return yield response.json();
        });
    }
    function storeSession() {
        document.cookie = ``;
    }
});
