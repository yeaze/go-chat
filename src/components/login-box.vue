<script>
	import {mapState, mapMutations, mapGetters} from 'vuex';

	export default {
		data() {
            return {
                account: '',
				nickname: '',
				anhao: ''
            };
        },
        computed: {
            ...mapState([
                'avatars',
				'user',
				'isLogin'
            ])
        },
        methods: mapMutations([
            'selectAvatar',
			'login'
        ])
    };
</script>

<template>
	<div :class="{show: isLogin === false}" class="mask">
		<div class="login-box">
			<p class="tip-text">选择头像</p>
			<ul class="avatar-list">
				<li v-for="item in avatars"  @click="selectAvatar(item)">
					<img :class="{ active: item === user.img }" class="avatar" width="60" height="60" :src="item"/>
				</li>
			</ul>
			<hr/>
			<p class="tip-text">注册账号</p>
			<p style="text-align:center;"><input class="input" type="text" v-model="account" placeholder="账号(仅字母和数字，长度：6-20)"></p>
			<p style="text-align:center;"><input class="input" type="text" v-model="nickname" placeholder="昵称"></p>
			<p style="text-align:center;"><input class="input" type="text" v-model="anhao" placeholder="暗号"></p>
			<p style="text-align:center;">
				<button class="btn" type="button" @click="login({account:account, nickname:nickname, anhao:anhao})">=>进入聊天<=</button>
			</p>
		</div>
	</div>
</template>

<style lang="less" scoped>
.mask {
    position: absolute;
	left: 0;
	top: 0;
	z-index: 100;
	height: 100%;
	width: 100%;
	background: #999;
	opacity: 0.9;
	filter: alpha(opacity=90);
	display: none;
}
.show {
	display: block;
}

.login-box {
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -250px;
	margin-left: -150px;
	width: 300px;
	height: 500px;
	border: 1px solid;
	text-align: center;
	background: #666666;
	-moz-box-shadow:2px 2px 5px #333333;
	-webkit-box-shadow:2px 2px 5px #333333;
	box-shadow:2px 2px 5px #333333;
	border-radius: 10px;
}

.tip-text{
	color: white;
	font-size: 16px;
}

.avatar-list{
	margin: 20px 0 20px;
	list-style:none;
}

.avatar-list li{
	display:inline;
	padding: 2px;
}

.avatar-list li img.active{
	border:solid 1px;
	box-shadow:2px 2px 5px #333333;
	border-radius: 10px;
}

.input {
	display: block;
    width: 80%;
    height: 34px;
	margin: 0 auto;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

.btn {
	display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
</style>