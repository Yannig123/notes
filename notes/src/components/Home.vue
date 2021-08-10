<template>
  <div class="flex h-screen">
    <div class="m-auto w-1/2">

      <div class="flex justify-center">
        <textarea class="w-2/3 h-48 border-2 rounded-lg border-black border-dotted shadow-xl p-4 text-center font-mono outline-none" v-model="note" placeholder="enter note" />
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

          <li class="mb-2" v-for="(item) in displayNotes" :key="item"> 
            <a title="click to remove" href="#" @click="removeNote(item.id)">{{item.note}}</a>
            <div class="text-gray-300 text-xs">
              {{item.date}}
            </div>
          </li>
        </ul>
      </div>

      <div class="flex justify-center space-x-5">
        <input class="w-1/3 rounded-lg border-2 border-grey-50 border-dotted mt-6 p-1 text-center font-mono focus:border-black outline-none" v-model="filter" placeholder="#" @input="filterNotes()"/>
        <input class="w-1/3 rounded-lg border-2 border-grey-50 border-dotted mt-6 p-1 text-center font-mono focus:border-black outline-none" v-model="date" placeholder="YYYY-MM-DD" @input="filterDate()"/>
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
      displayNotes:[], 
      filter:"", 
      hashfilter:"", 
      date:"",
    };
  },

  created(){
    fetch(`http://localhost:3001/getDatabase`)
    .then(response => response.json())
    .then(data => {
      this.notes = data;
      this.displayNotes = this.notes;
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
      this.displayNotes = this.notes
    },

    removeNote(id) {
      fetch(`http://localhost:3001/removeNote/${id}`)
      .then(response => response.json())
      .then(data => {
        this.notes = data;
        this.displayNotes = this.notes
      })
    },

    filterNotes(){
       if ((this.filter) == "") {
        this.hashfilter = this.filter
      } else {
        this.hashfilter = '#' + this.filter;
        }
      this.displayNotes = this.notes.filter(el => el.note.toLowerCase().indexOf(this.hashfilter.toLowerCase()) !== -1);
    },

    filterDate(){
      this.displayNotes = this.notes.filter(el => el.date.toLowerCase().indexOf(this.date.toLowerCase()) !== -1);
    },

  }
  
}
</script>