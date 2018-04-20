<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'currentGroupId',
            ]),
            ...mapGetters([
                'filteredGroups'
            ])
        },
        methods: mapMutations([
            'selectGroup'
        ])
    };
</script>

<template>
    <div class="list">
        <ul>
            <li v-for="item in filteredGroups" :class="{ active: item.group.id === currentGroupId }" @click="selectGroup({id:item.group.id, name:item.group.name})">
                <img class="avatar" width="40" height="40" :alt="item.group.name" :src="item.group.img">
                <p class="name">{{item.group.name}}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="less">
    .list {
        li {
            padding: 12px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            transition: background-color .1s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
            border-radius: 2px;
        }
        .name {
            display: inline-block;
            margin: 0 0 0 15px;
        }
    }
</style>