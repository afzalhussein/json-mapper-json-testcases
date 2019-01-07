const jsonMapper = require('json-mapper-json');
// Execute Node to run these tests
// Example 1 Same as npm site
// jsonMapper({
//     field: 'value',
// }, {
//     'new_field:': {
//         path: 'field',
//     },
// }).then((result)=>{
//     console.debug(result);
// }) // { 'new_field': 'value' }
// // Example 2 modification include, field name to sender, path to name
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//     },
// }).then((res)=>{
//     console.info(res);
// }) // { sender: 'val' }
// // Example 3 using required
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: true, // not required, default true
//     },
// }).then((res)=>{
//     console.info(res);
// }) // { sender; 'val' }
// // Example 4 using required to false
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: false, // not required, default true
//     },
// }).then((res)=>{
//     console.info(res);
// }) // returns { sender: 'val' }
// // Example 5 using required true with field name not passed
// jsonMapper({
//     names: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: false, // not required, default true
//     },
// }).then((res)=>{
//     console.info(res);
// }) // returns {}
// // Example 5
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: false, // not required, default true
//     },
// }).then((res)=>{
//     console.info(res);
// }) //{ sender: 'val' }
// // Example 6
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: false, // not required, default true
//     },
//     'new_field2':{
//         path: 'field2', // note this field is not in from object
//         required: false,
//     },
// }).then((res)=>{
//     console.info(res);
// }) // { sender: 'val' }
// // Example 7
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: false, // not required, default true
//     },
//     // 'new_field2': { // if this line left uncommented, it throws Error: Path can't null
//         // path: 'field2', // Even though required is not set but default is true
// //        required: true, // note this field is not in from object
// //     },
// }).then((res)=>{
//     console.info(res);
// }) // Error contains Error: Invalid path field2 (field2)
// Example 8
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: false, // not required, default true
//     },
//     'new_field2':{
//         path: 'field2',
//         defaultValue: 'default_value', // default is set
//         // required: true, // note this field is not in from object
//     },
// }).then((res)=>{
//     console.info(res);
// }) // Error contains Error: Invalid path field2 (field2)
// Example 9
// jsonMapper({
//     name: 'val',
// }, {
//     'sender': {
//         path: 'name', // required
//         required: false, // not required, default true
//     },
//     'new_field2':{
//         path: 'field2',// note this field is not in from object
//         defaultValue: 'default_value',
//         required: false,
//     },
// }).then((res)=>{
//     console.info(res);
// }) //
// Given test data and cases by DD
// {
//     name: “John  “,
//     phone: [ {num:“88”,ext:”1”} {nm:”121”,ext:”0”}],
//     vehicle:’$BMW’
// }

