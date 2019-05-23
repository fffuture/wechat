/**
 * @file 所需要的所有数据结构
 * @author the again
 */

import {post} from '@/utils/fetch-tool.js'
import Router from 'vue-router';

export const state = () => {
    return {
        router:"",

        localClient:'',
        localStream:'',
        remoteClient:'',
        remoteStream:'',
        remoteOffer:'',
        webrtcShow:false,
        webrtcInvite:{

        },

        test:"hello vuex",
        token:'',
        weChatId:'',
        ws:"",
        currentUser:{
            weChatId:"",
            weChatName:'',
            imgUrl:"",
            sex:"",

        },
        chatHistory:[
            {
                sender:"admin",
                receiver:"admin1",
                content:"测试发送数据"
            }
        ],
        chatHistorys:[
            /*{
                receiver:"ceshi",
                content:[
                    {
                        sender:"ceshi",
                        serderImgUrl:'',
                        receiver:"ceshi",
                        content:"测试发送数据"
                    }
                ]
            },*/
        ],
        currentChat:{

        },
        groupChat:[
            // {
            //     sender:'hello',
            //     senderImg:"http://123.207.3.64/wechat/assets/otherImg.jpg",
            //     receiver:'1', //群id
            //     content:'群测试消息',
            //     type:"groupChat",
            //     time:'',
            // },
        ],
        friendList:[
            {
                weChatId:'',
                friendWeChatId:'测试',
                friendWeChatName:'测试',
                friendImgURL:'测试',
                friendSex:'测试',
                remarks:'',
                source:'',
                tag:'',
                descript:'',
                addTime:'',
            }
        ],
        groupList:[
           /* {
                wechatId:'',           //用户id
                groupId:'0',           //群id
                groupName:'群聊',      //群名称
                groupImg:'',           //群头像
                remarks:'测试备注',     //备注
                notice:'111',          //群公告
            }*/
        ],
        applyAddList:[ //申请添加好友列表
          /*  {
                sender:'admin',
                receiver:"admin4",
                type:"addFriend",
                content:'请求添加您为好友',
                status:'waite'
            },
            {
                sender:'admin1',
                receiver:"admin4",
                type:"addFriend",
                content:'请求添加您为好友',
                status:'accept'
            } */
        ]
    };
};


// export const getters = {
//     getRemoteOffer: state =>{
//         return state.remoteOffer;
//     }
// }


export const mutations = {

    setRemoteOffer(state){
        state.remoteOffer = "update";
    },
    setWebrtcShow(state,show){
        state.webrtcShow = show.show;
    },

    WEBSOCKETCONNECTION(state){
    // websocketConnection(state){
        // console.log('mutations',state.token);
        if ('WebSocket' in window){
            // console.log('chrome',WebSocket);
            // console.log('state.dataHandler.weChatId ',state.weChatId )
            // state.ws = new WebSocket("ws://localhost:8080/socketServer/"+ state.weChatId );    
            state.ws = new WebSocket("ws://192.168.137.1:8080/socketServer/"+ state.weChatId );    
            // state.ws = new WebSocket("ws://192.168.1.4:8080/socketServer/"+ state.weChatId );    
        }    
        else if ('MozWebSocket' in window){
            state.ws = new MozWebSocket("ws://localhost:8080/socketServer/"+state.weChatId);    
        }
        else{
            alert("该浏览器不支持websocket");    
        }    
            
        state.ws.onmessage = function(evt) {    
            console.log('接收到的信息',evt.data);
            let receiveMessage = JSON.parse(evt.data);
            // console.log('添加聊天记录receiveMessage',receiveMessage);
            if( receiveMessage.type === "addFriend" ){
                console.log('接收到的添加好友消息',receiveMessage);
                state.applyAddList.splice( state.applyAddList.length,0,receiveMessage );
            }
            if( receiveMessage.type === "chat" || receiveMessage.type === "chatImg" || receiveMessage.type === "visitingCard"  ){
                for(let i = 0; i < state.chatHistorys.length; i++ ){
                    if( state.chatHistorys[i].receiver === receiveMessage.sender ){  //将聊天记录导进 相应的联系人下

                        let currentTime = new Date();
                        console.log('接收到的时间', currentTime);
                        // state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,JSON.parse(evt.data) );
                        let message = JSON.parse(evt.data);
                        message.receiverTime = new Date();
                        state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,message );
                    }
                }
            }
            if( receiveMessage.type === "sendFail"){
                console.log('receiveMessage',receiveMessage);
                for(let i = 0; i < state.chatHistorys.length; i++ ){
                    if( state.chatHistorys[i].receiver === receiveMessage.sender ){
                        state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,JSON.parse(evt.data) );
                    }
                }
            }

            if( receiveMessage.type === "acceptAdd" ){

                 //如果有该好友就不要重复添加到数组中
                // for( let i = 0; i < state.friendList.length; i++ ){
                //     if( state.friendList[i].friendWeChatId === receiveMessage.sender ){
                //         return ;
                //     }
                // }

                // state.friendList.splice( state.friendList.length,0,{
                //     friendWeChatId:receiveMessage.sender,
                //     weChatName:receiveMessage.sender,
                //     friendImgURL:'',
                //     friendSex:'',
                //     remarks:'',
                //     source:'',
                //     tag:'',
                //     descript:'', 
                //     addTime:'',
                // });
                // state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:receiveMessage.sender,content:[] });
                //重新请求好友列表
                post('/api/friendList',{'weChatId':state.weChatId})
                .then( res => res.json() )
                .catch(error=>{console.log(error)})
                .then(
                    res => {
                        console.log('res friend',res);
                        state.friendList = res;
                        state.friendList.remarks = state.friendList.weChatId;
                })
                .catch( error=>{console.log(error)} );

                state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:receiveMessage.sender,content:[] });
               


            };
            if( receiveMessage.type === "webrtcOffer" ){

                state.remoteOffer = receiveMessage.content;
                console.log('收到remoteOffer!!!',state.remoteOffer);
                // console.log('dataHandle路由：',state.router );
                //接收到视频请求之后 强制跳转到视频应答页面
                // console.log('friendWeChatId: ',receiveMessage.sender + "friendImg:",receiveMessage.senderImg)
                // console.log('offer');
                state.router.push( {path: '/main/webrtc',query:{ friendWeChatId: receiveMessage.sender, friendImg:receiveMessage.senderImg,type:'answer' } } );
                // this.$router.push( { path: '/main/message-contain/chat-contain/friend-info', query: { friendWeChatId: this.searchContent,page:"friend" }} );
                // <router-link :to="{path:'/main/webrtc',query:{friendWeChatId:$route.query.friendWeChatId}}" tag="button">视频通话</router-link>

            };
            if( receiveMessage.type === "deleteFriend" ){
                if( receiveMessage.content === '无该好友' ){
                    return ;
                }
                if( receiveMessage.content === '删除成功' ){
                    //删除好友列表
                    for( let i = 0; i < state.friendList.length; i++ ){
                        if( state.friendList[i].friendWeChatId === receiveMessage.receiver){
                            state.friendList.splice( i, 1 );
                            // state.router.push( {path: '/'} );
                        }
                    }
                    //删除最近聊天联系人
                    for(let i = state.chatHistorys.length - 1; i >= 0; i-- ){
                        if( state.chatHistorys[i].receiver === receiveMessage.receiver || state.chatHistorys[i].receiver === state.weChatId ){
                            // console.log('111state.weChatId',state.weChatId,"message.receiver",message.receiver);
                            state.chatHistorys.splice( i, 1 );
                        }
                    }
                    //跳回主页
                    state.router.push( {path: '/'} );
                }
            }

            if( receiveMessage.type === "groupChat" || receiveMessage.type === "groupImg"){
                console.log('接收到群消息：', receiveMessage);
                state.groupChat.splice( state.groupChat.length, 0 , receiveMessage );

            }

            if( receiveMessage.type === 'modifyRemarks' ){
                console.log('modifyRemarks $store',receiveMessage);
                // state.friendList
                for(let i = 0; i < state.friendList.length; i++){

                    if( state.friendList[i].friendWeChatId === receiveMessage.receiver ){
                        state.friendList[i].remarks = receiveMessage.content;
                    }

                }

                // console.log('modifyRemarks',state.router);
                state.router.replace( {path: '/'}  );
                // post('/api/friendList',{'weChatId':state.weChatId})
                //     .then( res => res.json() )
                //     .catch(error=>{console.log(error)})
                //     .then(
                //         res => {
                //             console.log('res friend',res);
                //             state.friendList = res;
                //         });
                



            }
            if( receiveMessage.type === 'createGroup' ){
                console.log("群号:", receiveMessage.content);

                let groupEntity = {
                    wechatId:'',                                 //用户id
                    groupId:receiveMessage.content,              //群id
                    groupName:'群聊',                            //群名称
                    groupImg:'http://123.207.3.64/wechat/assets/otherImg.jpg',                                 //群头像
                    remarks:'测试备注',                           //备注
                    notice:'111',                                //群公告
                }
                console.log( " this.groupList",state.groupList);
                state.groupList.splice( state.groupList.length, 0 , groupEntity );


                // groupChat:[
                //     {
                //         sender:'hello',
                //         senderImg:"http://123.207.3.64/wechat/assets/otherImg.jpg",
                //         receiver:'1', //群id
                //         content:'群测试消息',
                //         type:"groupChat",
                //         time:'',
                //     },
                // ],
                
                state.groupChat.splice( state.groupChat.length, 0 ,{
                    sender:'hello',
                    senderImg:"http://123.207.3.64/wechat/assets/otherImg.jpg",
                    receiver:receiveMessage.content, //群id
                    content:'成功创建群组',
                    type:"groupChat",
                    time:'',
                 } );

            }


        };    
            
        state.ws.onclose = function(evt) {    
            alert("连接中断1",evt);    
            // this.$router.replace("/");
        };     
            
        state.ws.onopen = function(evt) {
            // console.log('连接成功');
            // alert('连接成功');
            // alert("链接成功")
        };  
    },
    WEBSOCKETSEND(state,message){   //websocket sendmessage 通过websocket方式发送消息
        console.log('json序列化',JSON.stringify({"sender":state.weChatId,"receiver":"admin","content":message.content}) );
        // state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"chat","content":message.content}) );   
        state.ws.send( JSON.stringify(message) );   
        
        // for(let i = 0; i < state.chatHistorys.length; i++ ){
        //     if( state.chatHistorys[i].receiver === message.receiver ){
        //         state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,{"sender":state.weChatId,"receiver":message.receiver,type:"chat","content":message.content});
        //     }
        // }

        // message{
        //      sender:'',
        //      senderImg:''
        //      receiver:'',
        //      receiverImg:'',
        //      type: chat || chatImg,
        //      content:'',
        // }

        if( message.type !== 'chat' && message.type !== 'chatImg' && message.type !== 'visitingCard' ){
            console.log('非聊天内容');
            return ;
        }

        for(let i = 0; i < state.chatHistorys.length; i++ ){
            // console.log("state.chatHistorys[i].type",state.chatHistorys[i].type);
            if( state.chatHistorys[i].receiver === message.receiver){
                // state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,{"sender":state.weChatId,"receiver":message.receiver,type:"chat","content":message.content});
                state.chatHistorys[i].content.splice( state.chatHistorys[i].content.length,0,message);
            }
        }
			
    },
    REQFRIENDLIST(state){ //request friendlist  获取朋友列表

        // post('http://localhost:3000/api/friendList',{'weChatId':state.weChatId})
        post('/api/friendList',{'weChatId':state.weChatId})
        .then( res => res.json() )
        .catch(error=>{console.log(error)})
        .then(
            res => {
                console.log('res friend',res);
                state.friendList = res;

                //好友分组聊天记录
                state.friendList.filter(
                    item => {
                        // state.chatHistorys.push( {receiver:item.friendWeChatId,content:[] } );
                        state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:item.friendWeChatId,content:[] });
                    }
                );
                state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:state.weChatId,content:[] });
                console.log("聊天记录分组:", state.chatHistorys);
            }
            
        )
    },
    QUERYUSERINFO(satte,wechatId){ //查询用户消息
        // post('http://localhost:3000/api/queryUserInfo',{'weChatId': wechatId})
        post('/api/queryUserInfo',{'weChatId': wechatId})
        // .then( res => res.json() 
        // .then(
        //     res  => {
        //         console.log('personInfo1',res);
        //         // return res;
        //     }
        // )
    },
    ADDFRIEND(state,message){
        console.log('添加好友mutations1',message);
        state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"addFriend","content":message.content}) );   
    },
    ACCEPTADD(state,message){
        console.log('接受好友信息',message);
        //查询是否存在该好友
        // for( let i = 0; i < state.friendList.length; i++ ){
        //     if( state.friendList[i].friendWeChatId === message.sender ){
        //         return ;
        //     }
        // }

        console.log('同意添加好友');
        state.ws.send( JSON.stringify({"sender":message.receiver,"receiver":message.sender,"type":"acceptAdd","content":"同意添加"}) );  

        //如果有该好友就不要重复添加到数组中
        // for( let i = 0; i < state.friendList.length; i++ ){
        //     if( state.friendList[i].friendWeChatId === message.sender ){
        //         return ;
        //     }
        // }
        // state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:message.sender,content:[] });
        // state.friendList.splice( state.friendList.length,0,{
        //     friendWeChatId:message.sender,
        //     weChatName:message.sender,
        //     friendImgURL:'',
        //     friendSex:'',
        //     remarks:'',
        //     source:'',
        //     tag:'',
        //     descript:'',
        //     addTime:'',
        // });
        
        //重新请求好友列表
        post('/api/friendList',{'weChatId':state.weChatId})
        .then( res => res.json() )
        .catch(error=>{console.log(error)})
        .then(
            res => {
                console.log('res friend',res);
                state.friendList = res;
            });
        
        state.chatHistorys.splice(state.chatHistorys.length,0,{receiver:message.sender,content:[] });


    },
    DELETEFRIEND(state,message){
        
        state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"deleteFriend","content":message.content}) );  

      /* //成功删除好友之后  跳转到首页  并将好友列表和最近消息列表删除
        for( let i = 0; i < state.friendList.length; i++ ){
            if( state.friendList[i].friendWeChatId === message.receiver){
                state.friendList.splice( i, 1 );
                // state.router.push( {path: '/'} );
            }
        }

        for(let i = state.chatHistorys.length - 1; i >= 0; i-- ){
            if( state.chatHistorys[i].receiver === message.receiver || state.chatHistorys[i].receiver === state.weChatId ){
                // console.log('111state.weChatId',state.weChatId,"message.receiver",message.receiver);
                state.chatHistorys.splice( i, 1 );
            }
        }
        console.log('删除好友history11',state.chatHistorys);

        state.router.push( {path: '/'} );*/

    },
    DEFRIEND(state,message){ //拉黑好友
        state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"defriend","content":message.content}) );  
        state.router.push( {path: '/'} );
    },
    FRIEND(state,message){  //拉出黑名单
        state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"friend","content":message.content}) );  
        state.router.push( {path: '/'} );
    },

    //添加到群聊 (测试) 
    GROUPADD(state,message){
        state.ws.send( JSON.stringify({"sender":state.weChatId,"receiver":message.receiver,"type":"groupAdd","content":message.content}) );  
    },
    GROUPCHAT(state,message){   //发送群消息
        state.ws.send( JSON.stringify(message) );   //message:{  }
    },


    
};


export const actions = {
    
}

export const getters = {

    groupChat:function(){
        return this.state.groupChat;
    }

}