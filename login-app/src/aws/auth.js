// aws/auth.js
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserAttribute,
  } from 'amazon-cognito-identity-js';
  import { awsConfig } from './awsConfig';
  
  const poolData = {
    UserPoolId: awsConfig.userPoolId,
    ClientId: awsConfig.clientId,
  };
  
  export const userPool = new CognitoUserPool(poolData);
  
  // ✅ Register user with username, email, and password
  export function registerUser(username, email, password) {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
      ];
  
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  // ✅ Login user with username and password
  export function loginUser(username, password) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
  
      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
  
      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log("✅ Access token:", result.getAccessToken().getJwtToken());
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  
  // ✅ Confirm email with verification code
  export function confirmUser(username, code) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
  
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  // ✅ Resend confirmation code
  export function resendConfirmationCode(username) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
  
      user.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  // ✅ Forgot password - sends verification code to user's email
  export function forgotPassword(username) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
  
      user.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  
  // ✅ Confirm password reset with code and new password
  export function confirmNewPassword(username, code, newPassword) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
  
      user.confirmPassword(code, newPassword, {
        onSuccess() {
          resolve('Password reset successful');
        },
        onFailure(err) {
          reject(err);
        },
      });
    });
  }
  