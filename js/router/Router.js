import {
    SignUpPage
} from '../signup/SignUp';
import {
    LoginScreen
} from '../login/LoginScreen';
import {
    TarBar
} from '../common/TabBar';
import {
    AddItem
} from '../category/addItem';
import {
    ItemAddPage
} from '../category/ItemAddPage';

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
    {
        name: 'AddItem',
        title: '',
        index: 3,
        component: AddItem,
    },
    {
        name: 'ItemAddPage',
        title: '',
        index: 4,
        component: ItemAddPage,
        rightButtonTitle:'完成',
    },

];
export default routes;
