import React,{Component} from 'react';

import {
    AsyncStorage,
} from 'react-native';


export default class DataRepository extends Component{


    saveData(key,item)
    {
      if(!key || !item) return;
      AsyncStorage.setItem(key,item);
    }

    getData(key,callback)
    {
        // return new Promise((resolve,reject)=>{
        //     AsyncStorage.getItem(key,(error,result)=>{
        //         if(!error){
        //             try {
        //                 resolve(result);
        //             }catch (e) {
        //                 reject(e);
        //                 console.error(e);
        //             }
        //         }else{
        //             reject(error);
        //             console.error(error);
        //         }
        //     })
        // })
        AsyncStorage.getItem(key,(error,result)=>{
            if(!error){
                callback(result);
            }else{
                callback([]);
            }
        })
    }


    deleteData(key)
    {
        AsyncStorage.removeItem(key,(error,result)=>{
            if(error){
               console.error(error);
            }
        })
    }



}
