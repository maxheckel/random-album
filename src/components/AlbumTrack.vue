<template>
    <div @click="trackClicked" v-bind:class="{'track': true, 'highlighted': isCurrent}">
        <div class="title">
            {{data.position}}: {{data.title}}
        </div>
        <div class="duration">
            {{data.duration}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "album-track",
        props: ['data', 'index', 'isCurrent'],
        methods: {
            trackClicked(){
                this.$emit('trackClicked', this.index)
            }
        }
    }
</script>

<style scoped>

</style>