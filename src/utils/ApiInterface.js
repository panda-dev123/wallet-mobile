import axios from "axios";
import SyncStorage from "sync-storage";
import { attach as raxAttach, getConfig as raxConfig } from "retry-axios";
// import Utils from "../Utils";
import Toast from "react-native-root-toast";
import Databasse from "./Database";
import Utils from "./Utils";

const singleton = Symbol();
const singletonEnforcer = Symbol();

function readCookie(name) {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
  );
  return match ? decodeURIComponent(match[3]) : null;
}

class ApiInterface {
  static BASE_URL;
  static BASE_URL_API;
  static APIKey;

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot construct singleton");
    }
    if (__DEV__) 
    {
      // ApiInterface.BASE_URL = "http://wallet.localhost:5000/api/v1/";
      // ApiInterface.BASE_URL_API = "http://wallet.localhost:5000/api/v1/";
      // ApiInterface.APIKey = "c1d2f1b8-0095-442a-9393-ab3bd751a2d8";
      ApiInterface.BASE_URL = "https://api.ativoswallet.com/api/v1/";
      ApiInterface.BASE_URL_API = "https://api.ativoswallet.com/api/v1/";
      ApiInterface.APIKey = "c1d2f1b8-0095-442a-9393-ab3bd751a2d8";
    } else {
      ApiInterface.BASE_URL = "https://api.ativoswallet.com/api/v1/";
      ApiInterface.BASE_URL_API = "https://api.ativoswallet.com/api/v1/";
      ApiInterface.APIKey = "c1d2f1b8-0095-442a-9393-ab3bd751a2d8";
    }

    this.session = axios.create({
      baseURL: ApiInterface.BASE_URL_API,
      headers: {
        Accept: "application/json"
      }
    });
    this.session.defaults.timeout = 30 * 1000;
    this.session.defaults.validateStatus = status =>
      (status >= 200 && status < 300) || status === 404;
    this.session.defaults.raxConfig = {
      instance: this.session,
      retry: 3,
      noResponseRetries: 3,
      httpMethodsToRetry: ["GET", "HEAD", "OPTIONS", "DELETE", "PUT", "POST"],
      retryDelay: 500,
      httpStatusCodesToRetry: [[100, 199], [420, 429], [500, 599]],
      statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
      onRetryAttempt: err => {
        if (axios.defaults.timeout < 8000)
          axios.defaults.timeout = axios.defaults.timeout + 500;
        const cfg = raxConfig(err);
        console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
        // try {
        // 	console.info("Retrying request", err, raxConfig(err))
        // } catch (e) {
        // 	throw new Error("Error logging the retry of a request: " + e);
        // }
      }
    };
    raxAttach(this.session);

    let that = this;
    this.session.interceptors.response.use(
      response => {
        console.log("OkHttp: Response:", response);
        return response;
      },
      error => {
        console.log("OkHttp: Response:", error);
        console.log("OkHttp: Response:", error.response);
        // Reject promise  if usual error
        // console.log(error.response);
        if (error.response.status !== 401) {
          if (error.response.data.messages != null) {
            Utils.showToasts(error.response.data.messages);
          }
          if (error.response.data.message != null) {
            Utils.showToast(error.response.data.message);
          }
          if (
            error.response.data.Message !== undefined &&
            error.response.data.Message !== null
          ) {
            Utils.showToast(error.response.data.Message);
          } else if (error.response.data !== null) {
            Utils.showToast(error.response.data);
          }
          return Promise.reject(error);
        }
        return that.session
          .post("auth/refresh")
          .then(response => {
            // console.log(response);
            SyncStorage.set("jwtToken", response.data.access_token);
            error.response.config.headers["Authorization"] =
              "Bearer " + response.data.access_token;
            return that.session(error.response.config);
          })
          .catch(error => {
            console.log("fuck login user");
            // destroyToken();
            // this.router.push('/login');
            return Promise.reject(error);
          });
      }
    );

    this.session.interceptors.request.use(request => {
      console.log("OkHttp: Starting Request", request);
      return request;
    });
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singleton]) {
      this[singleton] = new ApiInterface(singletonEnforcer);
    }

    return this[singleton];
  }

  get = (...params) => this.session.get(...params);
  post = (...params) => this.session.post(...params);
  put = (...params) => this.session.put(...params);
  patch = (...params) => this.session.patch(...params);
  remove = (...params) => this.session.delete(...params);

  createSession = () =>
    this.session.post("user/createsession", { APIKey: ApiInterface.APIKey });
  verifyMobile = mobileNumber =>
    this.session.post("user/verifymobile", {
      mobileNumber,
      sessionToken: Databasse.getSessionId()
    });
  verifySMS = (MobileNumber, pin) =>
    this.session.post("user/VerifySMS", {
      MobileNumber,
      pin,
      sessionToken: Databasse.getSessionId()
    });
  resendSMS = MobileNumber =>
    this.session.post("user/ResendSMS", {
      MobileNumber,
      sessionToken: Databasse.getSessionId()
    });
  setAuth = (pin, PublicKey) =>
    this.session.post("user/SetAuth", {
      pin,
      publicKey: PublicKey,
      sessionToken: Databasse.getSessionId()
    });
  setBiometrics = publicKey =>
    this.session.post("user/SetBiometrics", {
      publicKey,
      sessionToken: "480adf9b-ea2c-4a65-a2c6-a567d34c969c"
    });
  verifyEmail = (pin, email) =>
    this.session.post("user/verifyEmailCode", {
      pin,
      email,
      sessionToken: Databasse.getSessionId()
    });
  resendEmail = email =>
    this.session.post("user/ResendEmail", {
      email,
      sessionToken: Databasse.getSessionId()
    });
  setUserInfo = (
    firstName,
    middleName,
    lastName,
    street,
    houseNumber,
    postcode,
    city,
    state,
    country,
    email
  ) =>
    this.session.post("user/SetUserInfo", {
      firstName,
      middleName,
      lastName,
      street,
      houseNumber,
      postcode,
      city,
      state,
      country,
      email,
      sessionToken: Databasse.getSessionId()
    });
  loginPin = (pin, signature, mobileNumber) =>
    this.session.post("user/LoginPIN", {
      pin,
      signature,
      mobileNumber,
      sessionToken: Databasse.getSessionId()
    });
  loginBiometrics = (mobileNumber, signature, message) =>
    this.session.post("user/LoginBiometrics", {
      mobileNumber,
      signature,
      message,
      sessionToken: Databasse.getSessionId()
    });
  getAvailableRegions = () =>
    this.session.get("user/GetAvailableRegions", {
      params: { sessionToken: Databasse.getSessionId() }
    });

  getUserInfo = SessionToken =>
    this.session.post("user/GetUserInfo", { params: { SessionToken } });
  getProfile = SessionToken =>
    this.session.get("user/GetProfile", { params: { SessionToken } });
  setProfile = (SessionToken, NickName, Description, Picture, ShowNickName) =>
    this.session.post("user/SetProfile", { params: { id } });

  getDashboard = () =>
    this.session.get("wallet/GetDashboard", {
      params: { sessionToken: Databasse.getSessionId() }
    });
  getAvailablePaymentMethods = () =>
    this.session.get("wallet/GetAvailablePaymentMethods", {
      params: { sessionToken: Databasse.getSessionId() }
    });
  getAvailableCrypto = () =>
    this.session.get("wallet/GetAvailableCrypto", {
      params: { sessionToken: Databasse.getSessionId() }
    });

  addPrepaidAccount = (type, currency, color, alias, dayLimit, monthLimit) =>
    this.session.post("wallet/AddPrepaidAccount", {
      type,
      currency,
      color,
      alias,
      dayLimit,
      monthLimit,
      sessionToken: Databasse.getSessionId()
    });
  addAtivos = (type, currency, color, alias, dayLimit, monthLimit) =>
    this.session.post("wallet/addAtivos", {
      type,
      currency,
      color,
      alias,
      dayLimit,
      monthLimit,
      sessionToken: Databasse.getSessionId()
    });
  addBankAccount = (
    type,
    color,
    alias,
    currency,
    accountName,
    accountNumber,
    swiftbsb,
    dayLimit,
    monthLimit
  ) =>
    this.session.post("wallet/addBankAccount", {
      type,
      color,
      alias,
      currency,
      accountName,
      accountNumber,
      swiftbsb,
      dayLimit,
      monthLimit,
      sessionToken: Databasse.getSessionId()
    });
  addCard = (
    type,
    currency,
    nameOnCard,
    pan,
    expiry,
    cvv,
    color,
    cardAlias,
    dayLimit,
    monthLimit
  ) =>
    this.session.post("wallet/addCard", {
      type,
      currency,
      nameOnCard,
      pan,
      expiry,
      cvv,
      color,
      cardAlias,
      dayLimit,
      monthLimit,
      sessionToken: Databasse.getSessionId()
    });
  addCustodianCrypto = (
    type,
    currency,
    color,
    cardAlias,
    dayLimit,
    monthLimit
  ) =>
    this.session.post("wallet/addCustodianCrypto", {
      type,
      currency,
      color,
      cardAlias,
      dayLimit,
      monthLimit,
      sessionToken: Databasse.getSessionId()
    });

  editPaymentMethod = (
    paymentMethodId,
    alias,
    dayLimit,
    monthLimit,
    color,
    receiveNotifications,
    receiveEmail,
    receiveSMS
  ) =>
    this.session.post("wallet/editPaymentMethod", {
      paymentMethodId,
      alias,
      dayLimit,
      monthLimit,
      color,
      receiveNotifications,
      receiveEmail,
      receiveSMS,
      sessionToken: Databasse.getSessionId()
    });
  getBalance = paymentMethodId =>
    this.session.get("wallet/getBalance", {
      params: { paymentMethodId, sessionToken: Databasse.getSessionId() }
    });
  getPaymentMethod = paymentMethodId =>
    this.session.get("wallet/getPaymentMethod", {
      params: { paymentMethodId, sessionToken: Databasse.getSessionId() }
    });
  removePaymentMethod = (paymentMethodId, pin, biometrics) =>
    this.session.post("wallet/removePaymentMethod", {
      paymentMethodId,
      pin,
      biometrics,
      sessionToken: Databasse.getSessionId()
    });

  exchangePayment = (
    fromPaymentMethodId,
    currency,
    amount,
    description,
    conversionAmount,
    toPaymentMethodId
  ) =>
    this.session.post("wallet/exchangePayment", {
      fromPaymentMethodId,
      currency,
      amount,
      description,
      conversionAmount,
      toPaymentMethodId,
      sessionToken: Databasse.getSessionId()
    });

  getExchangeRate = (fromCurrency, toCurrency, amount, method) =>
    this.session.get("wallet/getExchangeRate", {
      params: {
        fromCurrency,
        toCurrency,
        amount,
        method,
        sessionToken: Databasse.getSessionId()
      }
    });

  sendToCrypto = (
    fromPaymentMethodId,
    currency,
    amount,
    description,
    address
  ) =>
    this.session.post("wallet/sendToCrypto", {
      fromPaymentMethodId,
      currency,
      amount,
      description,
      address,
      sessionToken: Databasse.getSessionId()
    });
  sendToBank = (
    fromPaymentMethodId,
    currency,
    amount,
    description,
    swiftbsb,
    accountName,
    accountNumber
  ) =>
    this.session.post("wallet/sendToBank", {
      fromPaymentMethodId,
      currency,
      amount,
      description,
      swiftbsb,
      accountName,
      accountNumber,
      sessionToken: Databasse.getSessionId()
    });
  sendToUser = (fromPaymentMethodId, currency, amount, description, userId) =>
    this.session.post("wallet/sendToUser", {
      fromPaymentMethodId,
      currency,
      amount,
      description,
      userId,
      sessionToken: Databasse.getSessionId()
    });

  getTransactions = (
    fromPaymentMethodId,
    page,
    itemCount,
    beginDate,
    endDate
  ) =>
    this.session.get("wallet/getTransactions", {
      params: {
        fromPaymentMethodId,
        page,
        itemCount,
        beginDate,
        endDate,
        sessionToken: Databasse.getSessionId()
      }
    });

  receiveToPaymentMethod = (paymentMethodId, currency, amount) =>
    this.session.get("wallet/receiveToPaymentMethod", {
      params: {
        paymentMethodId,
        currency,
        amount,
        sessionToken: Databasse.getSessionId()
      }
    });

  findUserByMobileNumber = mobileNumber =>
    this.session.post("user/findUserByMobileNumber", {
      mobileNumber,
      sessionToken: Databasse.getSessionId()
    });
  findUserByMobileEmail = email =>
    this.session.post("user/findUserByMobileEmail", {
      email,
      sessionToken: Databasse.getSessionId()
    });
  addContact = (userId, nickName) =>
    this.session.post("user/addContact", {
      userId,
      nickName,
      sessionToken: Databasse.getSessionId()
    });
  getContacts = () =>
    this.session.get("user/getContacts", {
      params: { sessionToken: Databasse.getSessionId() }
    });

  addDevice = (deviceId, deviceType) =>
    this.session.post("user/addDevice", {
      deviceId,
      deviceType,
      sessionToken: Databasse.getSessionId()
    });
}

export default ApiInterface;
