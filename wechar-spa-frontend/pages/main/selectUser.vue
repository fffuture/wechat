<template>
    <div class="selectUser">
        <header ref="header">
			<div @click=" $router.replace('/') ">
                <svg style="width:2rem;height:2rem">
                    <use xlink:href="#back-fix-friendCircle" />
                </svg>
				<span @click=" $router.replace('/') ">
                    发起群聊
                </span>
			</div>

            <button @click="submit">
                确定({{checkedUser.length}})
            </button>
           
		</header>

        <div class="list">
            <div class="user" v-for="(user,index) in userList" :class="{ hadGroupName:user.isFirst }" :key="index" @click.stop="setChecked(index)">
                <div class="groupName" v-if="user.isFirst" :id="user.firstLetter">
                    {{ user.firstLetter }}
                </div>
                <img :src="user.imgUrl" alt="">
                <div class="name">{{ user.remarks }}</div>
                <div :class="{  'unChecked' : !user.checked, 'checked': user.checked }">
                    <span></span>
                </div>
            </div>
        </div>
        

        <div class="selectGroup" ref="selectGroup" onselectstart="return false" @touchstart.stop.prevent='selectGroup'  @touchmove.stop.prevent='selectGroup' @touchend.stop.prevent='selectGroupEnd'>
			<div v-for="item in group" :key="item" >
				<a :href="'#' + item ">
					{{item}}
				</a>
			</div>
		</div>
		<div class="showGroup" v-if="showGroup">
			{{currentGroup}}
		</div>
      
    </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
    data() {
        return {
            userList: [],
            group:[ "^","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#" ],
			showGroup:false,
            currentGroup:'^',
            currentTime:'',
        }
    },
    computed:{
        ...mapState('dataHandler',{
            user: state => state.currentUser,
            friendList:　state => state.friendList,
        }),
        checkedUser:function(){
            if( this.userList.length <= 0 ){
                return [];
            }
            console.log("userList",this.userList);
            return this.userList.filter(
                user => user.checked
            )
        }
    },
    methods:{
        submit:function(){
            // let checkedUserList = this.checkedUser.filter(
            //     user => user.friendWeChatId
            // )
            let checkedUserList = [];
            for( let i = 0; i < this.checkedUser.length; i++ ){
                checkedUserList.push( this.checkedUser[i].friendWeChatId )
            }
            // console.log('checkedUserList',checkedUserList);

            

            // console.log( 'shareUser:', shareUser);

            if( this.$route.query.page === "visitingCard" ){

                let targetUser = checkedUserList[0];

                let shareUser = this.friendList.filter(
                    user => user.friendWeChatId === this.$route.query.friendWeChatId
                )[0];
                console.log("执行发送好友名片操作");
                // console.log("user",this.user);
                let message = {
                    'sender': this.user.weChatId,
                    'senderImg': this.user.imgURL,
                    'receiver': targetUser,
                    'type':'visitingCard',
                    'content':{
                        'friendWeChatId': shareUser.friendWeChatId,
                        'friendWeChatName': shareUser.weChatName,
                        'friendImgUrl': shareUser.imgUrl,
                    }
                }
                console.log('share message', message);
                this.$store.commit('dataHandler/WEBSOCKETSEND',message);
                this.$router.replace('/');
            }

            if( this.$route.query.page === "createGroup" ){
                console.log("群组成员",checkedUserList);

                // let currentTime = new Date();
                console.log("currentTime",this.currentTime);
                // let createGroupInfo = {
                //     'sender': this.user.weChatId,
                //     'senderImg': this.user.imgURL,
                //     'receiver': this.user.weChatId,
                //     'type':'createGroup',
                //     'content':{
                //         'name':'群聊',
                //         'creator': this.user.weChatId + currentTime
                //     }
                // }
                let createGroupInfo = {
                    'sender': this.user.weChatId,
                    'senderImg': this.user.imgURL, 
                    'receiver': '群聊', 
                    'type':'createGroup',
                    'content': this.user.weChatId + this.currentTime
                }

                console.log("createGroupInfo",createGroupInfo);
                this.$store.commit('dataHandler/WEBSOCKETSEND',createGroupInfo);

                setTimeout(
                    function(){},500
                );
                checkedUserList.push( this.user.weChatId );
                for( let i = 0; i < checkedUserList.length; i++ ){
                    console.log( "member: ", checkedUserList[i] );
                    let memberInfo = {
                        'sender': '群聊',
                        'senderImg': this.user.imgURL, 
                        'receiver': checkedUserList[i], 
                        'type':'addGroupMember',
                        'content': this.user.weChatId + this.currentTime
                    }
                    console.log("createGroupInfo",createGroupInfo);
                    this.$store.commit('dataHandler/WEBSOCKETSEND',memberInfo);
                }

                this.$router.replace('/');
        


                // console.log("创建群组");
            }


        },
        setChecked:function( index ){
            // console.log( this.userList[index] );
            // console.log( "this.userList : ",this.userList );
            this.userList[index].checked = !this.userList[index].checked;
        },
        friendListSort: function(){
			let addSpellList = this.friendList.filter(
				friend => {
					friend.letterSpell = friend.remarks.spell();
					friend.firstLetter = (friend.letterSpell.split('')[0] + "").toUpperCase();
					return true;
				}
			);
			let letterBegin = /^[a-zA-Z]/;
			let sortList = addSpellList.sort(
				( pre, next ) => {
					switch(true){
						case letterBegin.test( pre.letterSpell ) && letterBegin.test( next.letterSpell ) :
							return pre.letterSpell.localeCompare( next.letterSpell );
						case letterBegin.test( pre.letterSpell ) && !letterBegin.test( next.letterSpell ) :
							return 1;
						case !letterBegin.test( pre.letterSpell ) && letterBegin.test( next.letterSpell ) :
							return -1;
						default :
							return 0;
					}

				}
			)
			function firstJudge( arr, param, index ){ 
				let paramList = [];
				arr.filter(
					item => {
						paramList.push(item.firstLetter);
						return true; 
					}
				)
				let isFrist = paramList.indexOf( param );
				if( isFrist === index ){
					return true;
				}
				return false
			}
			return sortList.filter(
				(friend,index,list) => {
					friend.isFirst = firstJudge( list, friend.firstLetter, index);
					return true;
				}
			);
        },
        //通过事件委托来提升性能
		selectGroup:function( e ){
            this.$refs.selectGroup.style="background:gray";
            let listHeight = this.$refs.selectGroup.offsetHeight;
			// let height = this.$refs.contact.offsetHeight;
			let headerHeight = this.$refs.header.offsetHeight;
			// console.log("header",this.$refs.reference.offsetHeight);
			let lastPosY = e.targetTouches[0].clientY;
			for( let i = 1; i <= this.group.length; i++ ){
				if( (listHeight/28) * i > (lastPosY - headerHeight) ){
					this.currentGroup = this.group[i-1];
					this.showGroup = true;
					console.log("i",i);
					//拿到对应节点，模拟点击事件
					console.log("dom",this.$refs.selectGroup.getElementsByTagName('div')[i] );
					this.$refs.selectGroup.getElementsByTagName('div')[i-1].getElementsByTagName('a')[0].click();
					// this.$refs.selectGroup.a[i].click();
					return ;
				}
			}
		},
		selectGroupEnd:function(){
			this.$refs.selectGroup.style="background:transprant";
			// console.log('item');
			this.showGroup=false;
		},
        
    },
    mounted:function() { 
        this.currentTime = new Date();
         console.log( 'query', this.$route.query );

        // console.log('friendList',this.friendList);
        // console.log('friendListSort',this.friendListSort);
        // this.userList = friendListSort
        let arr = this.friendListSort();
        this.userList = JSON.parse( JSON.stringify(arr) ); //利用JSON实现深拷贝

        this.userList.filter( (user,index,arr) =>  this.$set( user, 'checked' , false ) )
        this.userList[2].checked = true;
    },
    
}
</script>
<style scoped>
.selectUser {
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
header {
    position: fixed;
    left:0;top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding:0 1rem 0 0;
    width:100%;height: 3.5rem;
    background: #ededed;
    z-index:1;
}
header div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    min-width:0;
    height: 100%;
    color:#3b3b3b;
}
header button {
    outline: none;
    padding: .5rem 1rem;
    display: block;
    border:none;
    background: #07c160;
    border-radius: .3rem;
    color:#d4f4e4;
}

.list {
    margin-top: 3.5rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: scroll;
    /* background: orange; */
}

.user {
    position: relative;
    box-sizing: border-box;
    /* padding: .25rem 1rem .25rem .75rem; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3.6rem;
}
.user img {
    display: block;
    padding:0;
    margin: 0 1rem 0 .75rem;;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: .3rem;
}
.user .name {
    box-sizing: border-box;
    padding-right: 2rem;
    flex-shrink: 1;
    width: 100%;
    height: 3.6rem;
    line-height: 3.6rem;
    border-bottom: .01rem solid rgb(240,240,240);
}
.user .unChecked{
    position: absolute;
    right: 2rem;
    top:1rem;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    /* background: red; */
    border: .02rem solid #c6c6c6;
}
.user .checked{
    position: absolute;
    right: 2rem;
    top:1rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    background: #1aad19;
    border: none;
    border-radius: .15rem;
}
.user .checked span{
    display: block;
    height: .6rem;
    width: .3rem;
    /* background: orange; */
    border-right: .15rem solid #fff;
    border-bottom: .15rem solid #fff;
    border-left: 0 solid #fff;
    border-top: 0 solid #fff;
    transform: rotate( 30deg ) translateY( -.1rem);
    /* border-radius: .01rem 0; */
    /* transform: ; */
}

.user .groupName{
    box-sizing: border-box;
    padding: 0 .75rem;
    position: absolute;
    top:-1rem;
    left:0;
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size:.7rem;
    background: #ebebeb;
    color:#8a8a8a;
}
.hadGroupName{
    margin-top:1rem;
}

.selectGroup{
    position: fixed;
    right:0rem;
    top: 3.5rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 1.5rem;
    height: 100%;
    z-index: 1;
    /* background: orange; */
}
.selectGroup div{
    display: flex;
    flex-grow:1;
    justify-content: center;
    width: 100%;
    min-height: 0;
    text-align: center;
    font-size: .7rem;
    color:#303030;
}
.selectGroup a{
    text-decoration: none;
    color:#303030;
}
.showGroup{
    position: fixed;
    left: 40%;
    top: 40%;
    width:5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    background: rgba(60,60,60,.6);
    color:white;
    border-radius:.5rem .5rem;
    z-index:2;
}



</style>