<template>
  <div class="flex h-screen">
    <div class="m-auto w-1/2">

      <div class="flex justify-center">
        <textarea class="w-2/3 h-48 border-2 rounded-lg border-black border-dotted shadow-xl p-4 text-center font-mono" v-model="note" placeholder="enter note" />
      </div>
  
      <div class="flex justify-center ">
        <button class="w-1/3 border-2 rounded-lg border-black border-dotted shadow-xl m-10 p-2 font-mono text-center font-semibold hover:text-red-600 hover:border-red-600" @click="sendNote">
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

      <div class="flex justify-center ">
        <input class="w-1/3 rounded-lg border-2 border-grey-50 border-dotted mt-6 p-1 text-center font-mono focus:border-black" v-model="filter" placeholder="#" @input="filterNotes()"/>
      </div>
      

    </div>
  </div>


<!--
    <div class="flex justify-center ">
        <table class="min-w-full border-2 rounded-lg border-black border-dotted shadow-xl font-mono">
          <tr>
            <th colspan="2" class="m-3 border-2 rounded-lg border-black border-dotted">Saved notes</th>
          </tr><tr>
            <td class="p-2 border-2 rounded-lg border-black border-dotted"> name </td>
            <td class="p-2 border-2 rounded-lg border-black border-dotted"> age </td>
          </tr>
          <tr v-for="item in notes" :key="item">
              <td class="p-2 border-2 rounded-lg border-black border-dotted">{{item}}</td>
              <td class="p-2 border-2 rounded-lg border-black border-dotted">X</td>
          </tr>
        </table>
      </div>
  -->

  

</template>

<script>
export default {
  data(){
    return{
      note:"",
      notes:[], 
      filter:"",  
      displayNotes:[],
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
    saveNote() {
      console.log("this.note:")
      console.log(this.note);
      //this.notes.push(this.note);
      this.notes = [...this.notes, this.note]
      console.log('Note added.');
      console.log(this.notes);
      this.note = "";
      this.filterNotes();
    },

    sendNote(){
      fetch(`http://localhost:3001/addnote/${this.note}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.notes = data
        console.log(this.notes)
        //const obj = JSON.parse(data[0])
        //console.log(obj.note)
        //this.notes = JSON.parse(data.note);
        //console.log(this.notes);
        //this.notes = [...this.notes, data.pop()];
        //console.log('Note added.');
        //console.log(this.notes);
        //this.note = "";
        //this.filterNotes();
      })
    },

    removeNote(id) {
      console.log(id);
      fetch(`http://localhost:3001/removeNote/${id}`)
      .then(response => response.json())
      .then(data => {
        this.notes = data;
        this.filterNotes();
      })
    },

    filterNotes(){
      console.log("filter activated");
      this.displayNotes = this.notes.filter(el => el.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
    },
    
  }
  
}
</script>