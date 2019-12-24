<template>
    <v-hover>
        <v-flex xs4 md3 lg2 pa-3
                v-ripple
                slot-scope="{ hover }"
                class="text-xs-center file"
                @click.prevent="$emit('select', file)">
            <v-speed-dial
                v-model="fab"
                :top="true"
                :right="true"
                direction="bottom"
                transition="slide-y-reverse-transition">
                <template v-slot:activator>
                    <v-btn v-model="fab" color="blue darken-2" dark fab>
                        <v-icon v-if="fab">mdi-close</v-icon>
                        <v-icon v-else>mdi-account-circle</v-icon>
                    </v-btn>
                </template>
                <v-btn fab dark small color="blue" @click.prevent.stop="$emit('download', file)">
                    <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-btn fab dark small color="red" @click.prevent.stop="$emit('showDeleteDialog', file)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-speed-dial>
            <v-img :height="72" :src="`${file.preview_path}?height=80`" v-if="file.preview_path"/>
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
        },
        data: () => {
            return {
                fab: false,
            };
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
        created() {
            console.log(this.file);
        }
    };
</script>

<style scoped>
.file {
    height: 105px;
}
</style>
