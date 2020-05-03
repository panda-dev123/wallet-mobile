

export const BASE_URL = 'https://ryse-up.herokuapp.com'
const MIDDLE_PATH = '/api/v1' 
export default Api = {
    SIGN_IN: BASE_URL + '/login',
    SIGN_UP: BASE_URL + '/signup',
    LOGOUT: BASE_URL + '/logout',
    FORGOT_PASSWORD: BASE_URL + '/forgot_password',
    USER: BASE_URL + MIDDLE_PATH + '/users',
    CALLOUT : BASE_URL + MIDDLE_PATH + '/callouts',
    COMMENT : BASE_URL + MIDDLE_PATH + '/comments',
    TALENTS : BASE_URL + MIDDLE_PATH + '/users/talents_list',
    LOOKING_FOR : BASE_URL + MIDDLE_PATH + '/users/looking_for_list',
    AUDIENCE : BASE_URL + MIDDLE_PATH + '/users/looking_for_list',
    HELP : BASE_URL + MIDDLE_PATH + '/users/help',
    PASSWORD_RESET: BASE_URL + MIDDLE_PATH + '/users/reset_password',
    USER_CALLOUTS: BASE_URL + MIDDLE_PATH + '/users',

}