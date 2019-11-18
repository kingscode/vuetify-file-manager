# vuetify-file-manager
A file manager for your CMS or application powered by vuetify

## Install
- First install it via npm `npm i @kingscode/vuetify-file-manager`
- Import it in your main.js and `Vue.use(VuetifyFileManager);`
- Implement it in your own wrapping component, this will be the component you'll use everywhere.
  In this component you make the connection to the api

## Server (comming soom)
At this moment we are making our laravel api plugin public as well, this plugin works seemless with the code below.

## Example
This is an exmaple of how you could implement the file manager. It has a wrapper (with all the comunications to your API) and a selector.
The selector is an input field where you can choose a file from the file manager

FileManagerWrapper.vue
```
<template>
    <vuetify-file-manager root-name="website"
                  :get-folders="getFolders"
                  @filesDropped="uploadFiles"
                  :getFolderContent="getFolderContent"
                  @download="downloadFile"
                  @select="selectFile"
                  :createFolder="createFolder"
    ></vuetify-file-manager>
</template>

<script>

    export default {
        name: 'FileManagerWrapper',
        data() {
            return {
                selectedDirectoryId: null,
            };
        },
        props: {
            canSelectFile: {
                type: Boolean,
                default: true,
                required: false,
            }
        },
        methods: {
            getFolders() {
                return new Promise(resolve => {
                    this.$http.get('url_to_get_the_folders').then((response) => {
                        resolve(response.data.data);
                    });
                });
            },
            getFolderContent(directoryId) {
                return new Promise(resolve => {
                    this.selectedDirectoryId = null;
                    this.$http.get('url_to_get_a_folders_content_with_files').then((response) => {
                        resolve(response.data.data.map((file) => {
                            return {
                                id: file.id,
                                name: file.name,
                                mime_type: file.media.mime_type,
                                download_path: file.download_path,
                                preview_path: file.preview_path,
                            };
                        }));
                    });
                });
            },
            uploadFiles(files) {
                for (let i = 0; i < files.length; i++) {
                    let formData = new FormData();
                    formData.append('file', files[i]);
                    formData.append('name', files[i].name);
                    this.$http.post('url_to_upload_a_file', formData);
                }
            },
            selectFile(file) {
                if(this.canSelectFile) {
                    this.$emit('selected', file);
                } else {
                    window.open(
                        file.download_path,
                        '_blank'
                    );
                }
            },
            downloadFile(file) {
                window.open(
                    file.download_path,
                    '_blank'
                );
            },
            createFolder(name, parent) {
                return new Promise(resolve => {
                    this.$http.post('url_to_create_a_folder', {name: name, directory_id: parent}).then(() => {
                        resolve()
                    })
                })
            }
        },
    };
</script>
```

FileManagerSelector.vue
a component to create a file input
```
<template>
    <div>
        <v-text-field :label="label" @click="fileManager = true" v-model="name" prepend-icon="fal fa-paperclip"/>
        <v-dialog content-class="file-manager" v-model="fileManager">
            <v-card>
                <file-manager-wrapper @selected="fileSelected"/>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import FileManagerWrapper from './FileManagerWrapper.vue';

    export default {
        name: 'FileManagerSelector',
        components: {FileManagerWrapper},
        props: {
            value: {
                type: Object,
            },
            label: {
                type: String,
                default: 'Kies een bestand',
            },
        },
        watch: {
            fileId: {
                handler() {
                    this.$emit('input', {id: this.fileId, name: this.name});
                },
            },
            value: {
                immediate: true,
                handler() {
                    this.fileId = this.value?.id;
                    this.name = this.value?.name;
                },
            },
        },
        data() {
            return {
                fileManager: false,
                fileId: null,
                name: '',
            };
        },
        methods: {
            fileSelected(file) {
                this.fileId = file.id;
                this.name = file.name;
                this.fileManager = false;
            },
        },
    };
</script>

<style lang="scss">
    .file-manager.v-dialog {
        height: 90%;

        .v-card {
            height: 100%;
        }
    }
</style>
```
