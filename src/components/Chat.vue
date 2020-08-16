<template>
    <div class="chat container">
        <h2 class="center blue-text">Chatterbox</h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages">
                    <li v-for="chat in chats" :key="chat.id">
                        <span class="blue-text"> {{ chat.name }} </span>
                        <span class="grey-text text-darken-3 message">{{ chat.content }}</span>
                        <span class="grey-text time">{{ chats.timestamp }}</span>  
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name='name' /> 
            </div>
        </div>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'

export default {
    name: 'Chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data() {
        return {
            chats: []
        }
    },
    created(){
        let ref = db.collection('chats').orderBy('timestamps')

       ref.onSnapshot(snapshot => {
            snapshot.docChange().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.chats.push({
                        id: doc.id,
                        name: doc.data().name,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp
                    })
                }
            });  
        })
    }
}
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 40px;
}
.chat span{
    font-size: 1.4em;
}
.chat .message{
    display: block;
    
}
.chat .time{
    display: block;
    font-size: 1.2em;
}
</style>