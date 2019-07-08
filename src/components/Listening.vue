<template>
    <div class="listen" v-if="master.id !== undefined" v-bind:style="cssProps">
        <div class="image">
            <img v-bind:src="master.images[0].uri">
            <h1>{{master.title}}</h1>
            <h3>{{master.artists[0].name}}</h3>
            <a @click="newAlbum"class="button">
                New Album
            </a>
        </div>
        <div class="tracks">
            <div class="track" v-for="track in master.tracklist">
                <div class="title">
                    {{track.position}}: {{track.title}}
                </div>
                <div class="duration">
                    {{track.duration}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "listening",
        data(){
            return {
                gradient: {
                    primary: '#DBD5A4',
                    secondary: '#649173'
                },
                gradients: [
                    {
                        primary: '#B993D6',
                        secondary: '#8CA6DB'
                    },
                    {
                        primary: '#870000',
                        secondary: '#190A05'
                    },
                    {
                        primary: '#00d2ff',
                        secondary: '#3a7bd5'
                    },
                    {
                        primary: '#D3959B',
                        secondary: '#BFE6BA'
                    },
                    {
                        primary: '#DAD299',
                        secondary: '#B0DAB9'
                    },
                    {
                        primary: '#f2709c',
                        secondary: '#ff9472'
                    },
                    {
                        primary: '#E6DADA',
                        secondary: '#274046'
                    },
                    {
                        primary: '#DBD5A4',
                        secondary: '#649173'
                    },
                    {
                        primary: '#5D4157',
                        secondary: '#A8CABA'
                    }
                ],
                master: {}
            }
        },
        methods:{
            newAlbum(){
                this.$router.push('/random-album')
            }
        },
        computed: {
            cssProps: function(){
                return {
                    '--gradient-primary': this.gradient.primary,
                    '--gradient-secondary': this.gradient.secondary,
                }
            }
        },
        mounted(){

            if (this.$store.state.discogs.collection.length === 0){
                this.$router.push('/')
                return;
            }

            var masters = this.$store.state.discogs.masters

            for(var i = 0; i < masters.length; i++){
                if(masters[i].id == this.$route.params.id){
                    console.log(masters[i])
                    this.master = masters[i];

                    break;
                }
            }

        }
    }
</script>

<style scoped>

</style>