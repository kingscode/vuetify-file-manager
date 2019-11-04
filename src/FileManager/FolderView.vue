<template>
    <v-container grid-list-md fluid id="drop-area" @drop.prevent="handleDrop" @dragover.prevent>
        <v-layout row wrap v-if="files.length > 0">
            <file-view v-on="$listeners" v-for="file in files" :file="file"/>
        </v-layout>
        <div class="text-xs-center" v-else>
            <v-icon size="150">fa-search</v-icon>
            <div class="mt-3 title">Deze map is leeg, sleep een bestand naar deze map om er een te uploaden</div>
        </div>
    </v-container>
</template>

<script>
    import FileView from './FileView.vue';

    export default {
        name: 'FolderView',
        components: {FileView},
        props: {
            files: {
                required: true,
                type: Array,
            },
        },
        methods: {
            handleDrop(e) {
                this.$emit('filesDropped', e.dataTransfer.files);
            },
        },
    };
</script>

<style scoped>

</style>
