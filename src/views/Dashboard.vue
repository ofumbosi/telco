<template>
  <div class="dashboard">
      
    <v-container class="my-1">



 <v-card  class="pa-3" elevation="2">
 <v-card-title><h1>Today</h1></v-card-title>
     <v-layout row wrap >
          <v-flex xs6  sm4 md7>
           
        <v-layout row wrap >
          <v-flex xs6  sm4 md4>
            <div class="caption grey--text">
            <v-select :items="items" label="Gross volume" ></v-select><v-spacer></v-spacer><v-spacer></v-spacer></div>
            <div class=""><h3>322.2K</h3></div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            
          </v-flex>

          <v-flex xs6 sm3 md3>
             <div class="caption grey--text"><v-select :items="items" label="Yesterday" ></v-select></div>
            <div class=""><h3>429.2 K</h3></div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            
          </v-flex>
          <v-flex xs6 sm3 md3>
             <div class="caption grey--text">End of day new matches </div>
            <div class=""><h3>629.2 K</h3></div>
            <div class="caption grey--text"><h5>Based on estimates</h5></div>
          </v-flex>
          
          
        </v-layout>
        <v-layout row wrap >
          <v-flex xs12 md12 sm12>
            <div class="caption grey--text">
           
            <fusioncharts
                  :type="type"
                  :width="'100%'"
                  :height="height"
                  :dataFormat="dataFormat"
                  :dataSource=" dataSourceLine">
                </fusioncharts></div>
          
          </v-flex>
          
          
        </v-layout>
        <v-divider></v-divider>
         
      
</v-flex>

          <v-flex xs6  sm4 md5>
           
        <v-layout row justify-start class="mb-3">
        
                <v-flex xs6  sm4 md12> 
                <vc-donut v-bind="ninemobile">   <h1><strong>{{ninemobile.sections[1].value.toFixed(1)}}%</strong> </h1><br> 9Mobile
                </vc-donut>
                </v-flex>
              <v-flex xs6  sm4 md12>   
                <vc-donut v-bind="mtn">  <h1> <strong>{{mtn.sections[1].value.toFixed(1)}}%</strong></h1> <br>MTN
                </vc-donut>
                </v-flex>
                
         </v-layout>
         <v-layout row justify-start class="mb-3">
        
              
              <v-flex xs6  sm4 md12>
              <vc-donut v-bind="airtel">   <h1> <strong>{{airtel.sections[1].value.toFixed(1)}}%</strong> </h1><br> Airtel
                </vc-donut>
                </v-flex>
                <v-flex xs6  sm4 md12>         
              <vc-donut v-bind="glo">  <h1> <strong>{{glo.sections[1].value.toFixed(1)}}%</strong> </h1><br> Globacom
                </vc-donut>
                </v-flex>
         </v-layout>




          
          
          </v-flex>
          
      </v-layout>
</v-card>

<v-card  class="pa-3 my-3" elevation="2">
  <v-card-title><h1>Reports overview</h1> <v-spacer></v-spacer>
    <v-card  class="pa-1"> 1d <strong>1w</strong> 4w 1y</v-card>
    <v-spacer></v-spacer>
    <!-- <v-card  class="pa-1"> Feb 4, 2021 > Feb, 30, 2020 </v-card> -->
     <v-card class='pa-1'>
         <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
          style='padding:0px;'
            v-model="dateStart"
            label="Date Start"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateStart"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
     </v-card>
    <v-spacer></v-spacer>
     <v-card class='pa-1'>
         <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
          style='padding:0px;'
            v-model="dateEnd"
            label="Date End"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateEnd"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
     </v-card>
    <v-spacer></v-spacer>

      <v-card>
        <v-select
          :items="['Score(Low to High)','Score(High to Low)','State','Telco','Gender - Female','Gender - Male','Matched','Returned','Processing','Migrated']"
          label="Sort By"
          v-model='sortBy'
          outlined
        ></v-select>
      </v-card>
    <v-spacer></v-spacer>

    <!-- <v-card  class="pa-1"> <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By project name</span>
          </v-btn>
          <span>Sort by project name</span>
        </v-tooltip> </v-card>
    <v-spacer></v-spacer>
    <v-card  class="pa-1">  <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon small left>person</v-icon>
            <span class="caption text-lowercase">By Person</span>
          </v-btn>
          <span>Sort by name</span>
        </v-tooltip> </v-card> -->
         
        
        

         
       
     
      
  </v-card-title>
  <v-layout row wrap >
          <v-flex xs12  sm12 md4>
                <vue-gauge :refid="'type-unique-id'" :options="{'needleValue':timerCount,chartWidth:350,'arcDelimiters':[85]}" updateNeedle="{timerCount}"></vue-gauge>
                 <v-layout row wrap >
         
                    <v-flex xs12  sm12 md4>
                      <v-card width="`100%`" class="pa-3 mx-2">
                        <h3>Matched 78 M </h3>
                      </v-card>
                    </v-flex>
                    <v-flex xs12  sm12 md4>
                              <v-card width="`100%`" class="pa-3  mx-2">
                                <h3>Processing 40 M </h3>
                              </v-card>
                    </v-flex>
                    <v-flex xs12  sm12 md4>
                            <v-card width="`100%`" class="pa-3  mx-2">
                            <h3>  Unmatched 60 M </h3>
                            </v-card>
                  </v-flex>
              </v-layout>
          
          </v-flex>
          <v-flex xs12  sm12 md8>
         
      
      <v-card flat class=" ma-1" v-for="(project, index) in filteredProjects" 
      v-if='index <= (currentPage*10) && index >= ((currentPage-1)*10)' :key="project._id">
      <v-layout row wrap :class ="`pa-1 project ${project.telco}`">
      <v-flex xs12 md2>
      <div class="caption grey--text">
          Name
      </div>
      <div class="small">
          {{project.name}}
      </div>
      </v-flex>

      

       <v-flex xs6 sm4 md3>
      <div class="caption grey--text">
          Phone
      </div>
      <div class="small">
         {{project.phone}}
      </div>
      </v-flex>
       <v-flex xs6 sm4 md2>
      <div class="caption grey--text">
          Gender
      </div>
      <div class="small">
        {{project.gender}}
      </div>
      </v-flex>

     

      <v-flex xs12 md2>
      <div class="caption grey--text">
          Telco
      </div>
      <div class="small">
      <v-chip right flat small :class ="`project ${project.telco} white--text caption my-2`">
          {{project.telco}}
    </v-chip>
      </div>
      </v-flex>
      <v-flex xs2 sm4 md3>
      <div class="caption grey--text">
          Score
      </div>
      <div class="small">
         <v-progress-linear
      v-model="project.score"
      color="blue-grey"
      height="3"
    >
      <template v-slot:default="{ value }">
        <strong small>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
      </div>
      </v-flex>

      </v-layout>
     <v-divider></v-divider>
     <div class="text-center">
    
  </div>
      </v-card>
          <v-pagination
      v-model="currentPage"
      :length="Math.round(filteredProjects.length/10)"
    ></v-pagination>
           </v-flex>


     
           
 
       
          
    </v-layout>
    
    </v-card>




     

  <v-layout row justify-start class="mb-3">
<p>{{timerCount}}</p>

      
 
          
          
          </v-layout>

          

      

    </v-container>
   
  </div>
</template>

<script>
import axios from 'axios'
export default {
   watch: {
     dateStart(value){
       if(value !== null)
       {
         this.filterDate()
         this.loadDonuts();
    this.ninemobile.sections[1].value = ( this.ninemobile.sections[1].value / 400 ) * 100;
    this.airtel.sections[1].value  = ( this.airtel.sections[1].value / 400 ) * 100;
    this.mtn.sections[1].value = ( this.mtn.sections[1].value / 400 ) * 100;
    this.glo.sections[1].value = ( this.glo.sections[1].value / 400 ) * 100;
       }
     },
     dateEnd(value){
       if(value !== null)
       {
         this.filterDate()
         this.loadDonuts();
    this.ninemobile.sections[1].value = ( this.ninemobile.sections[1].value / 400 ) * 100;
    this.airtel.sections[1].value  = ( this.airtel.sections[1].value / 400 ) * 100;
    this.mtn.sections[1].value = ( this.mtn.sections[1].value / 400 ) * 100;
    this.glo.sections[1].value = ( this.glo.sections[1].value / 400 ) * 100;
      
       }
     },
     sortBy(value){
     if(value == "Matched"){
       this.filteredProjects = []
      this.projects.forEach(element => {
        if(element.isMatched)
        {
          this.filteredProjects.shift(element)
        }else{
          this.filteredProjects.push(element)
        }
      });
    }
    if(value == "Returned"){
       this.filteredProjects = []
      this.projects.forEach(element => {
        if(element.isReturned)
        {
          this.filteredProjects.shift(element)
        }else{
          this.filteredProjects.push(element)
        }
      });
    }
    if(value == "Migrated"){
       this.filteredProjects = []
      this.projects.forEach(element => {
        if(element.isMigrated)
        {
          this.filteredProjects.shift(element)
        }else{
          this.filteredProjects.push(element)
        }
      });
    }
    if(value == "Processing"){
       this.filteredProjects = []
      this.projects.forEach(element => {
        if(element.isFresh)
        {
          this.filteredProjects.shift(element)
        }else{
          this.filteredProjects.push(element)
        }
      });
    }
    if(value == "Gender - Female"){
       this.filteredProjects = []
      this.projects.forEach(element => {
        if(element.gender == "female")
        {
          this.filteredProjects.shift(element)
        }else{
          this.filteredProjects.push(element)
        }
      });
    }
    if(value == "Gender - Male"){
       this.filteredProjects = []
      this.projects.forEach(element => {
        if(element.gender !== "female")
        {
          this.filteredProjects.shift(element)
        }else{
          this.filteredProjects.push(element)
        }
      });
    }
     
     if(value == "Score(High to Low)"){
      this.filteredProjects.sort((a, b) => b.score- a.score )
    }
    if(value == "Score(Low to High)"){
      this.filteredProjects.sort((a, b) => a.score- b.score )
    }
     if(value == "State"){
      this.filteredProjects.sort((a, b) => a.state.localeCompare(b.state))
    }
    if(value == "Telco"){
      this.filteredProjects.sort((a, b) => a.telco.localeCompare(b.telco))
    }
   
     },
            timerCount: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            }
   },
   computed:{
    count:'',
     filteredProjects:function(){
       return this.projects;
     }
   },
  data() {
    return {
      sm9:0,
      sairtel:0,
      smtn:0,
      sntel:0,
      projectsTemp:[],
      sortBy:null,
      dateStart: null,
      dateEnd: null,
      menu: false,
      menu2: false,
      currentPage:1,
      timerCount:50,
       type: "line",
      width: "100%",
      height: "180",
      dataFormat: "json",
       dataSourceLine: {
      "chart": {
        "theme": "fusion",
        "caption": "Data migration volume ",
        
        "xAxisName": "Day",
        "yAxisName": "Records",
        "divlineColor": "#999999",
        
      },
      "data": [{
        "label": "8:00",
        "value": "02300"
      }, {
        "label": "10:00",
        "value": "103003"
      }, {
        "label": "12:00",
        "value": "310007"
      }, {
        "label": "14:00",
        "value": "300110"
      }, {
        "label": "16:00",
        "value": "299009"
      },  {
        "label": "18:00",
        "value": "380300"
      }, {
        "label": "20:00",
        "value": "320200"
      }]
    },
       projects:[],
items:[],
      mtn: {
        size: 130,
        telco:"MTN",
        value:0,
        sections: [
        	{ label: 'Processing', value: 65, color: '#eeeeee' },
          { label: 'Matched', value: 35, color: 'orange' },
          
         
        ],
        thickness: 15, // set this to 100 to render it as a pie chart instead
       
        // specify more props here
      },
       airtel: {
        size: 130,
        value:0,
        telco:"Airtel",
        sections: [
        	{ label: 'Processing', value: 75, color: '#eeeeee' },
          { label: 'Matched', value: 25, color: 'red' },
          
         
        ],
        thickness: 15, // set this to 100 to render it as a pie chart instead
        
        // specify more props here
      },
       glo: {
        size: 130,
        telco:"Globacom",
        value:0,
        sections: [
        	{ label: 'Processing', value: 79, color: '#eeeeee' },
          { label: 'Matched', value: 21, color: '#3db83a' },
          
         
        ],
        thickness: 15, // set this to 100 to render it as a pie chart instead
        
        // specify more props here
      },
  ninemobile: {
        size: 130,
        telco:"9Mobile",
        value:0,
        sections: [
        	{ label: 'Processing', value: 62, color: '#eeeeee' },
          { label: 'Matched', value: 38, color: 'green' },
          
         
        ],
        thickness: 15, // set this to 100 to render it as a pie chart instead
        
        // specify more props here
      },
      
    
    }
  },
  created(){
    
    this.loadData();
    this.loadDonuts();
    this.ninemobile.sections[1].value = ( this.ninemobile.sections[1].value / 400 ) * 100;
    this.airtel.sections[1].value  = ( this.airtel.sections[1].value / 400 ) * 100;
    this.mtn.sections[1].value = ( this.mtn.sections[1].value / 400 ) * 100;
    this.glo.sections[1].value = ( this.glo.sections[1].value / 400 ) * 100;
  },
  methods: {
    async loadDonuts(){
      await this.projects.forEach(element => {
        // console.log(element.isMigrated)
        if(element.telco == "Ntel" && element.isMigrated) this.glo.sections[1].value = this.glo.sections[1].value + 1;
        if(element.telco == "nineMobile" && element.isMigrated) this.ninemobile.sections[1].value = this.ninemobile.sections[1].value + 1;
        if(element.telco == "MTN" && element.isMigrated) this.mtn.sections[1].value = this.mtn.sections[1].value + 1;
        if(element.telco == "Aitel" && element.isMigrated) this.airtel.sections[1].value = this.airtel.sections[1].value + 1;
      });
    },
    async loadData(){
      await axios.get('/generated.json').then((res) => {
      this.projects = res.data
      this.projectsTemp = res.data
      
    })
    },
    async filterDate(){
      let start = this.dateStart ? new Date(this.dateStart) : null 
      let end = this.dateEnd  ?  new Date(this.dateEnd) : null 
      this.projects = [];
      await this.projectsTemp.forEach(element => {
        if(start && end)
        {
          if(Date.parse(element.dateMatched) > Date.parse(start) && Date.parse(element.dateMatched) < Date.parse(end)){
            this.projects.push(element)
          }
        }else if(start && !end)
        {
    
            if( Date.parse(element.dateMatched) > Date.parse(start))
            {
              console.log('matched')
            this.projects.push(element)
            }
        }
        else if(!start && end)
        {
            if( Date.parse(element.dateMatched) < Date.parse(end))
            {
            this.projects.push(element)
            }
        }
      });
    },
    // sortBy(prop) {
    //   this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    // }
  }
}
</script>

<style>
.v-text-field__details{
  display:none;
}
.cdc-text h1{
  margin-bottom:-10px;
}
.project.complete{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid #ffaa2c;
}
.project.overdue{
  border-left: 4px solid #f83e70;
}
.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
.v-chip.overdue{
  background: #f83e70;
}
</style>