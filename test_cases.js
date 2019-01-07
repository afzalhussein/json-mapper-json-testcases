// @author:      Syed Hussain
// @name:        Example 1
// @description: test case 1
// @example:     {  name:’myname’}           myname:’John’
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


// Example 2
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


// Example 3
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

// Example 4
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

// Example 5
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

// Example 6
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

// Example 7
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

// Example 8
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

// Example 9
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

// Example 10
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

// Example 11
// test case 11
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

// Example 12
// test case 12
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

// Example 13
// test case 13
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