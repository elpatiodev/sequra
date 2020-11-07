declare var Webflow: any;

interface authResponse {
  status: 'ok' | 'failure';
  token?: string;
  error?: string;
}

var Webflow = Webflow || [];
Webflow.push(() => {
  // ---------- DOM Elements ----------
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const submitButton = loginForm.querySelector(
    'input[type="submit"]'
  ) as HTMLInputElement;
  const loginLoader = document.getElementById('login-loader') as HTMLDivElement;
  const loginErrorTrigger = document.getElementById(
    'login-error-trigger'
  ) as HTMLDivElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const rememberSessionCheckbox = document.getElementById(
    'remember-session'
  ) as HTMLInputElement;

  // ---------- Constants ----------
  const authURL = 'https://simbox.sequrapi.com/internal_api/users/authenticate';
  const submitText = submitButton.value;
  const waitText = submitButton.dataset.wait;

  // ---------- Variables ----------
  let loginErrorDisplayed = false;

  // ---------- Event Listeners ----------
  loginForm.addEventListener('submit', handleLogin);

  // ---------- Functions ----------
  /**
   * Handle the login process
   */
  async function handleLogin(e: Event) {
    e.preventDefault();

    // Hide login error
    triggerLoginError('hide');

    // Get login details
    const loginDetails = getLoginDetails();
    if (!loginDetails) return;

    const { email, password } = loginDetails;

    // Show loading spinner
    setLoadingState(true);

    // Authenticate account
    const authResponse: authResponse = await authenticateUser(email, password);

    if (rememberSessionCheckbox.checked) storeSession();

    // Redirect user to the page or show login error
    if (authResponse.status === 'ok') window.location.replace('/');
    else triggerLoginError('show');

    // Hide loading spinner
    setLoadingState(false);

    return false;
  }

  /**
   * Get the login details from the form. Returns false if details are not correct
   */
  function getLoginDetails() {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !validateEmail(email) || !password) return false;
    else return { email, password };
  }

  /**
   * Checks if an email is valid
   * @param {string} email - Email to be checked
   */
  function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * Shows the loading spinner, modifies button class and text
   * @param active
   */
  function setLoadingState(active: boolean) {
    if (active) {
      submitButton.classList.add('loading');
      if (waitText) submitButton.value = waitText;
      loginLoader.classList.remove('hidden');
    } else {
      submitButton.classList.remove('loading');
      if (submitText) submitButton.value = submitText;
      loginLoader.classList.add('hidden');
    }
  }

  /**
   * Trigger Webflow ix2 that shows / hides the login error
   * @param state
   */
  function triggerLoginError(state: 'show' | 'hide') {
    if (state === 'show' && !loginErrorDisplayed) {
      loginErrorTrigger.click();
      loginErrorDisplayed = true;
    }
    if (state === 'hide' && loginErrorDisplayed) {
      loginErrorTrigger.click();
      loginErrorDisplayed = false;
    }
  }

  /**
   * Authenticate a user by submitting an email + password. Return the account data or login error
   * @param email
   * @param password
   */
  async function authenticateUser(email: string, password: string) {
    const authToken = window.btoa(`${email}:${password}`);
    const response = await fetch(authURL, {
      method: 'POST',
      mode: 'cors',
      headers: { Authorization: `Basic ${authToken}` },
    });
    return await response.json();
  }

  function storeSession() {}
});
