<template>
    <div class="new-message">
        <form @submit.prevent='addMessage'>
            <label for="new-message">New Message (tap enter to add):</label>
            <input type="text" name="new-message" v-model="newMessage">
            <p class="red-text" v-if="feedback">{{ feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'NewMessage',
    props: ['name'],
    data() {
        return {
            newMessage: null,
            feedback: null
        }
    },
    methods: {
        addMessage(){
            if (this.newMessage) {
                db.collection('chats').add({
                    content: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newMessage = null
                this.feedback = null
            } else{
                this.feedback = 'Please enter a message to send'
            }
        }
    }
}
</script>

<style>
    
</style>