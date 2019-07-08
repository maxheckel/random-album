<template>
    <div class="listen" v-if="master.id !== undefined" v-bind:style="cssProps">
        <div class="details">
            <div class="image">
                <img v-bind:src="master.images[0].uri">
                <h1>{{master.title}}</h1>
                <h3>{{master.artists[0].name}}</h3>
            </div>
            <div class="tracks">
                <div class="track" v-for="(track, index) in master.tracklist" v-bind:key="track.position" v-bind:class="{'track': true, 'highlighted': isCurrentTrack(index)}">
                    <div class="title">
                        {{track.position}}: {{track.title}}
                    </div>
                    <div class="duration">
                        {{track.duration}}
                    </div>
                </div>
            </div>
        </div>
        <footer class="sticky-footer">
            <a @click="newAlbum" class="button">
                New Album
            </a>
            <div class="progress-bar">
                <div class="time-string">{{timeString}}</div>
                <div class="ui">
                    <div class="position" v-bind:style="{'margin-left': progressMargin}"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="controls">
                <font-awesome-icon class="smaller" @click="reverse"  :icon="['fal', 'undo-alt']"/>
                <font-awesome-icon @click="startProgress" v-show="!playing" :icon="['fal', 'play-circle']"/>
                <font-awesome-icon @click="stopProgress" v-show="playing" :icon="['fal', 'pause-circle']"/>
                <font-awesome-icon class="smaller" @click="forward"  :icon="['fal', 'redo-alt']"/>
            </div>
        </footer>
    </div>
</template>

<script>
    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }
    export default {
        name: "listening",
        data(){
            return {
                gradient: {
                    primary: '#DBD5A4',
                    secondary: '#649173'
                },
                playing: true,

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
                master: {},
                progress: null,
                secondsCountdown: 0,
                totalSeconds: 0
            }
        },
        methods:{
            reverse(){
                this.secondsCountdown+=30000;
                if(this.secondsCountdown > this.totalSeconds){
                    this.secondsCountdown = this.totalSeconds
                }
            },
            forward(){
                this.secondsCountdown -= 30000
            },
            newAlbum(){
                this.$router.push('/random-album')
            },
            isCurrentTrack(){
                return false
            },
            startProgress(){
                this.playing = true
                this.progress = setInterval(() => {
                    this.secondsCountdown = this.secondsCountdown-100;
                    if (this.secondsCountdown <= 0){
                        clearInterval(this.progress)
                        this.$router.push('/random-album')
                    }
                }, 100)
            },
            stopProgress(){
                this.playing = false
                clearInterval(this.progress)
            }
        },
        computed: {
            cssProps: function(){
                return {
                    '--gradient-primary': this.gradient.primary,
                    '--gradient-secondary': this.gradient.secondary,
                }
            },
            progressMargin(){
                return 100 - ((this.secondsCountdown/this.totalSeconds) * 100) + "%"
            },
            timeString(){

                var totalTime = this.totalSeconds / 1000;
                var minutes = (totalTime - (totalTime % 60) )/ 60
                var seconds = totalTime % 60
                var remaining = parseInt(this.secondsCountdown / 1000);
                var remainingMinutes = (remaining - (remaining % 60) )/ 60
                var remainingSeconds = remaining % 60
                return remainingMinutes.pad(2) +':'+remainingSeconds.pad(2) + ' / ' + minutes.pad(2) + ':' + seconds.pad(2);
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
                    this.master = masters[i];
                    break;
                }
            }

            var totalSeconds = 0;
            for(i = 0; i < this.master.tracklist.length; i++){
                if(this.master.tracklist[i].duration.split(':')[1] == undefined){
                    continue
                }
                totalSeconds += parseInt(this.master.tracklist[i].duration.split(':')[0])*60
                totalSeconds += parseInt(this.master.tracklist[i].duration.split(':')[1])
            }

            this.totalSeconds = totalSeconds * 1000;
            this.secondsCountdown = this.totalSeconds;

            if (totalSeconds > 0){
                this.startProgress()
            }
        }
    }
</script>

<style scoped>

</style>