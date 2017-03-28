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
    KindListPage
} from '../category/kindListPage';
import {
    DetailPage,
    AddNodePage,
    noteSave,
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
       rightButtonIcon:require('../common/img/add-30.png'),
        // onRightButtonPress:()=>{this.props.navigator.push(routes[3])}
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
        rightButtonTitle: '',
        onRightButtonPress: () => {
        },
        passProps: {
            editable:true,
        },
    },
    {
        name: 'AddNodePage',
        title: '',
        index: 5,
        component: AddNodePage,
        rightButtonTitle: '保存',
        onRightButtonPress: () => {
            noteSave();
        },
    },
    {
        name:'KindListPage',
        title:'',
        index:6,
        component:KindListPage,
    },
    

];
export default routes;
