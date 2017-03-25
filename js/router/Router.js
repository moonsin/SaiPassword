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
    DetailPage,AddNodePage,noteSave
} from '../category/DetailPage';

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
        name: 'DetailPage',
        title: '',
        index: 4,
        component: DetailPage,
        rightButtonTitle:'完成',
        passProps:'',
    },
    {
        name: 'AddNodePage',
        title: '',
        index: 5,
        component: AddNodePage,
        rightButtonTitle:'保存',
        onRightButtonPress:()=>{noteSave();},
    },

];
export default routes;
