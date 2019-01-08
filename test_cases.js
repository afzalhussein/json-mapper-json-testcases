// @author:      Syed Hussain
// @name:        Example 1
// @description: test case 1
// @example:     {  name:’myname’}           myname:’John’
const jsonMapper = require('json-mapper-json');


const from = {
    name: 'John   ',
    phone: [{num: "88", ext: "1"}, {nm: "121", ext: "0"}],
    vehicle: "$BMW",
};
((jm, fm) => {
    const template = {
        'myname': {
            path: 'name', // required
        },
    };
    const mold = (res) => {
        console.info(res);
    };

    jm(fm, template).then(mold) // { myname: 'John   ' }
})(jsonMapper, from); // This ';' if omitted would not compile


// Example 2
// test case 2
// {  name:’policy.insuredName’}           policy { insuredName:’John’ }
((jm, fm) => {
    const template = {
        'policy': {
            path: '$empty',
            nested: {
                insuredName: {
                    path: 'name', // required
                }
            }
        },
    };
    const mold = (res) => {
        console.info(res);
    };

    jm(fm, template).then(mold)
})(jsonMapper, from);
// { policy: { insuredName: 'John    ' } }


// Example 3
// test case 3
// {  name:{target:’policy.insuredName’, transform:[‘trim’]}           policy { insuredName:’John’ }
((jm, fm) => {
    const template = {
        'policy': {
            path: '$empty',
            nested: {
                insuredName: {
                    path: 'name',
                    formatting: value => value.trim()
                }
            }
        }
    };

    const mold = (res) => {
        console.info(res);
    };
    jm(fm, template).then(mold) // { policy: { insuredName: 'John' } }
})(jsonMapper, from);


// Example 4
// test case 4
// {  name:{target:’policy.insuredName’, transform:[{addPrefix:”<pre>”}]           policy { insuredName:’<pre>John   ’ }
((jm, fm) => {
    const template = {
        'policy': {
            path: '$empty',
            nested: {
                insuredName: {
                    path: 'name',
                    formatting: value => '<pre>' + value
                }
            }
        }
    };

    const mold = (res) => {
        console.info(res);
    };

    jm(fm, template).then(mold) // { policy: { insuredName: '<pre>John    ' } }

})(jsonMapper, from);

// Example 5
// test case 5
// {  name:{target:’policy.insuredName’, transform:[{addSuffix:”<post>”}]           policy { insuredName:’John   <post>’ }
((jm, fm) => {
    const template = {
        'policy': {
            path: '$empty',
            nested: {
                insuredName: {
                    path: 'name',
                    formatting: value => value + '<post>'
                }
            }
        }
    };
    const mold = (res) => {
        console.info(res);
    };
    jm(fm, template).then(mold); // { policy: { insuredName: 'John    <post>' } }
})(jsonMapper, from);

// Example 6
// test case 6
// {  name:{target:’policy.insuredName’, transform:[{format:’my name is $value and I drive a $vehicle}}] }           policy { insuredName:’my name is John and I drive a $BMW’}
((jm, fm) => {
        const template = {
            'policy': {
                path: '$empty',
                nested: {
                    insuredName: {
                        path: '$item',
                        formatting: value => `my name is ${value.name.trim()} and I drive a ${value.vehicle}`
                    }
                }
            }
        };
        const mold = (res) => {
            console.info(res);
        };
        jm(fm, template).then(mold);// { policy: { insuredName: 'my name is John     and I drive a $BMW' } }
    }
)(jsonMapper, from);

// Example 7
// test case 7
// {  name:{target:’policy.insuredName’, transform:[{map:{John:’foo’, Jim:’bar’…}}] }           policy { insuredName:’foo’ }

((jm, fm) => {
    const template = {
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
    };
    const mold = (res) => {
        console.info(res);
    };
    jm(fm, template).then(mold);  // { policy: { insuredName: 'foo' } }
})(jsonMapper, from);

// Example 8
// test case 8
// Mapping.transformations.maps.nameMap = { John:’xyz’,…}
// {  name:{target:’policy.insuredName’, transform:[{map:{nameMap} }] }
//       policy { insuredName:’xyz’ }
((jm, fm) => {
    const template = {
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
    };
    const callback = (res) => {
        console.info(res);
    };
    jm(from, template).then(callback); // { policy: { insuredName: 'foo' } }

})(jsonMapper, from);

// Example 9
// test case 9
// Mapping.transformations.maps.nameMapWithVars = { John:{format:’hello $value}’,…}
// {  name:{target:’policy.insuredName’, transform:[{map:{nameMap} }] }           policy { insuredName:’hello John’ }
((jm, fm)=>{
    const template = {
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
    };
    const onfulfilled = (res) => {
        console.info(res);
    };
    jsonMapper(from, template).then(onfulfilled) // { policy: { insuredName: 'hello John    ' } }

})(jsonMapper, from);

// Example 10
// test case 10
// {  phone:’policy.insured.phone’ }           policy { insured:{ phone:[…] }
((jm,fm)=>{
    const template = {
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
    };
    const process = (res) => {
        console.info(res);
    };
    jm(fm, template).then(process) // { policy: { insured: { phone: [Array] } } }

})(jsonMapper, from);

// Example 21
// test case 11
// {  phone:{target:’policy.insured.phone’,options:{num:’number’, ext:’extension’ }
//       policy { insured:{phone:[ {number:“88”,extension:”1”} {number:”121”,extension:”0”}]] }
((jm, fm)=>{
    const template = {
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
    };
    const afterConversion = (res) => {
        console.table(res['policy'].insured);
    };
    jm(fm, template).then(afterConversion)
    //┌─────────┬─────────────────────────┬─────────────────────────┐
    //│ (index) │            0            │            1            │
    //├─────────┼─────────────────────────┼─────────────────────────┤
    //│  phone  │ { num: '88', ext: '1' } │ { nm: '121', ext: '0' } │
    //└─────────┴─────────────────────────┴─────────────────────────┘

})(jsonMapper, from);

// Example 11
// test case 11
// {  phone:{target:’policy.insured.phone’,options:{num:{target:’number’, transform:[pad4Digits] }, ext:’extension’ }
//       policy { insured:{phone:[ {number:“0088”,extension:”1”} {number:”0121”,extension:”0”}]] }
((jm, fm) => {
    jm(fm, {
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

})(jsonMapper, from);

// Example 12
// test case 12
// {  vehicle:{target:’veh’, prefix:{strip:’$’}, transform:[toLower] }           { veh:  ‘bmw’}
((jm, fm)=> {
    const onFinish = (res) => {
        console.debug(res);
    };
    jm(fm, {
        'veh': {
            path: 'vehicle',
            formatting: value => value.substr(1).toLowerCase()
        }
    }).then(onFinish); // { veh: 'bmw' }

})(jsonMapper, from);
// Example 13
// test case 13
// Mapping.transformations.myTransformation=x->’hi_’+x
//
// {  vehicle:{target:’veh’, transform:[myTransformation] }           { veh:  ‘hi_$bmw’}
((jm, fm) => {
    const template = {
        'veh': {
            path: 'vehicle',
            formatting: value => {
                return 'hi_' +
                    value.toLowerCase()
            }

        }
    };
    jm(fm, template).then((res) => {
        console.debug(res);
    }); // { veh: 'hi_$bmw' }

})(jsonMapper,from);