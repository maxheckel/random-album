<template>
    <div class="dropdown">
        <div class="hamburger" @click="showing = !showing">
            <font-awesome-icon :icon="['fal', 'bars']" />
        </div>
        <div class="content" v-show="showing">
            <div class="item user-info">
                {{username}} : Persisted {{persistedString}}
            </div>
            <router-link to="/list" class="item">
                Search
            </router-link>
            <router-link to="/random-album" class="item">
                Random Album
            </router-link>
            <a @click="persist" class="item">
                Persist Albums
            </a>
            <a @click="refresh" class="item">
                Refresh Albums <font-awesome-icon v-bind:class="{'spinning-vinyl': true, 'spinning': isSpinning}" :icon="['fal', 'compact-disc']" />
            </a>
            <div @click="logout" class="item last-item">
                Log Out
            </div>

        </div>
    </div>
</template>

<script>

    import api from './../apis/discogs'
    export default {
        name: "custom-dropdown",
        data: function(){
            return {
                showing: false,
                persisted: null,
                isSpinning: false
            }
        },
        computed: {
            username: function(){
                return this.$store.state.discogs.discogsUsername
            },
            persistedString: function(){
                return this.persisted ? this.persisted : (localStorage.getItem('last-persisted') ? localStorage.getItem('last-persisted') : 'Never')
            }
        },
        mounted(){
            document.body.addEventListener('click', (e) => {
                if(!e.target.matches('.dropdown *')){
                    this.showing = false
                }
            })
        },
        methods: {
            async refresh(){
                let page = 1;

                this.isSpinning = true;
                let collection = await api.getCollection(this.$store.state.discogs.discogsUsername, this.$store.state.discogs.discogsOauthToken, this.$store.state.discogs.discogsOauthSecret, page)
                var releases = collection.data.releases;
                while(collection.data.releases !== undefined && collection.data.pagination.page < collection.data.pagination.pages){
                    page = page + 1;
                    try{
                        collection = await api.getCollection(this.$store.state.discogs.discogsUsername, this.$store.state.discogs.discogsOauthToken, this.$store.state.discogs.discogsOauthSecret, page)
                    } catch {
                        break;
                    }
                    releases.push(...collection.data.releases)
                }

                this.$store.commit('discogs/setDiscogsCollection', {collection: releases})
                this.isSpinning = false
                alert('Collection refreshed, found '+releases.length+' albums.')
            },
            persist: function(){
                localStorage.setItem('discogs-data', JSON.stringify(this.$store.state.discogs.collection))
                var today  = new Date();
                this.persisted = today.toLocaleString("en-US")
                localStorage.setItem('discogs-username', this.$store.state.discogs.discogsUsername)
                localStorage.setItem('last-persisted', this.persisted)
                alert('Persisted '+this.$store.state.discogs.discogsUsername)
                this.showing = false;
            },
            logout: function(){
                localStorage.removeItem('discogs-data')
                localStorage.removeItem('discogs-username')
                localStorage.removeItem('last-persisted')
                this.$router.push('/')
            }
        }
    }
</script>
