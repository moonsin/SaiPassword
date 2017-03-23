import {
    SignUpPage
} from '../signup/SignUp';
import {
    LoginScreen
} from '../login/LoginScreen';
import {
    TarBar
} from '../common/TabBar';
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
        name: 'TarBar',
        title: '',
        index: 2,
        component: TarBar,
    },
];
export default routes;
