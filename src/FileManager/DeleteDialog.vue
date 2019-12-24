<template>
    <v-dialog
        v-model="dialog"
        max-width="290">
        <v-card>
            <v-card-title class="headline">{{$vuetify.lang.t('$vuetify.fileManager.confirmation_delete')}}
            </v-card-title>
            <v-card-text>
                {{$vuetify.lang.t('$vuetify.fileManager.image.delete.warning')}}
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="grey darken-1"
                    text
                    flat
                    @click="dialog = false">
                    {{$vuetify.lang.t('$vuetify.cancel')}}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="priamry darken-1"
                    text
                    flat
                    @click="deleteItem">
                    {{$vuetify.lang.t('$vuetify.delete')}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DeleteDialog',
    data: () => {
        return {
            dialog: false,
            item: null,
        };
    },
    methods: {
        deleteItem() {
            this.dialog = false;
            this.$emit('deleted', this.item);
        },
        show(item) {
            this.item = item;
            this.dialog = true;
        },
    },
};
</script>

<style scoped>

</style>