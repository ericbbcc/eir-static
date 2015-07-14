/**
 * Created by float.lu on 7/7/15.
 */
//require.js配置
require.config({
    baseUrl : "../../",
    paths:{
        "jquery" : "bower_components/jquery/dist/jquery",
        "API" : "scripts/API"
    },
    shim:{
        "jquery":{
            exports : "$"
        }
    }
});

require(["API","jquery"], function(API, $){

});
