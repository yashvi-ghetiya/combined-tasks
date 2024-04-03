const router = require("express").Router();

const t1_dynamictable = require("./controller/(t1)dynamic_table/dynamictable");
const { t10_display, t10_display_by_id } = require("./controller/(t10)json-placeholder-fetch-api/json-placeholder-fetch-api");
const { t11_insert, t11_display, t11_fetch_user_by_id, t11_post_data, t11_update_by_id, t11_update_data_by_id, t11_fetch_data, t11_fetch_city, t11_fetch_state } = require("./controller/(t11)job-application-form-nextFuncationality/job-application-form-nextFunctionality");
const activate_code = require("./controller/(t12)login-registration/activate-code.controller");
const activate_user = require("./controller/(t12)login-registration/activate-users.controller");
const dashboard = require("./controller/(t12)login-registration/dashboard.controller");
const { fetch_users_by_code, fetch_users_by_email_contact } = require("./controller/(t12)login-registration/fetch-user.controller");
const insertUser = require("./controller/(t12)login-registration/insert-user.controller");
const { login_get, login_post } = require("./controller/(t12)login-registration/login.controller");
const logout = require("./controller/(t12)login-registration/logout.controller");
const registration = require("./controller/(t12)login-registration/registration.controller");
const updatePassword = require("./controller/(t12)login-registration/update-password.controller");
const { userVerificationGet, userVerificationPost } = require("./controller/(t12)login-registration/user-verfication.controller");
const t2_tic_tac_toe = require("./controller/(t2)tic-tact-toe/tic-tac-toe");
const t3_kuku_kube = require("./controller/(t3)kuku-kube/kuku-kube");
const t4_javascript_events = require("./controller/(t4)javascript-events/javascript-events");
const { t5_displayspecific, t5_display } = require("./controller/(t5)student-result/display-students-result");
const t6_display = require("./controller/(t6)student-attendance/display-students-attendence");
const t7_display = require("./controller/(t7)dynamic-grid/dynamic-grid");
const t8_searching = require("./controller/(t8)searching/searching");
const { t9_searching_by_delimiter_get, t9_searching_by_delimiter_post } = require("./controller/(t9)searching-by-delimiter/searching-by-delimiter");
const { authentication } = require("./functions/authentication");

//task-1
router.route('/dashboard/t1-dynamic-table').get(authentication, t1_dynamictable);

//task-2
router.route('/dashboard/t2-tic-tact-toe').get(authentication, t2_tic_tac_toe);

//task-3
router.route('/dashboard/t3-kuku-kube').get(authentication, t3_kuku_kube);

//task-4
router.route('/dashboard/t4-javascript-events').get(authentication, t4_javascript_events);

//task-5
router.route('/dashboard/t5-displayspecific').get(t5_displayspecific);
router.route('/dashboard/t5-display').get(authentication, t5_display);

//task-6
router.route('/dashboard/t6-display').get(authentication, t6_display);

//task-7
router.route('/dashboard/t7-display').get(authentication, t7_display);

//task-8
router.route('/dashboard/t8-display').get(authentication, t8_searching);

//task-9
router.route('/dashboard/t9-display').get(authentication, t9_searching_by_delimiter_get).post(authentication, t9_searching_by_delimiter_post);

//task-10
router.route('/dashboard/t10-display').get(authentication, t10_display);
router.route('/dashboard/t10-display/:id').get(authentication, t10_display_by_id);

//task-11
router.route('/dashboard/t11-insert').get(authentication, t11_insert);
router.route('/dashboard/t11-display').get(authentication, t11_display);
router.route('/dashboard/t11-fetch/:id').get(authentication, t11_fetch_user_by_id);
router.route('/dashboard/t11-post-data').post(authentication, t11_post_data);
router.route('/dashboard/t11-update/:id').get(authentication, t11_update_by_id);
router.route('/dashboard/t11-updatedata/:id').post(authentication, t11_update_data_by_id);
router.route('/dashboard/t11-fetch-data').get(authentication, t11_fetch_data);
router.route('/dashboard/t11-fetch-city/:state').get(authentication, t11_fetch_city);
router.route('/dashboard/t11-fetch-state').get(authentication, t11_fetch_state);


//task-12
router.route('/activate-code').post(authentication, activate_code);
router.route('/activate-users/:code').post(authentication, activate_user);
router.route('/dashboard').get(authentication, dashboard);
router.route('/fetch-users/:code').get(authentication, fetch_users_by_code);
router.route('/fetch-users/:email/:contact').get(authentication, fetch_users_by_email_contact);
router.route('/insert-users').post(authentication, insertUser);
router.route('/login').get(authentication, login_get).post(authentication, login_post);
router.route('/logout').get(authentication, logout);
router.route('/registration').get(authentication, registration);
router.route('/updatePassword').post(authentication, updatePassword);
router.route('/userVerification').get(authentication, userVerificationGet).post(authentication, userVerificationPost);

module.exports = router;