/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
import AES from 'crypto-js/aes';
import AESUtf8 from 'crypto-js/enc-utf8';
import {Ws} from './iris-ws.js';

Vue.use(Vuex);

const now = new Date();
const store = new Vuex.Store({
    state: {
		avatars: [
			'dist/images/avatars/capitan_america.png',
			'dist/images/avatars/diamond_man.png',
			'dist/images/avatars/hulk.png',
			'dist/images/avatars/iron_man.png',
			'dist/images/avatars/jack.png',
			'dist/images/avatars/psy.png',
			'dist/images/avatars/simpson.png',
			'dist/images/avatars/trololo.png',
		],
		
        // 当前用户
        user: {
			id: '',
            name: '',
            img: 'dist/images/1.jpg'
        },
        // 会话列表
		groups: [
            {
                group: {
					id: 'we-love-work',
                    name: '我们热爱工作',
                    img: 'dist/images/wa.png'
                },
                messages: [
                    {
						user: {
							id: '1',
							name: 'kwokcc',
							avatar: 'dist/images/wa.png',
						},
                        content: '欢迎来到王者荣耀！',
                        date: now
                    }, {
						user: {
							id: '2',
							name: 'Yeaze',
							avatar: 'dist/images/wa.png',
						},
                        content: '让我们开始聊天吧',
                        date: now
                    }
                ]
            },
			{
                group: {
					id: 'read-me',
                    name: 'README',
                    img: 'dist/images/wa.png'
                },
                messages: [
                    {
						user: {
							id: '2',
							name: 'Yeaze',
							avatar: 'dist/images/wa.png',
						},
                        content: '这是一个基于Vue + Vuex + Webpack + Websocket + Golang + Iris 构建的简单聊天室，聊天记录保存在localStorge, 聊天消息加密后传输。',
                        date: now
                    }
                ]
            }
			
        ],
		
		//是否登录
		isLogin: false,
		//websocket连接
		socket: '',
        // 当前选中的会话
        currentGroupId: 'we-love-work',
		currentGroupName: '我们热爱工作',
        // 过滤出只包含这个key的会话
        filterKey: ''
    },
    mutations: {
        initData(state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.groups = JSON.parse(data);
            }
			
			let userinfo = localStorage.getItem('vue-chat-user');
			if(userinfo) {
				userinfo = JSON.parse(userinfo);
				state.user.id = userinfo.id;
				state.user.name= userinfo.name;
				state.user.img = userinfo.avatar;
				state.isLogin = userinfo.isLogin;
			}	
        },
		
		//连接websocket
		connection(state) {
			state.socket = new Ws('ws://192.168.49.234:9090/chat');
			
			//连接建立
			state.socket.OnConnect(function() {
				let myRooms = new Array();
				for (let v in state.groups) {
					myRooms[v] = state.groups[v].group.id;
				}

				state.socket.Emit("join", {"myRooms": myRooms});
				console.log('房间加入成功');
			});
			
			//连接丢失
			state.socket.OnDisconnect(function() {
				alert('连接丢失');
				console.log('连接丢失');
			});
			
			//接收聊天消息
			state.socket.On("chat", function(msg) {
				let receiveStr = AES.decrypt(msg, 'secret key 123');
				let jsonStr = receiveStr.toString(AESUtf8);
				let message = JSON.parse(jsonStr);

				if(message.user.id != state.user.id) {
					let group = state.groups.find(item => item.group.id === state.currentGroupId);
					group.messages.push({
						user: {
							id: message.user.id,
							name: message.user.name,
							avatar: message.user.avatar,
						},
						content: message.content,
						date: new Date(),
						self: false
					});
				}
				
			});
		},
		
        // 发送消息
        sendMessage({user, socket, groups, currentGroupId}, content) {
            let session = groups.find(item => item.group.id === currentGroupId);
            let sender = {
				id: user.id,
				name: user.name,
				avatar: user.img,
			};
			
			session.messages.push({
				user: sender,
                content: content,
                date: new Date(),
                self: true
            });
			
			let msg = {
				user: sender,
				content: content
			};

			let cipher = AES.encrypt(JSON.stringify(msg), 'secret key 123');
			let message = {"roomId": currentGroupId, "msg": cipher.toString()};
			socket.Emit("chat", message);
			console.log('消息已发送');
        },
		
		//选择头像
		selectAvatar(state, avatar) {
            state.user.img = avatar;
        },
		
		//登录
		login(state, params) {
			if(state.user.img == 'dist/images/1.jpg') {
				alert('请选择头像');
				return;
			}
			
			
			if(params.account == '') {
				alert('请输入账号');
				return;
			}
			let length = params.account.length;
			if(length < 6 || length >20) {
				alert('账号长度不符合要求');
				return;
			}
			
			
			if(params.nickname == '') {
				alert('请输入昵称');
				return;
			}
			
			if(params.anhao == '') {
				alert('喂喂喂！你的暗号呢？');
				return;
			}
			
			if(params.anhao != '我们热爱工作') {
				alert('想蒙混过关？出门右拐！');
				return;
			}
			
			state.user.id = params.account;
			state.user.name = params.nickname;
			state.isLogin = true;
			let userinfo = {id: state.user.id, name: state.user.name, avatar: state.user.img, isLogin: state.isLogin};
			localStorage.setItem('vue-chat-user', JSON.stringify(userinfo));
		},
		
        // 选择会话
        selectGroup(state, params) {
            state.currentGroupId = params.id;
			state.currentGroupName = params.name;
        },
        // 搜索
        setFilterKey(state, value) {
            state.filterKey = value;
        }
    },
    getters: {
        // 当前会话 session
        group: ({groups, currentGroupId}) => groups.find(item => item.group.id === currentGroupId),
        // 过滤后的会话列表
        filteredGroups: ({groups, filterKey}) => {
            let result = groups.filter(item => item.group.name.includes(filterKey));
            return result;
        }
    }
});

store.watch(
    (state) => state.groups,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
