<script>
	import {mapState} from 'vuex';

	export default {
        computed: mapState([
            'currentGroupName'
        ])
    };
</script>

<template>
	<div class="topbar">
		{{currentGroupName}}
	</div>
</template>

<style lang="less" scoped>
.topbar {
    height: 40px;
    line-height: 40px;
	text-align: center;
	border-bottom: 1px solid #999;
}
</style>