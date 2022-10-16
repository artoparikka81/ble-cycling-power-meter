var utf8decoder = new TextDecoder();
var w = 0;



document.getElementById("scan").addEventListener("click", function(){
  navigator.bluetooth.requestDevice({
    filters: [{
      services: [0x1818]
    }]
  })
  .then(device => device.gatt.connect())
  .then(server => server.getPrimaryService(0x1818))
  .then(service => service.getCharacteristic(0x2A63))
  .then(characteristic => characteristic.startNotifications())
  .then(characteristic => {
    characteristic.addEventListener('characteristicvaluechanged',
                                    handleCharacteristicValueChanged);
    console.log('Notifications have been started.');
  }).catch(error => { console.log(error); });

  function handleCharacteristicValueChanged(event) {
    var value = event.target.value;
    
    /*
    Watts can be found here
    https://github.com/sputnikdev/bluetooth-gatt-parser/blob/master/src/main/resources/gatt/characteristic/org.bluetooth.characteristic.cycling_power_measurement.xml
    */
    
    w = parseInt(value.getInt16(1,1)/100,10);
    watts.innerHTML = w + 'W';
  }
});
    

