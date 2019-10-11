self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
      body: "Trang web có biến cố, hãy vào xem ngay :))",
      icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
  });