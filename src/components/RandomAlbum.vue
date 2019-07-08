<template>
    <div class="random-album" v-if="selectedAlbum.basic_information !== undefined" v-bind:style="cssProps">
        <img v-bind:src="selectedAlbum.basic_information.cover_image">
        <font-awesome-icon v-bind:class="{'spinner': true, 'visible': isSpinning}" :icon="['fal', 'compact-disc']" />
        <h1>{{selectedAlbum.basic_information.title}}</h1>
        <h3> {{selectedAlbum.basic_information.artists[0].name}}</h3>
        <br>
        <div @click="tryAgain" class="button try-again">
            Try again
        </div>
        <div @click="listen" class="button select">
            Start Listening
        </div>
    </div>
</template>

<script>
    import api from '../apis/discogs'
    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    toDataURL('https://img.discogs.com/Px8KGsMXz7cP23gyfz6pxaxG-70=/fit-in/303x303/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3909105-1348892449-6454.jpeg.jpg', function(dataUrl) {
        console.log('RESULT:', dataUrl)
    })
    export default {
        name: "random-album",
        data: function(){
            return {
                selectedAlbum: {},
                isSpinning: false,
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
                gradient: {
                    primary: '#DBD5A4',
                    secondary: '#649173'
                }
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
        methods: {
            tryAgain(){
                this.gradient = this.gradients[Math.floor(Math.random()*this.gradients.length)]
                this.selectedAlbum = this.$store.state.discogs.collection[Math.floor(Math.random()*this.$store.state.discogs.collection.length)]
            },
            async listen(){
                this.isSpinning = true;
                const masterData = await api.getMaster(this.selectedAlbum.basic_information.master_id)
                this.$store.commit('discogs/addMaster', {master: masterData.data})
                this.$router.push('/listen/'+masterData.data.id)
            }
        },
        mounted(){
            if (this.$store.state.discogs.collection.length === 0){
                this.$router.push('/')
                return;
            }
            this.gradient = this.gradients[Math.floor(Math.random()*this.gradients.length)]
            this.selectedAlbum = this.$store.state.discogs.collection[Math.floor(Math.random()*this.$store.state.discogs.collection.length)]

        }
    }
</script>

<style scoped>

</style>