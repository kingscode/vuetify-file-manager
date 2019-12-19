<template>
    <v-container grid-list-md fluid id="drop-area" @drop.prevent="handleDrop" @dragover.prevent>
        <v-layout row wrap v-if="files.length > 0">
            <file-view v-on="$listeners"
                       v-for="file in files"
                       :file="file"
            @rightMouseClicked="showContextMenu"/>
        </v-layout>
        <div class="text-xs-center" v-else>
            <v-icon size="150">fa-search</v-icon>
            <div class="mt-3 title">Deze map is leeg, sleep een bestand naar deze map om er een te uploaden</div>
        </div>

        <context-menu
            ref="contextMenu"
            @deleted="deleteImage"
            context="Afbeelding verwijderen"
        ></context-menu>
    </v-container>
</template>

<script>
import FileView from './FileView.vue';
import ContextMenu from './ContextMenu.vue';

export default {
    name: 'FolderView',
    components: {FileView, ContextMenu},
    props: {
        files: {
            required: true,
            type: Array,
        },
        deleteImage: {
            required: false,
            type: Function,
        },
    },
    methods: {
        handleDrop(e) {
            this.$emit('filesDropped', e.dataTransfer.files);
        },
        showContextMenu(params) {
            params.event.preventDefault();
            if (typeof this.deleteImage === 'function') {
                this.$refs.contextMenu.show(params.event, params.file);
            }
        },
    },
};
</script>

<style scoped>

</style>
