import {
    SignUpPage
} from '../signup/SignUp';
import {
    LoginScreen
} from '../login/LoginScreen';
import {
    CategoryPage
} from '../category/Category';

const routes = [{
        name: 'LoginScreen',
        index: 0,
        component: LoginScreen,
    },
    {
        name: 'SignUp',
        index: 1,
        component: SignUpPage,
    },
    {
        name: 'Category',
        index: 1,
        component: CategoryPage,
    }
];
export default routes;
