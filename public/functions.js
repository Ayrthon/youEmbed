const db = firebase.firestore();

const docRef = db.collection('urls').doc('ytlink');
const submitBtn = document.getElementById('submitBtn');
const deleteBtn = document.getElementById('submitBtnDelete');

// Submit URL
submitBtn.addEventListener("click", function() {
    const urlField = document.getElementById("yturl").value;

    return docRef.update({
        "ytUrl": urlField
    })
    .then(() => {
        console.log("Video ID added!");
    })
    .catch((error) => {
       console.error("Error updating document: ", error);
    });
});

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
            frame.src= 'https://www.youtube.com/embed/' + ytID + '?autoplay=1&mute=1&loop=1&playlist=' + ytID;
        }
        
    } else {
        console.log('querySnapshot is undefined or does not exist');
    }
});

// Delete video
deleteBtn.addEventListener("click", function() {
    return docRef.update({
        "ytUrl": '' //remove id from DB
    })
    .then(() => {
        var frame = document.getElementById('ytplayer');
        frame.src= ''; //remove entire link from iframe to show nothing

        console.log("Video Deleted from database");
    })
    .catch((error) => {
       console.error("Error updating document: ", error);
    });
});
