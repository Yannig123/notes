<template>
  <div class="flex h-screen">
    <div class="m-auto w-1/2">

      <div class="flex justify-center">
        <textarea class="w-2/3 h-48 border-2 rounded-lg border-black border-dotted shadow-xl p-4 text-center font-mono" v-model="note" placeholder="enter note" />
      </div>
  
      <div class="flex justify-center ">
        <button class="w-1/3 border-2 rounded-lg border-black border-dotted shadow-xl m-10 p-2 font-mono text-center font-semibold hover:text-red-600 hover:border-red-600 transform hover:scale-105" @click="sendNote">
          SAVE NOTE
        </button>
      </div>

      <div class="flex justify-center font-mono">
        <ul class="text-center">
          <div class="font-semibold mb-4">
            Saved notes:
          </div>

          <li class="mb-2" v-for="(item) in notes" :key="item"> 
            <a title="click to remove" href="#" @click="removeNote(item.id)">{{item.note}}</a>
            <div class="text-gray-300 text-xs">
              {{item.date}}
            </div>
          </li>
        </ul>
      </div>

      <div class="flex justify-center space-x-5">
        <input class="w-1/3 rounded-lg border-2 border-grey-50 border-dotted mt-6 p-1 text-center font-mono focus:border-black" v-model="filter" placeholder="#" @input="filterNotes()"/>
        <input class="w-1/3 rounded-lg border-2 border-grey-50 border-dotted mt-6 p-1 text-center font-mono focus:border-black" v-model="date" placeholder="YYYY-MM-DD" @input="filterDate()"/>
      </div>
      

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      note:"",
      notes:[], 
      filter:"",  
      date:"",
    };
  },

  created(){
    fetch(`http://localhost:3001/getDatabase`)
    .then(response => response.json())
    .then(data => {
      this.notes = data;
    })
  },

  methods: {
    async sendNote() {
      const {data} = await axios.post(
        'http://localhost:3001/addnote', 
        { note: this.note }
      );
      this.notes = data;
      this.note = "";
    },

    removeNote(id) {
      fetch(`http://localhost:3001/removeNote/${id}`)
      .then(response => response.json())
      .then(data => {
        this.notes = data;
      })
    },

    filterNotes(){
      if ((this.filter) == "") {
        fetch(`http://localhost:3001/getDatabase`)
        .then(response => response.json())
        .then(data => {
          this.notes = data;
        })
      } else {
        fetch(`http://localhost:3001/filter/${this.filter}`)
        .then(response => response.json())
        .then(data => {
          this.notes = data
        })
      }
    },

    filterDate(){
      if ((this.date) == "") {
        fetch(`http://localhost:3001/getDatabase`)
        .then(response => response.json())
        .then(data => {
          this.notes = data;
        })
      } else {
        fetch(`http://localhost:3001/filterDate/${this.date}`)
        .then(response => response.json())
        .then(data => {
          this.notes = data
        })
      }
    },

    /*
    sendNote(){
      fetch(`http://localhost:3001/addnote/${this.note}`)
      .then(response => response.json())
      .then(data => {
        this.notes = data
        this.note = "";
        //this.notes = [...this.notes, data.pop()];
        //this.displayNotes = this.notes;
        //this.filterNotes();
      })
    },
    
    filterNotes(){
      console.log("filter activated");
      this.displayNotes = this.notes.filter(el => el.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
    },
    */ 

  }
  
}
</script>