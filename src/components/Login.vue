<template>
    <div class="login">
        <logo/>
        <font-awesome-icon v-bind:class="{'spinning-vinyl': true, 'spinning': isSpinning || forceSpinning}" :icon="['fal', 'compact-disc']" />
        <h3 v-show="forceSpinning">Looking up {{discogsUsername}}...</h3>
        <br>
        <div class="options">
            <div @mouseover="isSpinning = true" @mouseleave="isSpinning = false" class="connect-discogs button">
                <font-awesome-icon icon="compact-disc"/> Connect Discogs
            </div>
            <div class="or">
                OR
            </div>
            <div class="discogs-username">
                <input v-model="discogsUsername" v-on:keyup.enter="submitForm" placeholder="Discogs Username" type="text" name="discogs-username" v-on:keyup="isSpinning=false" v-on:keydown="isSpinning=true">
            </div>
        </div>

    </div>
</template>

<script>
    import Logo from './Logo'
    import { mapState } from 'vuex'
    import api from './../apis/discogs'

    export default {
        name: "home",
        data: function() {
            return {
                discogsUsername: '',
                isSpinning: false,
                forceSpinning: false
            }
        },
        components:{
            Logo
        },
        methods: {
            submitForm: async function(){
                this.forceSpinning = true;
                this.$store.commit('discogs/setDiscogsName', {username: this.discogsUsername})
                var page = 1;
                try{
                    var collection = await api.getCollection(this.$store.state.discogs.discogsUsername, this.$store.state.discogs.discogsOauthToken, this.$store.state.discogs.discogsOauthSecret, page)
                } catch(e){
                    if (e.message === "Request failed with status code 404"){
                        alert('Username '+this.discogsUsername+' not found')
                        this.discogsUsername = '';
                        this.forceSpinning = false;
                    }
                    return
                }

                while(collection.data.releases !== undefined && collection.data.releases.length > 0 && collection.data.releases.length % 500 === 0){
                    page = page + 1;
                    try{
                        collection = await api.getCollection(this.$store.state.discogs.discogsUsername, this.$store.state.discogs.discogsOauthToken, this.$store.state.discogs.discogsOauthSecret, page)
                    } catch {
                        break;
                    }
                    this.$store.commit('discogs/addToDiscogsCollection', {additions: collection.data.releases})
                }
                this.$store.commit('discogs/setDiscogsCollection', {collection: collection.data.releases})
                this.$router.push('/random-album')
            }
        },
        computed: mapState({
            storeDiscogsName: state => state.discogs.discogsUsername
        })
    }
</script>

<style scoped>

</style>