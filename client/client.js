
const publicVapidKey ="BD2F54DB8SenEQlKzeyJ0pQYKSXiT_8wT1LGMbFs4w4ZqPnys8bpN8KoSk2Tt6Nj7TRfQPpfQxssmh0h68CIjdc"

// Lấy giá trị 

var xd = document.getElementById('xd');
console.log(xd.value)


// check for service woker

if ('serviceWorker' in navigator) {
    if (xd.value == 1) {
        send().catch(err => console.log(err))

    } else {
        console.log('Không thông báo')
    }
}

// Register SW, Register Push, Send Push
async function send(){

    // Register Service worker
    console.log('Register service worker...');
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope:'/'
    });
    console.log('Severviec Woker Registered...')

     // Register Push
    console.log('Register PushManager...')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    console.log('Push Register....')

    // Send Push Notification
    console.log('Sending Push...')

    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type': 'application/json',

        }
    })
    console.log('Push Send....')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }