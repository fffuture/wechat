<template>
	<div class="message">
		<router-link class="messageItem" :to="{path:'/main/message-contain/chat-details',query:{ friendWeChatId:item.receiver }}" v-for="(item,index) in recentContact" :key="index + 'message'"   tag="div">
			<!-- <img src="http://123.207.3.64/wechat/assets/otherImg.jpg" alt=""> -->
			<img :src=" item.imgUrl " alt="">
			<div class="message-body">
				<div> {{item.receiver}} </div>
				<!-- <div> {{item.remarks}} </div> -->
				<div v-html="item.content[item.content.length-1].type==='chatImg'?'[图片]':item.content[item.content.length-1].content"></div>
			</div>
			<div class="color-gray">
				<span>早上8:58</span>
                <img class="icon-muse" src="@/static/img/icons/muse-message.png" alt="">
			</div>
		</router-link>

		<!-- <router-link class="messageItem" :to="{path:'/main/message-contain/chat-details',query:{friendWeChatId:item.receiver}}"  tag="div">
			<img src="http://123.207.3.64/wechat/assets/otherImg.jpg" alt="">
			<div class="message-body">
				<span class="contactName">群聊名称</span>
				<span class="color-gray">微信支付凭证</span>	
			</div>
			<div class="color-gray">
				<span>早上8:58</span>
                <img class="icon-muse" src="@/static/img/icons/muse-message.png" alt="">
			</div>
		</router-link> -->
		<router-link class="messageItem" v-for="(group,index) in groupList" :key="index"
			:to="{path:'/main/message-contain/group-chat',
				query:{
					'groupId':group.groupId,
					'groupName':group.groupName,
					'type':'group'
				}
			}" 
			tag="div">
			<img src="http://123.207.3.64/wechat/assets/otherImg.jpg" alt="">
			<div class="message-body">
				<span class="contactName">{{ groupList[0].groupName }}</span>
				<span class="color-gray"></span>	
			</div>
			<div class="color-gray">
				<span>早上8:58</span>
                <img class="icon-muse" src="@/static/img/icons/muse-message.png" alt="">
			</div>
		</router-link>

		<!-- <router-link class="messageItem" 
			:to="{path:'/main/select-user',
				query:{
					'groupId':groupList[0].groupId,
					'groupName':groupList[0].groupName,
					'type':'group'
				}
			}" 
			tag="div">
			<img src="http://123.207.3.64/wechat/assets/otherImg.jpg" alt="">
			<div class="message-body">
				<span class="contactName">多选用户</span>
				<span class="color-gray"></span>	
			</div>
			<div class="color-gray">
				<span>早上8:58</span>
                <img class="icon-muse" src="@/static/img/icons/muse-message.png" alt="">
			</div>
		</router-link> -->

		<!-- <router-link class="messageItem red-point" to="/main/message-contain/chat-contain/webrtc"  tag="div"> -->
		<!-- <router-link class="messageItem red-point" to="/main/webrtc"  tag="div">
			<img src="http://123.207.3.64/wechat/assets/otherImg.jpg" alt="">
			<div>
				<span class="contactName">微信支付</span>
				<span class="color-gray">微信支付凭证</span>	
			</div>
			<div class="color-gray">
				<span>早上8:58</span>
                <img class="icon-muse" src="@/static/img/icons/muse-message.png" alt="">
			</div>
		</router-link> -->

	</div>
</template>
<script>

import { mapState } from 'vuex'

export default{
	components:{
		
	},
	data(){
		return{

		}
	},
	computed:{
		...mapState(
			'dataHandler',
			{
				chatHistorys: state => state.chatHistorys,
				friendList: state => state.friendList,
				groupList: state => state.groupList
			}
		),
		/*recentContact:function(){
			return this.$store.state.dataHandler.chatHistorys.filter(
				item => {
					// console.log( "item,",item );
					return item.content.length > 0;
				}
			)
		},*/
		recentContact:function(){
			let arr = this.chatHistorys.filter(
				item => {
					// console.log( "item,",item );
					return item.content.length > 0;
				}
			)
			// arr = JSON.parse( JSON.stringify( arr ) );
			
			arr = arr.filter(
				user => {
					let tempt = this.friendList.filter( 
						friend => user.receiver === friend.friendWeChatId
					)[0];
					user.remarks = tempt.remarks;
					user.imgUrl = tempt.imgUrl;
					return true;
				}
			);
			arr = JSON.parse( JSON.stringify( arr ) );

			console.log( 'arr ', arr );
			return arr;
		},
		// groupList:function(){
		// 	return this.$store.state.dataHandler.groupList;
		// }
	},
	mounted:function(){
		console.log('this.groupList',this.groupList );
	}
	
}
</script>
<style scoped>
	.message{
		display: flex;
        flex-direction: column;
        justify-content: flex-start;
		box-sizing: border-box; 
		width: 100%;
        height: 100%;
		background: rgb(235,235,235);
	}

	.messageItem{
        box-sizing: border-box;
        padding:0 .75rem;
		display: flex;
        justify-content: space-between;
        align-items: center;
		width: 100%;
        height: 4rem;
		background: white;
		font-size: .8rem;
		position: relative;
		overflow: hidden;
	}
	.messageItem img{
        box-sizing: border-box;
		display: inline-block;
        flex-shrink: 0;
		margin-right: .5rem;
		width: 3rem;
        height: 3rem;
	}

    .messageItem .icon-muse{
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        background-size: 100% 100%;
        overflow: hidden;
    }
	.messageItem:after{
		position: absolute;
		content:"";
		width: 100%;
        height: .036rem;
		background-color: rgb(190,190,190);
		left:0;
        top:3.98rem;
		transform:scaleY(.5);
		z-index:1;
	}
	.red-point{
		position: relative;
	}
	.red-point:before{
		position: absolute;
		display: block;
		content:"";
		width: .5rem;height: .5rem;
		border-radius: 50% 50%;
		background: red;
		left: 3.5rem;top:.3rem;
	}

	.messageItem .message-body{
		display: flex;
		flex-shrink: 2;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
		height: 3rem;
	}
	.messageItem .message-body div{
		flex-shrink: 1;
		width: 100%;
		height: 1.5rem;
		line-height: 1.5rem;
		overflow: hidden;
	}
	.messageItem .message-body div:first-child{
		font-size: 1rem; 
	}
	.messageItem > div:last-child{
		position: relative;
		flex-shrink: 0;
		align-self: flex-end;
		align-items: flex-end;
		justify-content: flex-start;
		width: 4rem;
		height: 3rem;
		line-height: 1.2rem;
		/* background: cyan; */
		z-index:1;
	}

</style>
