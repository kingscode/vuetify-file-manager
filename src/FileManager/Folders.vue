<template>
    <div>
        <v-treeview
            :active.sync="active"
            :open.sync="open"
            :items="folderItems"
            activatable
            @contextmenu="showContextMenu($event)"
        >
            <template slot="prepend" slot-scope="{ item, open }">
                <v-icon @contextmenu="showContextMenu($event)">
                    {{ open ? 'fa-folder-open' : 'fa-folder' }}
                </v-icon>
            </template>
            <template slot="label" slot-scope="{ item }">
                <div @contextmenu="showContextMenu($event, item)">
                    {{item.name}}
                </div>
            </template>
        </v-treeview>

        <context-menu
            ref="contextMenu"
            @deleted="deleteFolder"
            context="Folder verwijderen"
        ></context-menu>
    </div>
</template>

<script>
    import ContextMenu from './ContextMenu.vue';

    export default {
        name: 'folders',
        components: {ContextMenu},
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
            deleteFolder: {
                required: false,
                type: Function,
            },
        },
        methods: {
            showContextMenu(e, item) {
                e.preventDefault();
                if (typeof this.deleteFolder === "function") {
                    this.$refs.contextMenu.show(e, item);
                }
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
