<template>
  <v-container class="grey lighten-5">
  <v-card class='v-card2'>
        <v-select
          :items="['All','nineMobile','Ntel','MTN','Airtel']"
          label="Show by Telco"
          v-model='telco'
          outlined
        ></v-select>
      </v-card>
  <table> 
  
  <tr>
  <td>
    <fusioncharts
                    :type="type"
                    :width="250"
                    :height="height"
                    :dataFormat="dataFormat"
                    :dataSource="dataSourceTelcoIn">
                  </fusioncharts>
      </td> 
      <td>       
                  <fusioncharts
                    :type="type"
                    :width="250"
                    :height="height"
                    :dataFormat="dataFormat"
                    :dataSource="dataSourceTelcoOut">
                  </fusioncharts>
                  
      </td> 
      <td>
   Retrieving
        
       
          <v-progress-linear
            color="success accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
       
        
          Sending
        
        
          <v-progress-linear
            color="primary accent-4"
            indeterminate
            rounded
            reverse
            height="6"
          ></v-progress-linear></td>
  <td>
  <fusioncharts
                  :type="type"
                  :width="250"
                  :height="height"
                  :dataFormat="dataFormat"
                  :dataSource="dataSourceNimc">
                </fusioncharts>
                </td>
                <td>
                 Getting your files
        
         
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        
       
          Getting your files
       
        
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"></v-progress-linear>
                </td><td>
                <fusioncharts
                  :type="type"
                  :width="250"
                  :height="height"
                  :dataFormat="dataFormat"
                  :dataSource="dataSourceIns">
                </fusioncharts>
                </td>
 
  </tr>
  
  
                
  </table>
  <v-card  class="pa-3 my-3" elevation="2" style='width:100%;'>
    <v-spacer></v-spacer>
    <!-- <v-card  class="pa-1"> Feb 4, 2021 > Feb, 30, 2020 </v-card> -->
     
     <v-card class='pa-1 v-card2'>
         <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
        max-width="300"
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

     <v-card class='pa-1 v-card2'>
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
    

      <v-card class='v-card2'>
        <v-select
          :items="['Score(Low to High)','Score(High to Low)','State','Telco','Gender - Female','Gender - Male','Matched','Returned','Processing','Migrated']"
          label="Sort By"
          v-model='sortBy'
          outlined
        ></v-select>
      </v-card>
    

  <v-container>
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
    <div class="text-center"></div>
</v-card>
<v-pagination
      v-model="currentPage"
      :length="Math.round(filteredProjects.length/10)"
></v-pagination>
  </v-container>

      </v-card>

      
   
      
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "team",
  computed:{
    count:'',
    filteredProjects:function(){
       return this.projects;
     }
   },
  data: function () {
    return {
      telco:"All",
      isFresh:[],
      isMatched:[],
      isProcessing:[],
      currentPage:1,
       projects:[],
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
      absolute: true,
      opacity: 1,
      overlay: true,
        value: 10,
        bufferValue: 20,
        interval: 0,
      sampleData: [],
      type: "cylinder",
      width: "100%",
      height: "450",
      dataFormat: "json",
      showTickMarks: "0",
      showTickValues: "0",
      dataSourceIns:  {
        chart: {
          theme: "fusion",
          caption: "Central",
          subcaption: "Incoming cluster",
          lowerLimit: "0",
          upperLimit: "400",
          lowerLimitDisplay: "Data",
          upperLimitDisplay: "Max",
          numberSuffix: " TB",
          showValue: "1",
          chartBottomMargin: "25",
          //Changing the Cylinder fill color
          cylFillColor: "#1aaf5d",
          showTickMarks: "0",
          showTickValues: "0",
        },
        value: "25",
      },
      dataSourceNimc: {
        chart: {
          theme: "fusion",
          caption: "Processing",
          subcaption: "Processing cluster",
          lowerLimit: "0",
          upperLimit: "400",
          lowerLimitDisplay: "Data",
          upperLimitDisplay: "Max",
          numberSuffix: " TB",
          showValue: "1",
          chartBottomMargin: "25",
          //Changing the Cylinder fill color
          cylFillColor: "#1aaf5d",
        },
        value: "35",
      },
       dataSourceTelcoOut: {
        chart: {
          theme: "fusion",
          caption: "Matched",
          subcaption: "Matched Cluster",
          lowerLimit: "0",
          upperLimit: "400",
          lowerLimitDisplay: "Data",
          upperLimitDisplay: "Max",
          numberSuffix: " TB",
          showValue: "1",
          chartBottomMargin: "25",
          //Changing the Cylinder fill color
          cylFillColor: "#1aaf5d",
        },
        value: "80",
      },
      dataSourceTelcoIn: {
        chart: {
          theme: "fusion",
          caption: "Fresh",
          subcaption: "Fresh Cluster",
          lowerLimit: "0",
          upperLimit: "400",
          lowerLimitDisplay: "Data",
          upperLimitDisplay: "Max",
          numberSuffix: " TB",
          showValue: "1",
          chartBottomMargin: "25",
          //Changing the Cylinder fill color
          cylFillColor: "#1976d2",
        },
        value: "100",
      },

       
    };
  },
watch: {
    telco(value){
          this.loadData(value);
    },
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
            },
             value (val) {
        if (val < 100) return

        this.value = 0
        this.bufferValue = 10
        this.startBuffer()
      },
   },



    mounted () {
      this.startBuffer()
       this.loadData();
    },

    beforeDestroy () {
      clearInterval(this.interval)
    },

    methods: {
      async filterCyl(){
     
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
        async loadData(v = null){
      await axios.get('/generated.json').then((res) => {
      this.projects = res.data
      this.projectsTemp = res.data
       this.isFresh=[]
      this.isMatched=[]
      this.isProcessing=[]
        this.projects.forEach(element => {
          if(v == null || v == "All")
          {
             if(element.isFresh) {
            this.isFresh.push(element)
            }
          if(element.isMatched) this.isMatched.push(element)
          if(element.isMigrated) this.isProcessing.push(element)
          }else{
              if(element.telco == v && element.isFresh) {
            this.isFresh.push(element)
            }
          if(element.telco == v &&  element.isMatched) this.isMatched.push(element)
          if(element.telco == v &&  element.isMigrated) this.isProcessing.push(element)
          }
         
        });
    })
    this.dataSourceNimc.value = this.isProcessing.length 
    this.dataSourceTelcoIn.value = this.isMatched.length 
    this.dataSourceTelcoOut.value = this.isFresh.length 
    this.dataSourceNimc.chart.upperLimit = this.projectsTemp.length
    this.dataSourceTelcoIn.chart.upperLimit = this.projectsTemp.length
    this.dataSourceTelcoOut.chart.upperLimit = this.projectsTemp.length
    },
      startBuffer () {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
          this.value += Math.random() * (15 - 5) + 5
          this.bufferValue += Math.random() * (15 - 5) + 6
        }, 2000)
      },
      
    },


};

 </script>
<style>
.project.MTN{
    border-left: 4px solid #ff6500;
}
.project.Ntel{
    border-left: 4px solid #9c27b0;
}
.project.nineMobile{
   border-left: 4px solid #0f8215;
}
.project.Airtel{
    border-left: 4px solid red;
}
.project.Globacom{
    border-left: 4px solid #16d220;
}
.project.Smile{
    border-left: 4px solid #cddc39;
}

.v-chip.MTN{
    background: #ff6500 !important;
}
.v-chip.Ntel{
    background:#9c27b0  !important;
}
.v-chip.nineMobile{
   background:#0f8215  !important;
}
.v-chip.Airtel{
    background: red  !important;
}
.v-chip.Globacom{
   background: #16d220  !important;
}
.v-chip.Smile{
    background: #cddc39  !important;
}
.v-card2{
  display: inline-block;
    width: 30%;
    margin: 10px;
}

</style>
