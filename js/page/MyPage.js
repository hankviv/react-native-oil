import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    Platform,
    TouchableHighlight
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../data/DataRepository';

export default class MyPage extends Component {
    constructor(props) {
        super(props);
        let Handle = new DataRepository();
        this.state = {
            avatar:require('../../res/images/ic_default_avatar.png'),
            hasLogin:false,
            nickname:'',
            userId:'',
            Handle: Handle,
            dataKey:'userInfo'
        }
    }


    _clickAvatar(){

        if(this.state.userId){
            this.state.Handle.deleteData(this.state.dataKey);
            this.setState({
                avatar:require('../../res/images/ic_default_avatar.png'),
                hasLogin:false,
                userId:''
            });
        }else {
            let  userInfo = {
                'userId':1335088,
                'nickname':'hank',
                'avatar':'https://img3.duitang.com/uploads/item/201509/02/20150902110306_eEf8t.jpeg',
            };
            this.state.Handle.saveData(this.state.dataKey,JSON.stringify(userInfo));
            this.setState({
                hasLogin:true,
                'userId':1335088,
                'nickname':'hank',
                avatar:{uri:'https://img3.duitang.com/uploads/item/201509/02/20150902110306_eEf8t.jpeg'},
            });
        }

    }

    componentWillMount(){
        this.state.Handle.getData(this.state.dataKey,(value)=>{
            if(!value || typeof(value) == 'undefined' ){
                this.setState({hasLogin:false});
            }else {
                let userInfo = JSON.parse(value);
                this.setState({
                                hasLogin:true,
                                nickname:userInfo.nickname,
                                userId:userInfo.userId,
                                avatar:{uri:userInfo.avatar},
                });
            }
        })
    }

    _ItemList(Images,text,reward){
        return <TouchableOpacity onPress={()=>this.props.navigation.navigate(reward)} activeOpacity={1} >
                    <View style={styles.item}>
                        <Image  style={styles.itemImage} source={Images}/>
                        <Text style={{fontSize:15,marginLeft:15}}>{text}</Text>
                    </View>
                </TouchableOpacity>

    }

    render() {

        let MyPageNavigationBar =
            <NavigationBar
                title='我的'
                style={styles.NavigationBar}/>

        return (
            <View style={styles.container}>
                <NavigationBar
                    title='我的'
                    style={styles.NavigationBar}/>

                <View style={styles.container}>

                    <TouchableOpacity  onPress={()=>this._clickAvatar()} activeOpacity={1} style={this.userInfo}>
                        <View style={styles.userInfo}>
                            <Image style={{height:50,width:50,borderRadius:30}}
                                   source={this.state.avatar}
                            />
                            <View style={{marginLeft:20}}>
                                {!this.state.hasLogin ?
                                    <Text style={{fontSize:15,color:'#000'}}>点击登陆</Text> :
                                    <View>
                                        <Text style={{fontSize:18,color:'#000',marginBottom:2}}>{this.state.nickname}</Text>
                                        <Text style={{fontSize:12}}>ID:{this.state.userId}</Text>
                                    </View>
                                }
                            </View>

                        </View>

                    </TouchableOpacity >

                    {this._ItemList(require('../../res/images/ic_data.png'),'数据备份恢复','BackDataPage')}
                    {this._ItemList(require('../../res/images/ic_help.png'),'帮助','HelpPage')}
                    {this._ItemList(require('../../res/images/ic_feedback.png'),'反馈联系','FeedbackPage')}
                    {this._ItemList(require('../../res/images/ic_about.png'),'关于','AboutPage')}


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF'
    },
    NavigationBar:{
        backgroundColor:'#FFFFFF',
        borderColor:'#E5E5E5',
        borderBottomWidth:1
    },
    userInfo:{
        flexDirection:'row',
        marginLeft:20,
        marginTop:30,
        alignItems:'center',
        marginBottom:60,
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:5,
        marginBottom:5,
        paddingBottom:7,
        borderBottomWidth:1,
        borderColor:'#dbdbdb',
    },
    itemImage:{
        width:17,
        height:15,
        marginLeft:20,
    }
})
