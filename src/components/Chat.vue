<template>
  <div class="chat container">
    <h2 class="center blue-text">Chatterbox</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="blue-text">{{ message.name }}</span>
            <span class="grey-text text-darken-3 msg">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage
  },
  data(){
    return{
      messages: []
    }
  },
  created(){
    let ref = db.collection('chats').orderBy('timestamp')
    
    // subscribe to changes to the 'messages' collection
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        //console.log(change)
        if(change.type == 'added'){
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  }
}
</script>

<style>
.chat h2{
  font-size: 2.6em;
  margin-bottom: 40px;
  font-style: italic;
}
.chat span{
  font-size: 1.4em;
}
.chat .msg{
    display: block;
}
.chat .time{
  display: block;
  font-size: 0.8em;
}
.messages{
    max-height: 300px;
    overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
 
.messages::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}
 
.messages::-webkit-scrollbar-thumb {
  background: rgb(93, 155, 255); 
}
</style>