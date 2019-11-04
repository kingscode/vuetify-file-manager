<template>
    <v-treeview
        :active.sync="active"
        :open.sync="open"
        :items="folderItems"
        activatable
    >
        <template slot="prepend" slot-scope="{ item, open }">
            <v-icon>
                {{ open ? 'fa-folder-open' : 'fa-folder' }}
            </v-icon>
        </template>
    </v-treeview>
</template>

<script>
    export default {
        name: 'folders',
        data() {
            return {
                active: [],
                open: [],
                folderItems: [],
            };
        },
        watch: {
            folders: {
                immediate: true,
                deep: true,
                handler() {
                    this.folderItems = [{name: this.rootName, id: 'root', children: this.folders}];
                    this.open = ['root'];
                },
            },
            active: {
                deep: true,
                handler(newActive, oldActive) {
                    let active = newActive[0];
                    if(typeof active === 'undefined') {
                        active = oldActive[0];
                    }
                    this.$emit('folderSelected', active);
                },
            },
        },
        props: {
            folders: {
                required: true,
                type: Array,
            },
            rootName: {
                required: false,
                type: String,
                default: 'Website',
            },
        },
    };
</script>

<style>
    .theme--light.v-treeview--hoverable .v-treeview-node__root:hover, .theme--light.v-treeview .v-treeview-node--active
    {
        background: none;
    }

    .v-treeview-node__root
    {
        cursor: pointer;
    }
    .v-icon.v-treeview-node__toggle {
        margin-right: 8px;
    }
</style>
