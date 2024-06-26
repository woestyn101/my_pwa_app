const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    console.log('enter')
    console.log("event" + event)
    event.preventDefault();
    // this will store the events
     window.deferredPrompt = event;    
   // this will remove the hidden class from the install button
    butInstall.classList.toggle('hidden', false);

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    
    if (!promptEvent) {
        return;
    }
    
    promptEvent.prompt();   
    window.deferredPrompt = null;

    // toggle between visible and hidden
    butInstall.classList.toggle('hidden', true);

});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('install enter')
    window.deferredPrompt = null;

});
