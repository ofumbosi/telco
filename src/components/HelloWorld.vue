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
                <vc-donut v-bind="ninemobile">   <h1><strong>38%</strong> </h1><br> 9Mobile
                </vc-donut>
                </v-flex>
              <v-flex xs6  sm4 md12>   
                <vc-donut v-bind="mtn">  <h1> <strong>35%</strong></h1> <br>MTN
                </vc-donut>
                </v-flex>
                
         </v-layout>
         <v-layout row justify-start class="mb-3">
        
              
              <v-flex xs6  sm4 md12>
              <vc-donut v-bind="airtel">   <h1> <strong>28%</strong> </h1><br> Airtel
                </vc-donut>
                </v-flex>
                <v-flex xs6  sm4 md12>         
              <vc-donut v-bind="glo">  <h1> <strong>25%</strong> </h1><br> Globacom
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
    <v-card  class="pa-1"> Feb 4, 2021 > Feb, 30, 2020 </v-card>
     
      <v-spacer></v-spacer>
    <v-card  class="pa-1"> <v-tooltip top>
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
        </v-tooltip> </v-card>
         
        
        

         
       
     
      
  </v-card-title>
  <v-layout row wrap >
          <v-flex xs12  sm12 md4>
                <vue-gauge :refid="'type-unique-id'" :options="{'needleValue':timerCount,chartWidth:350,'arcDelimiters':[85]}" updateNeedle="{timerCount}"></vue-gauge>
                 <v-layout row wrap >
         
                    <v-flex xs12  sm12 md4>
                      <v-card width="`100%`" class="pa-3 mx-2">
                        <v-card-subtitle>Matched 78 M </v-card-subtitle>
                      </v-card>
                    </v-flex>
                    <v-flex xs12  sm12 md4>
                              <v-card width="`100%`" class="pa-3  mx-2">
                                <v-card-subtitle>Processing 40 M </v-card-subtitle>
                              </v-card>
                    </v-flex>
                    <v-flex xs12  sm12 md4>
                            <v-card width="`100%`" class="pa-3  mx-2">
                            <v-card-subtitle>  Unmatched 60 M </v-card-subtitle>
                            </v-card>
                  </v-flex>
              </v-layout>
          
          </v-flex>
          <v-flex xs12  sm12 md8>
         
      
      <v-card flat class=" ma-1" v-for="project in filteredProjects" :key="project._id">
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
      v-model="filteredProjects"
      :length="10"
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
export default {
   watch: {

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
      return this.projects.filter((p)=>{
        if(new Date(p.dateMatched) >= new Date("01/10/2021"))

        return p//.telco.match('MTN')
       });
        
     }
   },
  data() {
    return {
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
       projects:[
  {
    "_id": "604ca6d1cc94697af166a7bc",
    "index": 0,
    "guid": "c037eeb4-6c26-44d7-aa10-200b7c7867f5",
    "isActive": true,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Sat Jan 02 2021 16:51:27 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Edo",
    "picture": "http://placehold.it/32x32",
    "age": 53,
    "score": 60,
    "eyeColor": "blue",
    "name": "Tran Levy",
    "gender": "male",
    "phone": "+234 (822) 596-3646",
    "address": "578 Polhemus Place, Defiance, Palau, 7616"
  },
  {
    "_id": "604ca6d1cec3fd259236c18d",
    "index": 1,
    "guid": "7c971bbf-a52b-4fb8-a7ec-9e44cd2bdcd8",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Fri Jan 29 2021 18:59:42 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Oyo",
    "picture": "http://placehold.it/32x32",
    "age": 71,
    "score": 31,
    "eyeColor": "green",
    "name": "Aline Jacobson",
    "gender": "female",
    "phone": "+234 (867) 558-3228",
    "address": "739 Beayer Place, Leland, Illinois, 9093"
  },
  
  {
    "_id": "604ca6d181f93a5dc7dbae3d",
    "index": 50,
    "guid": "4199761f-be57-458c-be9b-f265226534cd",
    "isActive": true,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Thu Jan 28 2021 17:18:41 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Edo",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "score": 79,
    "eyeColor": "green",
    "name": "Gonzales Ryan",
    "gender": "male",
    "phone": "+234 (972) 453-2966",
    "address": "633 Louise Terrace, Curtice, Texas, 379"
  },
  
  {
    "_id": "604ca6d1111640d92df68a64",
    "index": 53,
    "guid": "38b395dd-09bf-41fe-ad27-22e016974dca",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Tue Feb 09 2021 05:26:37 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Niger",
    "picture": "http://placehold.it/32x32",
    "age": 14,
    "score": 89,
    "eyeColor": "green",
    "name": "Young Logan",
    "gender": "female",
    "phone": "+234 (971) 496-3856",
    "address": "794 Franklin Avenue, Baker, Virgin Islands, 2320"
  },
  {
    "_id": "604ca6d1483b1856eb82bae9",
    "index": 54,
    "guid": "dcd866a9-cfae-4139-9c3d-871e2d5ca45b",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Fri Feb 12 2021 02:08:35 GMT+0100 (West Africa Standard Time)",
    "telco": "Smile",
    "state": "Bauchi",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "score": 36,
    "eyeColor": "blue",
    "name": "Serrano Clements",
    "gender": "male",
    "phone": "+234 (960) 476-2517",
    "address": "738 Dikeman Street, Longoria, Mississippi, 4374"
  }
],
      mtn: {
        size: 130,
        telco:"MTN",
        value:35,
        sections: [
        	{ label: 'Processing', value: 65, color: '#eeeeee' },
          { label: 'Matched', value: 35, color: 'orange' },
          
         
        ],
        thickness: 15, // set this to 100 to render it as a pie chart instead
       
        // specify more props here
      },
       airtel: {
        size: 130,
        value:20,
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
        value:21,
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
        value:38,
        sections: [
        	{ label: 'Processing', value: 62, color: '#eeeeee' },
          { label: 'Matched', value: 38, color: 'green' },
          
         
        ],
        thickness: 15, // set this to 100 to render it as a pie chart instead
        
        // specify more props here
      },
      

    
    }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
  }
}
</script>

<style>

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
