import firebase from 'firebase';
import uuid from 'uuid';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      // avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyAaUfJ92s0B12h7YsO1qRxI_R8MzfaWAGc',
        authDomain: 'chat-module-8c706.firebaseapp.com',
        databaseURL: 'https://chat-module-8c706.firebaseio.com',
        projectId: 'chat-module-8c706',
        storageBucket: 'chat-module-8c706.appspot.com',
        messagingSenderId: '496407443824',
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
    // console.log("getting display name");
    // // console.log(this.displayName());
    // user.name = this.displayName();
    // console.log("got display name");
    // console.log(user.name);
  };

  createAccount = async (user) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function () {
          console.log(
            'created user successfully. User email: ' +
              user.email +
              ' name: ' +
              user.name
          );
          var userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: user.name }).then(
            function () {
              console.log(
                'Updated displayName successfully. Name: ' + user.name
              );
              console.log(
                'User ' + user.name + ' was created successfully. Please login.'
              );
            },
            function (error) {
              console.log('Error updating displayName.');
            }
          );
        },
        function (error) {
          console.log('Create account failed. Error: ' + error.message);
        }
      );
  };

  // Not needed in long run

  uploadImage = async (uri) => {
    console.log('got image to upload. uri: ' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref('avatar').child(uuid.v4());
      const task = ref.put(blob);

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {},
          reject,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message);
    }
  };

  updateAvatar = (url) => {
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url }).then(
        function () {
          console.log('Updated avatar successfully. url: ' + url);
          alert('Avatar image is saved succesfully.');
        },
        function (error) {
          console.warn('Error updating avatar.');
          alert('Error updating avatar. Error: ' + error.message);
        }
      );
    } else {
      console.log("Can't update avatar, user is not logged in");
      alert('Unable to update avatar. You must login first');
    }
  };



  displayName() {
    console.log("IN DISPLAY NAME")
    console.log(firebase.auth().currentUser)
    // return (firebase.auth().currentUser || {}).displayName;
    return (firebase.auth().currentUser.displayName);
  }

  get avatar() {
    return firebase.auth().currentUser.avatar;
  }

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  get uid() {

    return (firebase.auth().currentUser || {}).uid;

  }



  get ref() {

    return firebase.database().ref('chat_messages');

  }



  refOn =() => {

    return new Promise((resolve,reject)=>{

        let cData=[]

        this.ref.on('child_added', function (snapshot) {

          const { timestamp: numberStamp, text, user,fname, } = snapshot.val();

          const { key: id } = snapshot;

          const { key: _id } = snapshot; 

          const timestamp = new Date(numberStamp);

          const message = {

            fname,

            text,

            timestamp,

            user

          };

        cData.push(message)

        resolve(cData)

      })

    })

  }



  get timestamp() {

    return firebase.database.ServerValue.TIMESTAMP;

  }

  

  send=(text,fname,uname)=>{
    firebase.database().ref('chat_messages/').push({
      'fname':fname,
      'text':text,
      user:{
          'uname':uname
      }
  }).then((data)=>{
      console.log('data ' , data)
  }).catch((error)=>{
      console.log('error ' , error)
  })
  }

  refOff() {
      this.ref.off();
    }


  signedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("TRUE");
    return true;
  } else {
    console.log("FALSE");
    return false;
  }
});
  }

  // ADDITION FOR USERS SCREEN
  //
  //

  usersData = () => {
    console.log('In user data')
    let all = [];
    return new Promise((resolve, reject) => {
      var docRef = firebase.firestore().collection('chatie_user');
      docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          all.push(doc.data());
        }, resolve(all));
      });
    });
  };
}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;