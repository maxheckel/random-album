<template>
    <div v-bind:class="{listen: true, light: shouldBeLight}" v-if="master.id !== undefined" v-bind:style="cssProps">
        <div class="flip" v-if="flipCountdown > 0" @click="stopFlipping">
            <div class="flipping-vinyl">
                <font-awesome-icon icon="compact-disc"/>
            </div>
            {{flipCountdown}}
        </div>
        <div class="details">
            <div class="image">
                <img v-bind:src="master.images[0].uri">
                <h1>{{master.title}}</h1>
                <h3>{{master.artists[0].name}}</h3>
            </div>
            <div class="tracks">
                <album-track
                        v-bind:key="track.position"
                        v-for="(track, index) in master.tracklist"
                        v-bind:data="track"
                        v-bind:index="index"
                        v-bind:is-current="isCurrentTrack(index)"
                        @trackClicked="setCurrentTime(index)"
                />
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
    import {mapState} from 'vuex'
    import lightOrDark from '../utils/lightOrDark'
    import AlbumTrack from './AlbumTrack'

    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }

    export default {
        name: "listening",
        components:{
            AlbumTrack
        },
        data(){
            return {
                shouldBeLight: false,
                gradient: {
                    primary: '#DBD5A4',
                    secondary: '#649173'
                },
                playing: true,
                master: {},
                progress: null,
                secondsCountdown: 0,
                totalSeconds: 0,
                currentTrack: 0,
                flipCountdown: 0,
                flipProgress: null

            }
        },
        watch: {
            currentTrack: function(newTrack, oldTrack){
                let differentPrefix = this.master.tracklist[newTrack].position[0].toLowerCase() !== this.master.tracklist[oldTrack].position[0].toLowerCase();

                if(differentPrefix && isNaN(this.master.tracklist[newTrack].position[0]) && isNaN(this.master.tracklist[oldTrack].position[0])){
                    this.stopProgress()
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    this.flipCountdown = 30;
                    this.flipProgress = setInterval(() => {
                        this.flipCountdown -= 1
                        if(this.flipCountdown === 0){
                            this.startProgress()
                            clearInterval(this.flipProgress)
                        }
                    }, 1000)
                }
            }
        },
        methods:{
            stopFlipping(){
                this.flipCountdown = 0;
                clearInterval(this.flipProgress)
                this.startProgress()
            },
            setCurrentTime(index){
                var setSeconds = 0;
                for(var i = 0; i < this.master.tracklist.length; i++){
                    if(this.master.tracklist[i].duration.split(':')[1] == undefined){
                        continue
                    }
                    if(i === index){
                        break;
                    }
                    setSeconds += parseInt(this.master.tracklist[i].duration.split(':')[0])*60
                    setSeconds += parseInt(this.master.tracklist[i].duration.split(':')[1])
                }
                this.secondsCountdown = this.totalSeconds - (setSeconds*1000);
            },
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
            isCurrentTrack(index){
                var minSeconds = 0;
                var maxSeconds = 0;
                for(var i = 0; i < this.master.tracklist.length; i++){
                    if(this.master.tracklist[i].duration.split(':')[1] == undefined){
                        continue
                    }
                    if(i === index){
                        maxSeconds += parseInt(this.master.tracklist[i].duration.split(':')[0])*60
                        maxSeconds += parseInt(this.master.tracklist[i].duration.split(':')[1])
                        break;
                    }
                    minSeconds += parseInt(this.master.tracklist[i].duration.split(':')[0])*60
                    minSeconds += parseInt(this.master.tracklist[i].duration.split(':')[1])
                    maxSeconds += parseInt(this.master.tracklist[i].duration.split(':')[0])*60
                    maxSeconds += parseInt(this.master.tracklist[i].duration.split(':')[1])
                }
                if(maxSeconds <= 0){
                    return false
                }
                minSeconds = minSeconds * 1000;
                maxSeconds = maxSeconds * 1000;

                let elapsed = this.totalSeconds - this.secondsCountdown;
                const isCurrent = (elapsed >= minSeconds && elapsed < maxSeconds)
                if(isCurrent){
                    this.currentTrack = index
                }
                return isCurrent
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
        computed: Object.assign({
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
        },   mapState({
            cssProps: state => {
                return {
                    '--gradient-primary': state.randomvinyl.colors[0],
                    '--gradient-secondary': state.randomvinyl.colors[1],
                }
            }
        })),
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
            let primaryLight = lightOrDark(this.cssProps['--gradient-primary']);
            let secondaryLight = lightOrDark(this.cssProps['--gradient-secondary']);
            if (primaryLight === 'dark' || secondaryLight === 'dark'){
                this.shouldBeLight = true
            }
        }
    }
</script>

<style scoped>

</style>