<template>
  <v-container class="grey lighten-5">
 {{count}}
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
                  :dataSource="dataSourceIns">
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
                  :dataSource="dataSourceNimc">
                </fusioncharts>
                </td>
 
  </tr>
  
  
                
  </table>


      <v-layout row justify-start class="mb-3">
  <v-flex xs12 md4>
        <v-btn small flat color="grey" @click="sortBy('telco')">
      
          <v-icon small left>mdi-folder</v-icon>
          <span class="caption text-lowercase">By Telco</span>
        </v-btn>
    </v-flex>
    <v-flex xs12 md4>
         <v-btn small flat color="grey" @click="sortBy('score')">
          <v-icon small left>mdi-email</v-icon>
          <span class="caption text-lowercase">By Score</span>
        </v-btn>
    </v-flex>
      </v-layout>
   
      <v-card flat class=" ma-3" v-for="project in filteredProjects" :key="project._id">
      <v-layout row wrap :class ="`pa-3 project ${project.telco}`">
      <v-flex xs12 md4>
      <div class="caption grey--text">
          Name
      </div>
      <div class="small">
          {{project.name}}
      </div>
      </v-flex>

      
      <v-flex xs6 sm4 md2>
      <div class="caption grey--text">
          dateMatched
      </div>
      <div class="small">
         {{project.dateMatched}}
      </div>
      </v-flex>

       <v-flex xs6 sm4 md2>
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
      <v-flex xs2 sm4 md2>
      <div class="caption grey--text">
          Score
      </div>
      <div class="small">
         <v-progress-linear
      v-model="project.score"
      color="blue-grey"
      height="5"
    >
      <template v-slot:default="{ value }">
        <strong small>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
      </div>
      </v-flex>

      </v-layout>
     <v-divider></v-divider>
      </v-card>
     
  </v-container>
</template>

<script>
export default {
  name: "team",
  computed:{
    count:'',
     filteredProjects:function(){
      return this.projects.filter((p)=>{
        if(new Date(p.dateMatched) >= new Date("01/10/2021"))

        return p.telco.match('MTN')
       });
        
     }
   },
  data: function () {
    return {
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
          upperLimit: "120",
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
          caption: "Outgoing",
          subcaption: "Outflow cluster",
          lowerLimit: "0",
          upperLimit: "120",
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
          caption: "Outgoing",
          subcaption: "Matched Cluster",
          lowerLimit: "0",
          upperLimit: "120",
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
          caption: "Matched",
          subcaption: "Matched Cluster",
          lowerLimit: "0",
          upperLimit: "120",
          lowerLimitDisplay: "Data",
          upperLimitDisplay: "Max",
          numberSuffix: " TB",
          showValue: "1",
          chartBottomMargin: "25",
          //Changing the Cylinder fill color
          cylFillColor: "#1976d2",
        },
        value: "10",
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
    "_id": "604ca6d10c965b995f9a60cc",
    "index": 2,
    "guid": "479ca000-a89b-4535-8443-a93e89096bfa",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Tue Mar 09 2021 03:34:41 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Kwara",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "score": 33,
    "eyeColor": "blue",
    "name": "Janine Burt",
    "gender": "female",
    "phone": "+234 (938) 528-2949",
    "address": "202 Cambridge Place, Barclay, Nebraska, 6985"
  },
  {
    "_id": "604ca6d1cfc017dc45578b13",
    "index": 3,
    "guid": "f7b49deb-8015-4b59-be47-90ac5fdc7ab3",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Sun Feb 28 2021 07:11:58 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Enugu",
    "picture": "http://placehold.it/32x32",
    "age": 51,
    "score": 8,
    "eyeColor": "brown",
    "name": "Madden Singleton",
    "gender": "male",
    "phone": "+234 (854) 487-3439",
    "address": "843 Liberty Avenue, Elliott, Indiana, 980"
  },
  {
    "_id": "604ca6d18bbf98c1b0fd500d",
    "index": 4,
    "guid": "0f080c1a-b18e-4465-a562-16155c2568d2",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Fri Feb 05 2021 13:42:34 GMT+0100 (West Africa Standard Time)",
    "telco": "Ntel",
    "state": "Ondo",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "score": 3,
    "eyeColor": "blue",
    "name": "Rosemarie Huff",
    "gender": "female",
    "phone": "+234 (883) 532-2550",
    "address": "538 Victor Road, Edenburg, Virginia, 3520"
  },
  {
    "_id": "604ca6d1c8ed0331ea4e36e1",
    "index": 5,
    "guid": "25c67499-8973-481b-b31f-a13013e91264",
    "isActive": true,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Mon Jan 25 2021 04:41:58 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Jigawa",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "score": 25,
    "eyeColor": "green",
    "name": "Susanne Wynn",
    "gender": "female",
    "phone": "+234 (903) 569-2808",
    "address": "320 Brevoort Place, Bluffview, American Samoa, 7926"
  },
  {
    "_id": "604ca6d1218687e458a1b238",
    "index": 6,
    "guid": "8063938c-9038-4d71-a8ae-8f6a9317cd03",
    "isActive": true,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Sat Jan 30 2021 04:10:09 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Niger",
    "picture": "http://placehold.it/32x32",
    "age": 17,
    "score": 81,
    "eyeColor": "green",
    "name": "Tessa Chavez",
    "gender": "female",
    "phone": "+234 (925) 439-3107",
    "address": "838 Keen Court, Dunnavant, Florida, 8807"
  },
  {
    "_id": "604ca6d1a8b50250fd70da75",
    "index": 7,
    "guid": "6319fae0-7ced-4784-957a-80245f212837",
    "isActive": true,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Wed Jan 27 2021 18:30:33 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Yobe",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "score": 28,
    "eyeColor": "green",
    "name": "England Morton",
    "gender": "male",
    "phone": "+234 (947) 428-2252",
    "address": "235 Clinton Street, Teasdale, New York, 8250"
  },
  {
    "_id": "604ca6d15faf15365956f36e",
    "index": 8,
    "guid": "c8910ae1-f04d-444d-8eb2-6d555c0807e7",
    "isActive": true,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Sat Mar 13 2021 04:05:05 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Taraba",
    "picture": "http://placehold.it/32x32",
    "age": 42,
    "score": 15,
    "eyeColor": "blue",
    "name": "Simpson Holman",
    "gender": "male",
    "phone": "+234 (924) 440-2918",
    "address": "266 Bushwick Place, Fairfield, Arkansas, 5812"
  },
  {
    "_id": "604ca6d18083b3601a46f31e",
    "index": 9,
    "guid": "b52d5af5-2f37-4307-9dcc-581d7c198fed",
    "isActive": true,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Wed Jan 27 2021 13:01:32 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Delta",
    "picture": "http://placehold.it/32x32",
    "age": 42,
    "score": 99,
    "eyeColor": "blue",
    "name": "Lawanda Jefferson",
    "gender": "female",
    "phone": "+234 (894) 475-3411",
    "address": "492 Box Street, Weeksville, North Dakota, 5242"
  },
  {
    "_id": "604ca6d1cfd866b13ca5b7b3",
    "index": 10,
    "guid": "e87a64a0-87a6-4b0f-813c-458d6bfb6536",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Tue Feb 16 2021 13:52:52 GMT+0100 (West Africa Standard Time)",
    "telco": "Ntel",
    "state": "Oyo",
    "picture": "http://placehold.it/32x32",
    "age": 44,
    "score": 15,
    "eyeColor": "green",
    "name": "Annmarie Gould",
    "gender": "female",
    "phone": "+234 (914) 483-2412",
    "address": "479 Hope Street, Maury, Rhode Island, 7062"
  },
  {
    "_id": "604ca6d1f06cd449150bcb2b",
    "index": 11,
    "guid": "84235fb8-a91d-4c49-90c2-9858306b0de2",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Mon Jan 11 2021 05:23:59 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Osun",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "score": 77,
    "eyeColor": "brown",
    "name": "Richardson Solis",
    "gender": "male",
    "phone": "+234 (919) 574-2801",
    "address": "279 Canton Court, Verdi, Marshall Islands, 9729"
  },
  {
    "_id": "604ca6d164b68bbecda50d44",
    "index": 12,
    "guid": "83af1449-d8da-45f1-af06-7b579bfa1b25",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Sun Feb 21 2021 05:01:57 GMT+0100 (West Africa Standard Time)",
    "telco": "Smile",
    "state": "Jigawa",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "score": 67,
    "eyeColor": "blue",
    "name": "Bolton Bond",
    "gender": "male",
    "phone": "+234 (938) 559-3128",
    "address": "801 Calyer Street, Johnsonburg, New Mexico, 8505"
  },
  {
    "_id": "604ca6d1fef0f18535dba9ca",
    "index": 13,
    "guid": "f3dd4f7c-2dda-4274-b088-c04db341b720",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Sat Jan 09 2021 15:24:11 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Bayelsa",
    "picture": "http://placehold.it/32x32",
    "age": 52,
    "score": 86,
    "eyeColor": "green",
    "name": "Fry Jackson",
    "gender": "male",
    "phone": "+234 (857) 540-3654",
    "address": "470 Williams Avenue, Elbert, New Jersey, 6944"
  },
  {
    "_id": "604ca6d10b9047643418267c",
    "index": 14,
    "guid": "161e21cc-d579-4842-bbbe-075a9baf1fa9",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Fri Feb 05 2021 10:44:17 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Bayelsa",
    "picture": "http://placehold.it/32x32",
    "age": 19,
    "score": 81,
    "eyeColor": "brown",
    "name": "Shelia Webster",
    "gender": "female",
    "phone": "+234 (826) 453-2015",
    "address": "159 Clay Street, Wattsville, Louisiana, 8657"
  },
  {
    "_id": "604ca6d1c4fe8ea9154ba7d7",
    "index": 15,
    "guid": "2985c7c0-31ba-4915-9cce-5ddb2f6819ec",
    "isActive": true,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Thu Jan 14 2021 13:30:20 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Lagos",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "score": 80,
    "eyeColor": "blue",
    "name": "Janis Ballard",
    "gender": "female",
    "phone": "+234 (907) 413-2837",
    "address": "184 Division Avenue, Spelter, Guam, 8454"
  },
  {
    "_id": "604ca6d1b1b0e7aa5f5030f5",
    "index": 16,
    "guid": "848ddd46-cf19-44ec-bd89-02155c666e62",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Wed Jan 27 2021 05:15:44 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Abia",
    "picture": "http://placehold.it/32x32",
    "age": 60,
    "score": 42,
    "eyeColor": "blue",
    "name": "Farrell Fowler",
    "gender": "male",
    "phone": "+234 (871) 435-2592",
    "address": "579 Hamilton Walk, Kraemer, Vermont, 5802"
  },
  {
    "_id": "604ca6d14d9d7a0d02f78693",
    "index": 17,
    "guid": "f6af1032-0e36-4f8d-a758-03dcacdb73ea",
    "isActive": true,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Wed Feb 10 2021 11:26:09 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Ogun",
    "picture": "http://placehold.it/32x32",
    "age": 15,
    "score": 64,
    "eyeColor": "green",
    "name": "Avila Mcfarland",
    "gender": "male",
    "phone": "+234 (884) 450-2608",
    "address": "161 Kay Court, Omar, Michigan, 7651"
  },
  {
    "_id": "604ca6d108f45214a09fb30e",
    "index": 18,
    "guid": "fb7dd80c-a845-4573-8d15-1ec14c3302bb",
    "isActive": true,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Tue Jan 05 2021 07:02:33 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Ekiti",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "score": 4,
    "eyeColor": "brown",
    "name": "Witt Saunders",
    "gender": "male",
    "phone": "+234 (853) 490-2615",
    "address": "559 Provost Street, Hamilton, Idaho, 4856"
  },
  {
    "_id": "604ca6d1151e9fad4aaae5e6",
    "index": 19,
    "guid": "8385982e-816d-42b5-a2a3-20553bf23199",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Mon Jan 04 2021 01:57:16 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Oyo",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "score": 68,
    "eyeColor": "blue",
    "name": "Iva Watkins",
    "gender": "female",
    "phone": "+234 (950) 571-2804",
    "address": "941 Downing Street, Rutherford, North Carolina, 3848"
  },
  {
    "_id": "604ca6d1bcffc5e1334689d2",
    "index": 20,
    "guid": "6eab98f0-fbca-4230-9f6a-3746d46eb346",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Tue Feb 23 2021 07:29:29 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Bauchi",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "score": 30,
    "eyeColor": "brown",
    "name": "Owen Downs",
    "gender": "male",
    "phone": "+234 (864) 560-3416",
    "address": "879 Vanderveer Street, Chesterfield, Kansas, 4944"
  },
  {
    "_id": "604ca6d1135fb5f11d45cd4e",
    "index": 21,
    "guid": "476c048b-4b1c-4e50-8265-890c9da32031",
    "isActive": true,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Wed Feb 10 2021 01:29:55 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Ondo",
    "picture": "http://placehold.it/32x32",
    "age": 70,
    "score": 27,
    "eyeColor": "brown",
    "name": "Neal Mason",
    "gender": "male",
    "phone": "+234 (858) 505-3391",
    "address": "491 Wyona Street, Felt, Pennsylvania, 7687"
  },
  {
    "_id": "604ca6d1b56bde0369b37016",
    "index": 22,
    "guid": "6b64579c-e38d-499c-82e8-b4b936580962",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Thu Feb 18 2021 10:20:14 GMT+0100 (West Africa Standard Time)",
    "telco": "Ntel",
    "state": "Ondo",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "score": 48,
    "eyeColor": "green",
    "name": "Oneill Goodwin",
    "gender": "male",
    "phone": "+234 (939) 460-2019",
    "address": "164 Mill Avenue, Chamberino, Massachusetts, 8735"
  },
  {
    "_id": "604ca6d1d45cfe4313b160d6",
    "index": 23,
    "guid": "10c1278e-fd07-4460-9db7-7fb17ad5ba05",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Fri Jan 15 2021 19:31:39 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Borno",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "score": 55,
    "eyeColor": "blue",
    "name": "Henderson Randolph",
    "gender": "male",
    "phone": "+234 (831) 581-2737",
    "address": "454 Celeste Court, Wollochet, Alabama, 5855"
  },
  {
    "_id": "604ca6d17972f6511a8d39a8",
    "index": 24,
    "guid": "db704cb5-fefe-41ca-b273-206ae678a19f",
    "isActive": true,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Mon Jan 25 2021 10:20:47 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Lagos",
    "picture": "http://placehold.it/32x32",
    "age": 17,
    "score": 33,
    "eyeColor": "brown",
    "name": "Cohen Simpson",
    "gender": "male",
    "phone": "+234 (948) 585-2244",
    "address": "157 Varanda Place, Lafferty, Wisconsin, 5126"
  },
  {
    "_id": "604ca6d1f9d8cfd60f93cd18",
    "index": 25,
    "guid": "48d33ec3-102e-4119-b983-72cee4afa6e2",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Thu Jan 07 2021 07:47:16 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Delta",
    "picture": "http://placehold.it/32x32",
    "age": 11,
    "score": 67,
    "eyeColor": "green",
    "name": "Holt Finley",
    "gender": "male",
    "phone": "+234 (957) 597-3895",
    "address": "913 Grove Street, Nipinnawasee, Delaware, 175"
  },
  {
    "_id": "604ca6d1649fab39eb5bfb05",
    "index": 26,
    "guid": "3b93f9a5-7320-45d1-b2ee-a25c563e4456",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Mon Jan 04 2021 15:07:37 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Lagos",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "score": 5,
    "eyeColor": "blue",
    "name": "Belinda Gonzalez",
    "gender": "female",
    "phone": "+234 (910) 427-2848",
    "address": "929 Micieli Place, Needmore, Minnesota, 3486"
  },
  {
    "_id": "604ca6d1ceefdec8c89908b8",
    "index": 27,
    "guid": "58492e63-7053-41cf-ab06-8f9eab0fa76d",
    "isActive": false,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Sun Feb 21 2021 08:23:17 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Adamawa",
    "picture": "http://placehold.it/32x32",
    "age": 44,
    "score": 11,
    "eyeColor": "blue",
    "name": "Beulah Dickson",
    "gender": "female",
    "phone": "+234 (890) 466-2982",
    "address": "501 Just Court, Lowgap, Hawaii, 5118"
  },
  {
    "_id": "604ca6d12f246258f04d0835",
    "index": 28,
    "guid": "194e753e-ad8a-4c27-b3ee-1f8d8cee5103",
    "isActive": true,
    "isMatched": false,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Sun Jan 31 2021 17:52:12 GMT+0100 (West Africa Standard Time)",
    "telco": "Smile",
    "state": "Abia",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "score": 68,
    "eyeColor": "green",
    "name": "Nikki Yang",
    "gender": "female",
    "phone": "+234 (860) 534-3823",
    "address": "392 Brighton Court, Sylvanite, Utah, 2529"
  },
  {
    "_id": "604ca6d1053a9111a682f18c",
    "index": 29,
    "guid": "0d4be5ce-e2a2-4b88-917e-aee98ccbf439",
    "isActive": true,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Tue Feb 09 2021 23:11:34 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Edo",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "score": 77,
    "eyeColor": "blue",
    "name": "Wiley Pearson",
    "gender": "male",
    "phone": "+234 (858) 527-3005",
    "address": "654 Krier Place, Hilltop, Colorado, 4365"
  },
  {
    "_id": "604ca6d11865ce7af470bbff",
    "index": 30,
    "guid": "a06186bf-4d45-4d22-b197-d12b7c29aa09",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Sat Jan 23 2021 04:37:13 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Gombe",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "score": 4,
    "eyeColor": "green",
    "name": "Booker Fischer",
    "gender": "male",
    "phone": "+234 (927) 492-3281",
    "address": "439 Dictum Court, Marshall, Georgia, 4375"
  },
  {
    "_id": "604ca6d11c9b2f6e04f5ec81",
    "index": 31,
    "guid": "c5385498-6450-4724-ab9c-1ce1dd0f6719",
    "isActive": true,
    "isMatched": false,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Tue Feb 23 2021 02:43:03 GMT+0100 (West Africa Standard Time)",
    "telco": "Smile",
    "state": "Lagos",
    "picture": "http://placehold.it/32x32",
    "age": 43,
    "score": 6,
    "eyeColor": "blue",
    "name": "Alberta Key",
    "gender": "female",
    "phone": "+234 (921) 424-2158",
    "address": "236 Hendrix Street, Dellview, Ohio, 5085"
  },
  {
    "_id": "604ca6d1a1d8a08bfeb60f14",
    "index": 32,
    "guid": "c892efe5-7ebc-4168-93a1-3437311ae1c6",
    "isActive": true,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Sun Feb 21 2021 12:22:45 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Lagos",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "score": 41,
    "eyeColor": "blue",
    "name": "Ramos Cantrell",
    "gender": "male",
    "phone": "+234 (922) 558-2353",
    "address": "388 Rapelye Street, Idamay, Connecticut, 3010"
  },
  {
    "_id": "604ca6d14a6b2c73654ed952",
    "index": 33,
    "guid": "493d7bdc-f80a-475d-b3d6-20c867d89c03",
    "isActive": true,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Sat Feb 13 2021 14:54:09 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Delta",
    "picture": "http://placehold.it/32x32",
    "age": 12,
    "score": 92,
    "eyeColor": "brown",
    "name": "Justice Wells",
    "gender": "male",
    "phone": "+234 (812) 596-2681",
    "address": "830 Dorset Street, Cobbtown, West Virginia, 4145"
  },
  {
    "_id": "604ca6d1171e2d41519a5487",
    "index": 34,
    "guid": "b860e21f-28c4-4c85-b97f-a0b609205e1d",
    "isActive": true,
    "isMatched": false,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Thu Jan 21 2021 23:14:07 GMT+0100 (West Africa Standard Time)",
    "telco": "Ntel",
    "state": "Akwa Ibom",
    "picture": "http://placehold.it/32x32",
    "age": 48,
    "score": 22,
    "eyeColor": "green",
    "name": "Palmer Scott",
    "gender": "male",
    "phone": "+234 (800) 514-2455",
    "address": "748 Court Street, Rehrersburg, Arizona, 2315"
  },
  {
    "_id": "604ca6d11e77f0dd883b5f78",
    "index": 35,
    "guid": "258bebe6-e7dd-4e4f-8509-fdbe353b657d",
    "isActive": true,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Fri Mar 12 2021 12:21:33 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Rivers",
    "picture": "http://placehold.it/32x32",
    "age": 67,
    "score": 13,
    "eyeColor": "brown",
    "name": "Melendez Cotton",
    "gender": "male",
    "phone": "+234 (890) 535-3764",
    "address": "830 Bedford Avenue, Boling, Missouri, 7255"
  },
  {
    "_id": "604ca6d1582cc50f2e7c6d76",
    "index": 36,
    "guid": "b5772f75-6ef8-4c18-8fce-4af4d01447fe",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Wed Jan 13 2021 23:02:50 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Bayelsa",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "score": 97,
    "eyeColor": "green",
    "name": "Mai Castro",
    "gender": "female",
    "phone": "+234 (918) 552-2296",
    "address": "774 Howard Alley, Clay, Oregon, 9297"
  },
  {
    "_id": "604ca6d1d3deb5de781e6bf3",
    "index": 37,
    "guid": "231af0a1-af5f-4181-8465-c5964518e53a",
    "isActive": true,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Sat Mar 06 2021 18:01:31 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Edo",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "score": 5,
    "eyeColor": "blue",
    "name": "Ortega Frank",
    "gender": "male",
    "phone": "+234 (928) 556-3123",
    "address": "333 Kansas Place, Winfred, Iowa, 3490"
  },
  {
    "_id": "604ca6d1672fc504f599db98",
    "index": 38,
    "guid": "28abb0ea-cd70-40f3-8d01-bd18fccb1ddd",
    "isActive": true,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": false,
    "dateMatched": "Wed Feb 24 2021 22:05:29 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Borno",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "score": 45,
    "eyeColor": "brown",
    "name": "Herman Dudley",
    "gender": "male",
    "phone": "+234 (818) 523-2159",
    "address": "799 Cooke Court, Dunbar, Oklahoma, 9906"
  },
  {
    "_id": "604ca6d1a24eebfb2e8c69b5",
    "index": 39,
    "guid": "f9c5ff58-1b15-42da-857c-bb7821ce25ba",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Tue Feb 16 2021 14:33:43 GMT+0100 (West Africa Standard Time)",
    "telco": "Smile",
    "state": "Ondo",
    "picture": "http://placehold.it/32x32",
    "age": 47,
    "score": 90,
    "eyeColor": "green",
    "name": "Moran Mckinney",
    "gender": "male",
    "phone": "+234 (947) 456-3746",
    "address": "775 Forrest Street, Dotsero, Alaska, 1445"
  },
  {
    "_id": "604ca6d1f753a31208f90c81",
    "index": 40,
    "guid": "ccd68824-4233-48c6-95be-981be850dd9d",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Mon Feb 15 2021 00:21:33 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Kogi",
    "picture": "http://placehold.it/32x32",
    "age": 18,
    "score": 80,
    "eyeColor": "blue",
    "name": "Wolf Wade",
    "gender": "male",
    "phone": "+234 (845) 579-3921",
    "address": "374 Front Street, Abrams, Montana, 1208"
  },
  {
    "_id": "604ca6d129f0275920611f30",
    "index": 41,
    "guid": "8179984d-0b10-4c04-a4c6-d7276bd78760",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Wed Feb 24 2021 14:27:47 GMT+0100 (West Africa Standard Time)",
    "telco": "Smile",
    "state": "Osun",
    "picture": "http://placehold.it/32x32",
    "age": 53,
    "score": 67,
    "eyeColor": "green",
    "name": "Sharp Cummings",
    "gender": "male",
    "phone": "+234 (871) 485-2959",
    "address": "978 Will Place, Groton, New Hampshire, 8553"
  },
  {
    "_id": "604ca6d193047e110ab2fdb9",
    "index": 42,
    "guid": "a2d0b867-494d-4ab5-81c3-9f8c2c6c4def",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Mon Feb 22 2021 08:12:42 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Benue",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "score": 99,
    "eyeColor": "green",
    "name": "Angie Davidson",
    "gender": "female",
    "phone": "+234 (813) 468-2206",
    "address": "912 Dekalb Avenue, Vallonia, District Of Columbia, 1777"
  },
  {
    "_id": "604ca6d17f6a082c80a8d8bc",
    "index": 43,
    "guid": "54e727de-07e8-4263-a9da-4174464071ff",
    "isActive": false,
    "isMatched": false,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Mon Jan 25 2021 07:59:16 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Imo",
    "picture": "http://placehold.it/32x32",
    "age": 19,
    "score": 21,
    "eyeColor": "brown",
    "name": "Janette Graham",
    "gender": "female",
    "phone": "+234 (925) 580-3914",
    "address": "689 Oriental Boulevard, Muir, Kentucky, 1317"
  },
  {
    "_id": "604ca6d180b5bbe2651881b8",
    "index": 44,
    "guid": "75830dba-d64e-45ea-97f2-59d2dbefa058",
    "isActive": false,
    "isMatched": false,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Sun Jan 24 2021 04:21:12 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Cross River",
    "picture": "http://placehold.it/32x32",
    "age": 64,
    "score": 41,
    "eyeColor": "brown",
    "name": "Howe Vega",
    "gender": "male",
    "phone": "+234 (814) 445-3410",
    "address": "481 Seagate Terrace, Denio, Federated States Of Micronesia, 6947"
  },
  {
    "_id": "604ca6d1d8b3f64272810ea1",
    "index": 45,
    "guid": "62d51ba0-f5b8-41e9-aecd-06692f453ed8",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Thu Feb 25 2021 18:23:39 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Taraba",
    "picture": "http://placehold.it/32x32",
    "age": 78,
    "score": 20,
    "eyeColor": "blue",
    "name": "Osborne Jarvis",
    "gender": "male",
    "phone": "+234 (846) 435-3458",
    "address": "598 Truxton Street, Leming, Northern Mariana Islands, 1271"
  },
  {
    "_id": "604ca6d16300dff4e7831c81",
    "index": 46,
    "guid": "199438bc-3b8e-4db4-b0f2-c1e0490929ed",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Mon Feb 08 2021 04:40:28 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Cross River",
    "picture": "http://placehold.it/32x32",
    "age": 51,
    "score": 76,
    "eyeColor": "brown",
    "name": "Shawn Ferguson",
    "gender": "female",
    "phone": "+234 (934) 508-3002",
    "address": "792 Colin Place, Gibsonia, California, 7233"
  },
  {
    "_id": "604ca6d158bab6eca4383495",
    "index": 47,
    "guid": "b598552e-779a-4dff-9679-ec183aad419d",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Wed Feb 17 2021 17:33:13 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Kano",
    "picture": "http://placehold.it/32x32",
    "age": 57,
    "score": 53,
    "eyeColor": "blue",
    "name": "Arnold Booth",
    "gender": "male",
    "phone": "+234 (921) 571-2413",
    "address": "937 Havemeyer Street, Lawrence, Nevada, 5689"
  },
  {
    "_id": "604ca6d135b64bff5771d594",
    "index": 48,
    "guid": "8aeb7cd3-5e25-4cae-a873-d6fd4135d93b",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Tue Jan 19 2021 09:34:01 GMT+0100 (West Africa Standard Time)",
    "telco": "Airtel",
    "state": "Kwara",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "score": 95,
    "eyeColor": "blue",
    "name": "Corinne Ward",
    "gender": "female",
    "phone": "+234 (970) 544-3106",
    "address": "938 Locust Avenue, Wacissa, Maine, 2553"
  },
  {
    "_id": "604ca6d1436f0c907f80d5ec",
    "index": 49,
    "guid": "6390c4da-c9cb-47b3-a8e4-cd1b6ae79f0d",
    "isActive": false,
    "isMatched": false,
    "isMigrated": true,
    "isReturned": false,
    "dateMatched": "Sat Jan 09 2021 14:58:48 GMT+0100 (West Africa Standard Time)",
    "telco": "nineMobile",
    "state": "Gombe",
    "picture": "http://placehold.it/32x32",
    "age": 64,
    "score": 56,
    "eyeColor": "green",
    "name": "Gallagher Wilkins",
    "gender": "male",
    "phone": "+234 (982) 424-3367",
    "address": "401 Chapel Street, Aguila, South Dakota, 8599"
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
    "_id": "604ca6d19d37f59ee5435fca",
    "index": 51,
    "guid": "6c7fa17d-a862-4e56-bdda-b1832b0d795a",
    "isActive": false,
    "isMatched": true,
    "isMigrated": true,
    "isReturned": true,
    "dateMatched": "Fri Jan 15 2021 01:50:27 GMT+0100 (West Africa Standard Time)",
    "telco": "MTN",
    "state": "Katsina",
    "picture": "http://placehold.it/32x32",
    "age": 48,
    "score": 79,
    "eyeColor": "brown",
    "name": "Sheila Bird",
    "gender": "female",
    "phone": "+234 (968) 571-2374",
    "address": "915 Joval Court, Conestoga, Washington, 197"
  },
  {
    "_id": "604ca6d1b2de1c4db3916e46",
    "index": 52,
    "guid": "645cb3b9-53c8-44dc-ac95-bf7fdf073918",
    "isActive": true,
    "isMatched": true,
    "isMigrated": false,
    "isReturned": true,
    "dateMatched": "Fri Jan 08 2021 15:20:42 GMT+0100 (West Africa Standard Time)",
    "telco": "Globacom",
    "state": "Jigawa",
    "picture": "http://placehold.it/32x32",
    "age": 64,
    "score": 85,
    "eyeColor": "blue",
    "name": "Gretchen Carlson",
    "gender": "female",
    "phone": "+234 (955) 582-2447",
    "address": "490 McKibben Street, Sultana, Maryland, 4788"
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
]
    };
  },


watch: {
      value (val) {
        if (val < 100) return

        this.value = 0
        this.bufferValue = 10
        this.startBuffer()
      },
    },

    mounted () {
      this.startBuffer()
    },

    beforeDestroy () {
      clearInterval(this.interval)
    },

    methods: {
      startBuffer () {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
          this.value += Math.random() * (15 - 5) + 5
          this.bufferValue += Math.random() * (15 - 5) + 6
        }, 2000)
      },
      sortBy(prop){
            console.log("FXN Called!");
            this.projects.sort((a,b)=>a[prop]<b[prop]? -1:1)
        }
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


</style>
