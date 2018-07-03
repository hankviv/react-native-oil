import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    ListView,
    TouchableOpacity,
    Image,
} from 'react-native';

import DataRepository from '../../data/DataRepository'
import NavigationBar from '../../common/NavigationBar'

export default class CheckOilRecord extends Component{
    constructor(props){
        super(props);
        Handle = new DataRepository();
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            'Handle':Handle,
            'dataShow':false,
        }
        this._loadData();
    }

    renderButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.props.navigation.pop();
            }}>
            <Image
                style={{width: 26, height: 26,tintColor:'yellow'}}
                source={image}/>
        </TouchableOpacity>;
    }

    _loadData()
    {
        Handle.getData('oilRecord',(result)=>{
            if(result){
                //alert(result);
                this.setState({dataSource: ds.cloneWithRows(JSON.parse(result)),'dataShow':true});
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = 'check'
                    style={{backgroundColor:'#F08080'}}
                    leftButton={this.renderButton(require('../../../res/images/ic_arrow_back_white_36pt.png'))}
                    rightButton={this.renderButton(require('../../../res/images/ic_code.png'))}
                />

                <Text style={{fontSize:20,color:'red'}}>AddRecord</Text>
                <Text style={styles.text} onPress={() =>
                    this.props.navigation.goBack()
                }>save</Text>
                <Text style={styles.text} onPress={() =>
                    this.props.navigation.goBack()
                }>goback</Text>
                {
                   this.state.dataShow ?
                       <ListView
                           dataSource={this.state.dataSource}
                           renderRow={(rowData) => <Text>{JSON.stringify(rowData)}</Text>}
                        />
                        : <Text>loading</Text>
                }

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text:{
        fontSize:20
    }
})