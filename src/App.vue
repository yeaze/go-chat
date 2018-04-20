<script>
    import {mapMutations} from 'vuex';

	import LoginBox from 'components/login-box';
    import Card from 'components/card';
    import List from 'components/list';
	import TopBar from 'components/top-bar';
    import TextInput from 'components/text-input';
    import Message from 'components/message';

    export default {
        components: {LoginBox, Card, List, TopBar, TextInput, Message},
        methods: mapMutations([
            'initData',
			'connection'
        ]),
        created() {
            this.initData();
			this.connection();
        }
    };
</script>

<template>
    <div id="app">
		<div class="login-box">
			<login-box></login-box>
		</div>
        <div class="sidebar">
            <card></card>
            <list></list>
        </div>
        <div class="main">
			<top-bar></top-bar>
            <message></message>
            <text-input></text-input>
        </div>
    </div>
</template>

<style lang="less" scoped>
    #app {
        margin: 20px auto;
        width: 800px;
        height: 600px;

        overflow: hidden;
        border-radius: 3px;

        .sidebar, .main {
            height: 100%;
        }
        .sidebar {
            float: left;
            width: 200px;
            color: #f4f4f4;
            background-color: #2e3238;
        }
        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
        .text {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
        }
        .message {
            height: ~'calc(100% - 200px)';
        }
    }
</style>
