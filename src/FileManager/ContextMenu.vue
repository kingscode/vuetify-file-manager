<template>
    <div>
        <!-- Menu opens at cursor position -->
        <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y>
            <v-list class="clickable">
                <v-list-tile>
                    <v-list-tile-title @click="$emit('showDeleteDialog', item)">
                        <v-icon class="red--text">far fa-trash-alt</v-icon>
                        {{item.name}} {{ $vuetify.lang.t('$vuetify.delete') }}
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    data: () => ({
        showMenu: false,
        x: 0,
        y: 0,
        item: null,
    }),
    methods: {
        show(e, item) {
            e.preventDefault();
            this.showMenu = false;
            this.item = item;
            this.x = e.clientX;
            this.y = e.clientY;
            this.$nextTick(() => {
                this.showMenu = true;
            });
        },
    },
};
</script>

<style>
.clickable
{
    cursor: pointer !important;
}
</style>
