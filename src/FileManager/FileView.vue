<template>
    <v-hover>
        <v-flex xs4 md3 lg2 pa-3
                v-ripple
                slot-scope="{ hover }"
                class="text-xs-center file"
                @click.prevent="$emit('select', file)"
                @contextmenu="$emit('rightMouseClicked', {event: $event, file: file})">
            <v-badge right v-if="hover">
                <template v-slot:badge>
                    <v-icon color="white" @click.prevent.stop="$emit('download', file)">fa-file-download</v-icon>
                </template>
                <v-icon :size="72" color="primary">fal {{icon}}</v-icon>
            </v-badge>
            <v-icon :size="72" color="gray" v-else>fal {{icon}}</v-icon>
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <div v-on="on" class="subheading text-truncate">{{file.name}}</div>
                </template>
                {{file.name}}
            </v-tooltip>
        </v-flex>
    </v-hover>
</template>

<script>
import ContextMenu from './ContextMenu.vue';

    export default {
        name: 'FileView',
        components: {ContextMenu},
        props: {
            file: {
                required: true,
                type: Object,
            },
            deleteImage: {
                required: false,
                type: Function,
            },
        },
        computed: {
            icon() {
                let mimeType = this.file.mime_type;
                // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
                let icon_classes = {
                    // Media
                    image: 'fa-file-image',
                    audio: 'fa-file-audio',
                    video: 'fa-file-video',

                    // Documents
                    'application/pdf': 'fa-file-pdf',
                    'application/msword': 'fa-file-word',
                    'application/vnd.ms-word': 'fa-file-word',
                    'application/vnd.oasis.opendocument.text': 'fa-file-word',
                    'application/vnd.openxmlformatsfficedocument.wordprocessingml': 'fa-file-word',
                    'application/vnd.ms-excel': 'fa-file-excel',
                    'application/vnd.openxmlformatsfficedocument.spreadsheetml': 'fa-file-excel',
                    'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel',
                    'application/vnd.ms-powerpoint': 'fa-file-powerpoint',
                    'application/vnd.openxmlformatsfficedocument.presentationml': 'fa-file-powerpoint',
                    'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint',
                    'text/plain': 'fa-file-alt',
                    'text/html': 'fa-file-code',
                    'application/json': 'fa-file-code',

                    // Archives
                    'application/gzip': 'fa-file-archive',
                    'application/zip': 'fa-file-archive',
                };

                for (let key in icon_classes) {
                    if (icon_classes.hasOwnProperty(key)) {
                        if (mimeType.search(key) === 0) {
                            return icon_classes[key];
                        }
                    } else {
                        return 'fa-file';
                    }
                }
                return 'fa-file';

            },
        },
    };
</script>

<style scoped>
.file {
    height: 105px;
}
</style>
