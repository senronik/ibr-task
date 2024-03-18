
const BASE_URL = process.env.REACT_APP_API_URL;

export const ADMIN_SIGN_UP = `${BASE_URL}/api/user/register`;
export const ADMIN_SIGN_IN = `${BASE_URL}/api/user/login`;
export const ADMIN_FORGET_PASS = `${BASE_URL}/api/user/forget-password`;
export const ADMIN_CHANGE_PASS = `${BASE_URL}/api/user/change-password`;
export const ADMIN_UPDATE_PROFILE = `${BASE_URL}/api/user/update-profile`;
export const ADMIN_VERIFY_EMAIL = `${BASE_URL}/api/user/verify`;
export const ADMIN_VERIFY_OTP = `${BASE_URL}/api/user/verify-otp`;
export const ADMIN_NEW_PASS = `${BASE_URL}/api/user/new-password`;
export const GET_PRODUCT = `${BASE_URL}/api/products`;
export const DELETE_PRODUCT = `${BASE_URL}/api/delete-product`;
export const ADD_PRODUCT = `${BASE_URL}/api/add-product`;
export const EDIT_PRODUCT = `${BASE_URL}/api/update-product`;
export const IMPORT_CSV = `${BASE_URL}/api/import-csv`;
export const EXPORT_CSV = `${BASE_URL}/api/export-csv`;
export const SEND_EMAIL = `${BASE_URL}/api/send-mail`;
export const GET_EMAILS = `${BASE_URL}/api/get-mails`;
export const UPLOAD_IMG = `${BASE_URL}/api/ckeditor`;

