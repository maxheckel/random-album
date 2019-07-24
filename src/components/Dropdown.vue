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
            <div @click="logout" class="item last-item">
                Log Out
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "custom-dropdown",
        data: function(){
            return {
                showing: false,
                persisted: null
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
        methods: {
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
