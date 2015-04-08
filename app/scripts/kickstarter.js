alert('Kickstarted');

var event = document.createEvent('Event');
// Define that the event name is 'build'.
event.initEvent('TAPkickstart', true, true);
document.dispatchEvent(event);