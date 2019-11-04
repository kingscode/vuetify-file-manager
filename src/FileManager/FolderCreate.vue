<template>
    <div class="folder-create-wrapper">
        <v-tooltip left>
            <template v-slot:activator="{ on }">
                <v-btn
                    v-on="on"
                    class="createFolderBtn"
                    absolute
                    dark
                    fab
                    bottom
                    right
                    small
                    color="accent"
                    @click="dialog = true"
                >
                    <v-icon>fa-plus</v-icon>
                </v-btn>
            </template>
            Maak een nieuwe map aan
        </v-tooltip>
        <v-dialog v-model="dialog" width="300px">
            <v-card>
                <v-card-title>Maak een nieuwe map aan</v-card-title>
                <v-card-text>
                    <v-text-field label="Naam" hint="Wat is de naam van de map" v-model="name"/>
                    <v-select :items="foldersWithWebsiteParent"
                              label="Bovenliggende map"
                              item-text="name"
                              item-value="id"
                              v-model="parent"/>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="accent" @click="callCreateFolder">Maken</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: 'FolderCreate',
        props: {
            folders: {
                required: true,
                type: Array,
            },
            createFolder: {
                required: true,
                type: Function,
            },
        },
        data() {
            return {
                dialog: false,
                name: '',
                parent: null,
            };
        },
        computed: {
            foldersWithWebsiteParent() {
                return [...this.folders, {name: 'Website', id: null}];
            },
        },
        methods: {
            callCreateFolder() {
                this.createFolder(this.name, this.parent).then(() => {
                    this.dialog = false;
                    this.$emit('folderCreated');
                    this.name = null;
                    this.parent = null;
                });
            },
        },
    };
</script>

<style scoped>
    .createFolderBtn
    {
        bottom: 20px !important;
    }
</style>
