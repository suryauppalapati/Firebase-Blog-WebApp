function signOut() {
    firebase.auth().signOut().then(() => {
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
        alert("Couldn't sign out.")
    });
}

function upload() {
    var user = firebase.auth().currentUser;
    if (user) {
        if (user != null) {
            var currentName = user.displayName;
            var email = user.email;

            var uid = user.uid;
            console.log(currentName);
            console.log(email);
            console.log(uid);

        }
    }
    var image = document.getElementById('image').files[0];
    var post = document.getElementById('post').value;
    var imageName = image.name;

    var storageRef = firebase.storage().ref('images/' + imageName);

    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "done");
    }, function (error) {
        console.log(error.message);
    }, function () {

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            firebase.database().ref('blogs/').push().set({
                userid: uid,
                author: currentName,
                text: post,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                imageURL: downloadURL
            }, function (error) {
                if (error) {
                    alert("Error while uploading");
                } else {
                    alert("Successfully uploaded");
                    document.getElementById('post-form').reset();
                    getData();
                    window.location = 'Homepage.html';
                }
            });

        });
    });

}

window.onload = function () {
    this.getData();
}

//getting blogs to be displayed
function getData() {
    firebase.database().ref('blogs/').once('value').then(function (snapshot) {
        var posts_div = document.getElementById('posts');

        posts.innerHTML = ""

        var data = snapshot.val();
        console.log(data);

        for (let [key, value] of Object.entries(data)) {
            posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'>" +
                "<div class = 'card'>" +
                "<img src= '" + value.imageURL + "' style='height:250px;'>" +
                "<div class='card-body'><p class='card-text'> " + value.author + "</p>" +
                "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
                "</div></div></div></div>" + posts_div.innerHTML;
        }

    });
}

function userData() {
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        if (user != null) {
            var uid = user.uid;
        }
    }

    firebase.database().ref('blogs/').orderByChild('userid').equalTo(uid).on("value", function (snapshot) {
        var posts_div = document.getElementById('posts');

        posts.innerHTML = ""

        var userData = snapshot.val();
        console.log(userData);

        for (let [key, value] of Object.entries(userData)) {
            posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'>" +
                "<div class = 'card'>" +
                "<img src= '" + value.imageURL + "' style='height:200px;'>" +
                "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
                "<button class='btn btn-danger' id= '" + key + "' onclick = 'delete_post(this.id)'>Delete</button>" +
                "</div></div></div></div>" + posts_div.innerHTML;
        }


    });

}

function delete_post(key) {
    firebase.database().ref('blogs/' + key).remove();
}