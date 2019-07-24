<template>
    <div class="album-list">
        <custom-dropdown/>
        <input type="text" v-model="albumSearch" v-bind:class="{'showing-albums': this.foundAlbums.length > 0}" placeholder="Begin Typing Album Name">
        <div class="found-albums">
            <transition-group name="fade" tag="ul">
                <li @click="navigateToAlbum(album.basic_information.id)" class="album" v-for="album in foundAlbums" v-bind:key="album.id">
                    <img v-bind:src="album.basic_information.cover_image">
                    <div class="details">
                        <span class="title">{{album.basic_information.title}}</span>
                        <span class="artist">
                            {{album.basic_information.artists[0].name}}
                        </span>
                    </div>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import CustomDropdown from './Dropdown'
    import api from '../apis/discogs'
    export default {
        name: "list",
        components: {
            'custom-dropdown': CustomDropdown
        },
        data: function(){
           return {
               albumSearch: '',
               foundAlbums: []
           }
        },
        methods: {
            navigateToAlbum: async function(id){
                const masterData = await api.getMaster(id)
                this.$store.commit('discogs/addMaster', {master: masterData.data})
                this.$router.push('/listen/' + masterData.data.id)
            }
        },
        watch: {
            albumSearch: function(){
                if(this.albumSearch.length > 2){
                    let foundAlbums = this.$store.state.discogs.collection.filter((album) => {
                        return album.basic_information.title.toLowerCase().includes(this.albumSearch.toLowerCase()) || album.basic_information.artists[0].name.toLowerCase().includes(this.albumSearch.toLowerCase())
                    })

                    this.foundAlbums = foundAlbums
                } else{
                    this.foundAlbums = []
                }
            }
        },
        async mounted() {
            let storedAlbums = localStorage.getItem('discogs-data')
            if (this.$store.state.discogs.collection.length === 0 && storedAlbums == null) {
                this.$router.push('/')
                return;
            }
            if(this.$store.state.discogs.collection.length === 0){
                this.$store.commit('discogs/setDiscogsCollection', {collection: JSON.parse(storedAlbums)})
            }
        }
    }
</script>

<style scoped>

</style>