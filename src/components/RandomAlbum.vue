<template>
    <div v-bind:class="{'random-album': true, light: shouldBeLight}"
         v-if="selectedAlbum.basic_information !== undefined" v-bind:style="cssProps">
        <img v-bind:src="selectedAlbum.basic_information.cover_image">
        <font-awesome-icon v-bind:class="{'spinner': true, 'visible': isSpinning}" :icon="['fal', 'compact-disc']"/>
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
    import vinylAPI from '../apis/randomvinyl'
    import {mapState} from 'vuex'
    import lightOrDark from '../utils/lightOrDark'

    export default {
        name: "random-album",
        data: function () {
            return {
                selectedAlbum: {},
                isSpinning: false,

                gradient: {
                    primary: '#DBD5A4',
                    secondary: '#649173'
                },
                shouldBeLight: false,
                tryInterval: null
            }
        },
        computed:
            mapState({
                cssProps: state => {
                    return {
                        '--gradient-primary': state.randomvinyl.colors[0],
                        '--gradient-secondary': state.randomvinyl.colors[1],
                    }
                }
            }),
        methods: {
            async tryAgain() {
                this.selectedAlbum = this.$store.state.discogs.collection[Math.floor(Math.random() * this.$store.state.discogs.collection.length)]
                var colors = await vinylAPI.getColorsForImage(this.selectedAlbum.basic_information.cover_image)
                this.$store.commit('randomvinyl/setCurrentColors', colors.data)

                let primaryLight = lightOrDark(this.cssProps['--gradient-primary']);
                let secondaryLight = lightOrDark(this.cssProps['--gradient-secondary']);
                if (primaryLight === 'dark' || secondaryLight === 'dark') {
                    this.shouldBeLight = true
                } else {
                    this.shouldBeLight = false
                }
            },
            async listen() {
                this.isSpinning = true;
                const masterData = await api.getMaster(this.selectedAlbum.basic_information.id)
                this.$store.commit('discogs/addMaster', {master: masterData.data})
                clearInterval(this.tryInterval)
                this.$router.push('/listen/' + masterData.data.id)
            }
        },
        async mounted() {
            if (this.$store.state.discogs.collection.length === 0) {
                this.$router.push('/')
                return;
            }
            this.tryAgain()
            this.tryInterval = setInterval(this.tryAgain, 300000)
        }
    }
</script>

<style scoped>

</style>