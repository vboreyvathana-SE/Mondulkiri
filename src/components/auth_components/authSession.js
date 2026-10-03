// ============================================================================
//  PLACEHOLDER, NOT REAL LOGIN.
//  There is no backend connected yet, so these functions only pretend, like the
//  mock cart does. The person who builds the API replaces the BODY of each
//  function and keeps the names + what they return. Nothing else has to change.
//
//  How the forms use them:
//   - loginUser / registerUser: if the request fails, `throw new Error("message")`
//     and the form shows that message under the button.
//   - isLoggedIn: the cart's "buy" button asks this. If false -> go to /login.
//
//  For now it saves { email, firstName } (never the password) in localStorage.
//  To log out while testing: DevTools > Application > Local Storage > delete
//  the key  mondulkiri_mock_user  (or call logoutUser() from the navbar later).
// ============================================================================

const SESSION_KEY = "mondulkiri_mock_user";

function saveSession(user) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // storage blocked: the fake login just won't stick
  }
}

export function isLoggedIn() {
  try {
    return localStorage.getItem(SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

// { email, password }
export function loginUser(credentials) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      saveSession({ email: credentials.email });
      resolve();
    }, 700);
  });
}

// { firstName, lastName, email, password, accountType }  (accountType is "consumer" or "reseller")
export function registerUser(details) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      saveSession({ email: details.email, firstName: details.firstName, accountType: details.accountType });
      resolve();
    }, 700);
  });
}

export function logoutUser() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // nothing to do
  }
}
