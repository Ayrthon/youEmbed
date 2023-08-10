const db = firebase.firestore();

const docRef = db.collection('urls').doc('ytlink');

// Get URL
docRef.onSnapshot(querySnapshot => {
    if (querySnapshot && querySnapshot.exists) {
        const ytID = `${querySnapshot.data().ytUrl}`;
        
        //set iframe for testing
        if (ytID === ""){
            var frame = document.getElementById('ytplayer');
            frame.src= ''; //remove entire link from iframe to show nothing
        } else {
            var frame = document.getElementById('ytplayer');
            frame.src= 'https://www.youtube.com/embed/' + ytID + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=' + ytID;
        }
        
    } else {
        console.log('querySnapshot is undefined or does not exist');
    }
});