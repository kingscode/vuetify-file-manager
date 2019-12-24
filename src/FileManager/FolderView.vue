<template>
    <v-container grid-list-md fluid id="drop-area" @drop.prevent="handleDrop" @dragover.prevent>
        <v-layout row wrap v-if="files.length > 0">
            <file-view v-on="$listeners"
                       v-for="file in files"
                       :file="file"
                        @showDeleteDialog="showDeleteDialog"/>
        </v-layout>
        <div class="text-xs-center" v-else>
            <v-icon size="150">fa-search</v-icon>
            <div class="mt-3 title">{{$vuetify.lang.t('$vuetify.fileManager.folder.empty')}}</div>
        </div>

        <delete-dialog
            ref="deleteDialog"
            :confirmDeleteMessage="confirmDeleteMessage"
            @deleted="deleteImage"
        ></delete-dialog>
    </v-container>
</template>

<script>
import DeleteDialog from './DeleteDialog.vue';
import FileView from './FileView.vue';
import ContextMenu from './ContextMenu.vue';

export default {
    name: 'FolderView',
    components: {DeleteDialog, FileView, ContextMenu},
    props: {
        files: {
            required: true,
            type: Array,
        },
        deleteImage: {
            required: false,
            type: Function,
        },
        confirmDeleteMessage: {
            required: false,
            type: String,
        },
    },
    methods: {
        handleDrop(e) {
            this.$emit('filesDropped', e.dataTransfer.files);
        },
        showDeleteDialog(item) {
            this.$refs.deleteDialog.show(item);
        },
    },
};
</script>

<style scoped>

</style>
