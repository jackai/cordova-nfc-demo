/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var t=1,code=[93,11,-2,-56];
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // Read NDEF formatted NFC Tags
        nfc.addTagDiscoveredListener (
            function (nfcEvent) {
                //alert(JSON.stringify(nfcEvent.tag.id));
                if(JSON.stringify(code)==JSON.stringify(nfcEvent.tag.id)){
                    //alert('集點成功!');
                    t++;
                    if(t>9){
                        t=1;
                        $("li").addClass('b');
                        $("li").removeClass('a');
                    }
                    $("li.b:eq(0)").addClass('a');
                    $("li.b:eq(0)").removeClass('b');
                }else{
                    alert('印章錯誤!');
                }
            }, 
            function () { // success callback
                //alert("成功載入");
            },
            function (error) { // error callback
                alert("失敗 " + JSON.stringify(error));
            }
        );
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};
app.initialize();
