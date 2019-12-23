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
                    <v-list-tile-title @click="dialog = true">
                        <v-icon class="red--text">far fa-trash-alt</v-icon>
                        {{ context }}
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>

        <v-dialog
            v-model="dialog"
            max-width="290">
            <v-card>
                <v-card-title class="headline">Bevestiging voor het verwijderen</v-card-title>
                <v-card-text>
                    {{confirmDeleteMessage}}
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="grey darken-1"
                        text
                        flat
                        @click="dialog = false">
                        Annuleren
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="priamry darken-1"
                        text
                        flat
                        @click="deleteItem">
                        Verwijderen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    props: {
        context: {
            type: String,
            default: '',
        },
        confirmDeleteMessage: {
            required: false,
            type: String,
        },
    },
    data: () => ({
        showMenu: false,
        x: 0,
        y: 0,
        item: null,
        dialog: false,
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
        deleteItem() {
            this.dialog = false;
            this.$emit('deleted', this.item);
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
