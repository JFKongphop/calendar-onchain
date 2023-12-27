export const calendarABI = [{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"start_event","type":"uint256"},{"internalType":"uint256","name":"end_event","type":"uint256"},{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"string","name":"store_title","type":"string"},{"internalType":"string","name":"title_event","type":"string"},{"internalType":"string","name":"month_range","type":"string"}],"name":"addEventSchedule","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"title","type":"string"}],"name":"createEventStore","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"uint256","name":"event_id","type":"uint256"},{"internalType":"string","name":"month_range","type":"string"}],"name":"deleteEventSchedule","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"string","name":"month_range","type":"string"}],"name":"deleteEventScheduleMonth","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"uint256","name":"event_id","type":"uint256"},{"internalType":"uint256","name":"start_event","type":"uint256"},{"internalType":"uint256","name":"end_event","type":"uint256"},{"internalType":"string","name":"month_range","type":"string"},{"internalType":"string","name":"title","type":"string"}],"name":"editEventSchedule","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"string","name":"new_store_title","type":"string"}],"name":"editEventStoreTitle","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"string","name":"month_range","type":"string"}],"name":"getEventSchedule","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"address[]","name":"accounts","type":"address[]"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"start_event","type":"uint256"},{"internalType":"uint256","name":"end_event","type":"uint256"},{"internalType":"string","name":"title","type":"string"}],"internalType":"struct Calendar.EventSchedule[]","name":"eventSchedule","type":"tuple[]"}],"internalType":"struct Calendar.EventStoreRetrived","name":"eventStoreRetrived","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEventTitle","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"parctitipationAmount","type":"uint256"},{"internalType":"address[]","name":"parctitipationAccount","type":"address[]"},{"internalType":"bool","name":"del","type":"bool"}],"internalType":"struct Calendar.EventTitle[]","name":"eventTitles","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"string","name":"store_title","type":"string"},{"internalType":"string","name":"month_range","type":"string"}],"name":"getParticipationStore","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"address[]","name":"accounts","type":"address[]"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"start_event","type":"uint256"},{"internalType":"uint256","name":"end_event","type":"uint256"},{"internalType":"string","name":"title","type":"string"}],"internalType":"struct Calendar.EventSchedule[]","name":"eventSchedule","type":"tuple[]"}],"internalType":"struct Calendar.EventStoreRetrived","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getParticipationTitle","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"address","name":"createdBy","type":"address"}],"internalType":"struct Calendar.ParticipationStore[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"address","name":"invitation_account","type":"address"}],"name":"inviteParticipation","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"string","name":"store_title","type":"string"}],"name":"leaveParticipationEvent","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"},{"internalType":"address","name":"participationAccount","type":"address"}],"name":"removeAccountParticipation","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"store_index","type":"uint256"}],"name":"removeAllAccountParticipations","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"}]
// [
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "start_event",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "end_event",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "store_title",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "title_event",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "month_range",
//         "type": "string"
//       }
//     ],
//     "name": "addEventSchedule",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "title",
//         "type": "string"
//       }
//     ],
//     "name": "createEventStore",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "event_id",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "month_range",
//         "type": "string"
//       }
//     ],
//     "name": "deleteEventSchedule",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "month_range",
//         "type": "string"
//       }
//     ],
//     "name": "deleteEventScheduleMonth",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "event_id",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "start_event",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "end_event",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "month_range",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "title",
//         "type": "string"
//       }
//     ],
//     "name": "editEventSchedule",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "new_store_title",
//         "type": "string"
//       }
//     ],
//     "name": "editEventStoreTitle",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "month_range",
//         "type": "string"
//       }
//     ],
//     "name": "getEventSchedule",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "string",
//             "name": "title",
//             "type": "string"
//           },
//           {
//             "internalType": "address[]",
//             "name": "accounts",
//             "type": "address[]"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "uint256",
//                 "name": "id",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "start_event",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "end_event",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "string",
//                 "name": "title",
//                 "type": "string"
//               }
//             ],
//             "internalType": "struct Calendar.EventSchedule[]",
//             "name": "eventSchedule",
//             "type": "tuple[]"
//           }
//         ],
//         "internalType": "struct Calendar.EventStoreRetrived",
//         "name": "eventStoreRetrived",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "account",
//         "type": "address"
//       }
//     ],
//     "name": "getEventTitle",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "string",
//             "name": "title",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "parctitipationAmount",
//             "type": "uint256"
//           },
//           {
//             "internalType": "address[]",
//             "name": "parctitipationAccount",
//             "type": "address[]"
//           },
//           {
//             "internalType": "bool",
//             "name": "del",
//             "type": "bool"
//           }
//         ],
//         "internalType": "struct Calendar.EventTitle[]",
//         "name": "eventTitles",
//         "type": "tuple[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "store_title",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "month_range",
//         "type": "string"
//       }
//     ],
//     "name": "getParticipationStore",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "string",
//             "name": "title",
//             "type": "string"
//           },
//           {
//             "internalType": "address[]",
//             "name": "accounts",
//             "type": "address[]"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "uint256",
//                 "name": "id",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "start_event",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "end_event",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "string",
//                 "name": "title",
//                 "type": "string"
//               }
//             ],
//             "internalType": "struct Calendar.EventSchedule[]",
//             "name": "eventSchedule",
//             "type": "tuple[]"
//           }
//         ],
//         "internalType": "struct Calendar.EventStoreRetrived",
//         "name": "",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "account",
//         "type": "address"
//       }
//     ],
//     "name": "getParticipationTitle",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "string",
//             "name": "title",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "store_index",
//             "type": "uint256"
//           },
//           {
//             "internalType": "address",
//             "name": "createdBy",
//             "type": "address"
//           }
//         ],
//         "internalType": "struct Calendar.ParticipationStore[]",
//         "name": "",
//         "type": "tuple[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "title",
//         "type": "string"
//       },
//       {
//         "internalType": "address",
//         "name": "invitation_account",
//         "type": "address"
//       }
//     ],
//     "name": "inviteParticipation",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "store_title",
//         "type": "string"
//       }
//     ],
//     "name": "leaveParticipationEvent",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       },
//       {
//         "internalType": "address",
//         "name": "participationAccount",
//         "type": "address"
//       }
//     ],
//     "name": "removeAccountParticipation",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "store_index",
//         "type": "uint256"
//       }
//     ],
//     "name": "removeAllAccountParticipations",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "test",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]