<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        computed: {
            // 使用 (...) 对象展开运算符将 getter 以及 state 混入 computed 对象中
            ...mapGetters([
                'group'
            ]),
            ...mapState([
                'user'
            ])
        },
        filters: {
            // 将日期过滤为 hour:minutes
            time(date) {
                if (typeof date === 'string') {
                    date = new Date(date);
                }
                return date.getHours() + ':' + date.getMinutes();
            }
        },
        directives: {
            // 发送消息后滚动到底部
            'scroll-bottom': {
                // 在当前组件及其子组件更新完成后调用
                componentUpdated: function (el, binding, vnode) {
                    el.scrollTop = el.scrollHeight - el.clientHeight;
                }
            }
        }
    };
</script>

<template>
    <div class="message" v-scroll-bottom>
        <ul v-if="group">
            <li v-for="item in group.messages">
                <p class="time">
                    <span>{{ item.date | time }}</span>
                </p>
                <div class="main" :class="{ self: item.self }">
                    <img class="avatar" width="35" height="35" :src="item.self ? user.img : item.user.avatar"/>
					<div class="sender">{{ item.user.name }}</div>
                    <div class="text">{{ item.content }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
    .message {
        padding: 10px 15px;
        overflow-y: scroll;

        li {
            margin-bottom: 15px;
        }
        .time {
            margin: 7px 0;
            text-align: center;

            > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
            }
        }
        .avatar {
            float: left;
            margin: 4px 10px 0 0;
            border-radius: 3px;
			
        }
		.sender {
			font-size: 12px;
			color: #999;
			line-height: 1;
			margin-bottom: 6px;
		}
		
        .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: ~'calc(100% - 60px)';
            min-height: 30px;
            line-height: 2.5;
            font-size: 14px;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;

            &:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
        }

        .self {
            text-align: right;

            .avatar {
                float: right;
                margin: 4px 0 0 10px;
            }
            .text {
                background-color: #b2e281;

                &:before {
                    right: inherit;
                    left: 100%;
                    border-right-color: transparent;
                    border-left-color: #b2e281;
                }
            }
        }
    }
</style>