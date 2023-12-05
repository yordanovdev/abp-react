# Abp-React

`ABP-REACT` is a versatile React library that provides convenient tools and utilities for integrating with the ABP (ASP.NET Boilerplate) framework in your React applications. This library simplifies common tasks such as authentication, localization, and accessing ABP-related functionalities.

### Installation

```bash
npm install abp-react
```

### Usage

#### 1. Importing the library

```javascript
import { abp, AbpWrapper, initialiseApp } from 'abp-react';
import { useAbp, useUser } from 'abp-react';
import { login, clearAuthCookies } from 'abp-react';
import { L } from 'abp-react';
```

#### 2. Initializing the App

A. With AbpWrapper wrap your main application component with AbpWrapper to enable ABP integration.

```javascript
function App() {
  return (
    <AbpWrapper baseUrl="your base url">
      {/* Your application components */}
    </AbpWrapper>
  );
}
```

Optionally you can specify a "tenantId" to override the default one.

B. Without AbpWrapper
If you're not using the AbpWrapper component, initialize your application with the configuration response from the ABP backend.

```javascript
const abpConfigResponse = initialiseApp(abpConfigResponse); // Fetch configuration from ABP backend;
```

### Hooks

#### useAbp

Access ABP instance and its functionalities using the useAbp hook.

```javascript
function MyComponent() {
  const abpInstance = useAbp();
  const { abp, isLoading } = abpInstance;

  // Use abpInstance methods and properties
}
```

#### useUser

Retrieve information about the current user with the useUser hook.
Should only be used inside "AbpWrapper" component

```javascript
function UserProfile() {
  const user = useUser();

  // Access user information
}
```

### 4. Authentication

#### Login

Perform user login using the login method.
Perform the login operation and pass "expireInSeconds", "accessToken", "encryptedAccessToken"

```javascript
async function loginUser(username, password) {
  let loginResponse = ...

  try {
    await login(loginResponse);
    // Successful login logic
  } catch (error) {
    // Handle login error
  }
}
```

#### Clear Auth Cookies

Clear authentication cookies using clearAuthCookies.

```javascript
function logoutUser() {
  clearAuthCookies();
  // Additional logout logic
}
```

### 5. Localization

Access localization resources using the L function.

```javascript
function MyLocalizedComponent() {
  const localizedText = L('key', 'your source name here');

  // Use localizedText in your component
}
```

We recommend overriding the "L" function so it would be easier to use.

```javascript
function customL(key) {
  const sourceName = process.env.SOURCE_NAME;

  return L(key, sourceName);
}
```

### Contribution

Feel free to contribute to the abp-react library. Fork the repository, make your changes, and submit a pull request. Your contributions are highly appreciated!
