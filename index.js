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

// Example 10
// test case 1
// {  name:’myname’}           myname:’John’

jsonMapper({
    name: 'John   ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'myname': {
        path: 'name', // required
    },
}).then((res) => {
    console.info(res);
}) // { myname: 'John   ' }


// Example 11
// test case 2
// {  name:’policy.insuredName’}           policy { insuredName:’John’ }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: 'name', // required
            }
        }
    },
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: 'John    ' } }


// Example 12
// test case 3
// {  name:{target:’policy.insuredName’, transform:[‘trim’]}           policy { insuredName:’John’ }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: 'name',
                formatting: value => value.trim()
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: 'John' } }

// Example 14
// test case 4
// {  name:{target:’policy.insuredName’, transform:[{addPrefix:”<pre>”}]           policy { insuredName:’<pre>John   ’ }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: 'name',
                formatting: value => '<pre>' + value
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: '<pre>John    ' } }

// Example 15
// test case 5
// {  name:{target:’policy.insuredName’, transform:[{addSuffix:”<post>”}]           policy { insuredName:’John   <post>’ }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: 'name',
                formatting: value => value + '<post>'
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: 'John    <post>' } }

// Example 16
// test case 6
// {  name:{target:’policy.insuredName’, transform:[{format:’my name is $value and I drive a $vehicle}}] }           policy { insuredName:’my name is John and I drive a $BMW’}
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: '$item',
                formatting: value => `my name is ${value.name.trim()} and I drive a ${value.vehicle}`
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: 'my name is John     and I drive a $BMW' } }

// Example 17
// test case 7
// {  name:{target:’policy.insuredName’, transform:[{map:{John:’foo’, Jim:’bar’…}}] }           policy { insuredName:’foo’ }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: 'name',
                formatting: (value) => {
                    let trimv = value.trim();
                    const map = [{John: 'foo'}, {Jim: 'bar'}];
                    return map.filter(v => v.hasOwnProperty(trimv))[0][trimv];
                }
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: 'foo' } }

// Example 18
// test case 8
// Mapping.transformations.maps.nameMap = { John:’xyz’,…}
// {  name:{target:’policy.insuredName’, transform:[{map:{nameMap} }] }
//       policy { insuredName:’xyz’ }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: 'name',
                formatting: (value) => {
                    let trimv = value.trim();
                    const map = {John: 'foo', Jim: 'bar'};
                    return map[trimv];
                }
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: 'foo' } }

// Example 19
// test case 9
// Mapping.transformations.maps.nameMapWithVars = { John:{format:’hello $value}’,…}
// {  name:{target:’policy.insuredName’, transform:[{map:{nameMap} }] }           policy { insuredName:’hello John’ }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insuredName: {
                path: '$item',
                formatting: (value) => {
                    let trimv = value.name.trim();
                    const map = {John: `hello ${value.name}`, Jim: `bar ${value.name}`};
                    return map[trimv];
                }
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insuredName: 'hello John    ' } }

// Example 20
// test case 10
// {  phone:’policy.insured.phone’ }           policy { insured:{ phone:[…] }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insured: {
                path: '$empty',
                nested: {
                    'phone': {
                        path: 'phone',
                    }
                }
            }
        }
    }
}).then((res) => {
    console.info(res);
}) // { policy: { insured: { phone: [Array] } } }

// Example 21
// test case 11
// {  phone:{target:’policy.insured.phone’,options:{num:’number’, ext:’extension’ }
//       policy { insured:{phone:[ {number:“88”,extension:”1”} {number:”121”,extension:”0”}]] }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insured: {
                path: '$empty',
                nested: {
                    phone: {
                        path: 'phone',
                    }
                }

            }
        }
    }
}).then((res) => {
    console.table(res['policy'].insured);
}) // ┌─────────┬─────────────────────────┬─────────────────────────┐
//│ (index) │            0            │            1            │
//├─────────┼─────────────────────────┼─────────────────────────┤
//│  phone  │ { num: '88', ext: '1' } │ { nm: '121', ext: '0' } │
//└─────────┴─────────────────────────┴─────────────────────────┘

// Example 22
// test case 12
// {  phone:{target:’policy.insured.phone’,options:{num:{target:’number’, transform:[pad4Digits] }, ext:’extension’ }
//       policy { insured:{phone:[ {number:“0088”,extension:”1”} {number:”0121”,extension:”0”}]] }
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'policy': {
        path: '$empty',
        nested: {
            insured: {
                path: '$empty',
                nested: {
                    phone: {
                        path: '$item',
                        formatting: (value) => {
                            return value.phone.map(
                                (v) => {
                                    let passVal = ''
                                    if (v.hasOwnProperty('num')) passVal = 'num'; else passVal = 'nm'
                                    return {'number': v[passVal].padStart(4, '0'), 'extension': v.ext.padStart(4, '0')}
                                });
                        }
                    }
                }
            }
        }
    }
}).then((res) => {
    console.debug(res.policy.insured.phone);
}) // { policy: { insured: { phone:  [ { number: '0088', extension: '0001' },
   // { number: '0121', extension: '0000' } ]

// Example 23
// test case 13
// {  vehicle:{target:’veh’, prefix:{strip:’$’}, transform:[toLower] }           { veh:  ‘bmw’}
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'veh': {
        path: 'vehicle',
        formatting: value => value.substr(1).toLowerCase()

    }
}).then((res) => {
    console.debug(res);
}) // { veh: 'bmw' }

// Example 24
// test case 14
// Mapping.transformations.myTransformation=x->’hi_’+x
//
// {  vehicle:{target:’veh’, transform:[myTransformation] }           { veh:  ‘hi_$bmw’}
jsonMapper({
    name: 'John    ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
}, {
    'veh': {
        path: 'vehicle',
        formatting: value => {
            return 'hi_' +
                value.toLowerCase()
        }

    }
}).then((res) => {
    console.debug(res);
}) // { veh: 'hi_$bmw' }
