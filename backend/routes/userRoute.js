import express from "express";
import User from '../modals/userModals'
import { getToken, isAuth} from '../util';
const sendEmail = require('../email/email.send')
const msgs = require('../email/email.msgs')
const templates = require('../email/email.templates')
const router = express.Router()
const moment = require("moment");

// ----------------- LOGIN USER --------------------//
router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
})

// ---------------------FORGOT PASSWORD --------------------//

router.post('/signin/forgot' , async (req,res) => {
  const user = await User.findOne({
      email: req.body.email
  })
  if(!user) {
     return res.status(500).send({ message: err.message });
  }

  if(user) {
  user.passwordResetExpires = moment().add(12, "hours");
  user.save() 
  const mail = await sendEmail(user.email, templates.forgotConfirm(user._id))
  const response = await res.status({ msg: msgs.confirm })
  res.status(200).send({message:"email send at user addres"})
  }
})

//------------------- RESET PASSWORD -------------------//

router.post('/signin/reset/:id' , async (req,res) => {
  const user = await User.findOne({ _id: req.params.id });
   
  if(!user) {
    res.json({msg:'user does not exists'})
    res.json({ msg: msgs.couldNotFind })
  }

  if (moment().utcOffset(0) > user.passwordResetExpires) {
        return res.status(400).send({
          message: "Token has expired."
        });
      }
 
  user.password = req.body.password;
  user.passwordResetExpires = moment().utcOffset(0);
  user.save()
  res.status(200).send({message:"new password has been set , Please login"})

})

// ------------------ UPDATE USER(own) ------//

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

// --------------------- REGISTER USER----------------------//
router.post('/register', (req,res) => {
    const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
 const olduser =  User.findOne({email:user.email})
                  .then(olduser => {
                    if(!olduser) {
                      console.log('it was a new user');
                      const newUser = user.save()
                                      .then(() => { 
                                        if(newUser) {
                                            res.send({
                                            _id: newUser.id,
                                            name: newUser.name,
                                            email: newUser.email,
                                            isAdmin: newUser.isAdmin,
                                            token: getToken(newUser),
                                          });
                                        }     else {
                                           res.status(401).send({ message: 'Invalid User Data.' });
                                        }  
                                      })
                                      .then(mail => sendEmail(user.email, templates.registerConfirm(user._id)))
                                      .then(() => res.status({ msg: msgs.confirm }))
                                      .catch(err => console.log(err))
                    } 
                    else if (olduser && !user.confirmed) {
                      sendEmail(olduser.email, templates.registerConfirm(olduser._id))
                      .then(() => res.json({ msg: msgs.resend }))
                    }

                    else {
                       res.json({ msg: msgs.alreadyConfirmed })
                    }
                  })
})


// ------------------ CONFIRM EMAIL WHILE REGISTER--------------------------//
router.get('/confirm/:id' , async (req,res) => {
  const user = await User.findOne({ _id: req.params.id });
   
  if(!user) {
    res.json({msg:'user does not exists'})
    res.json({ msg: msgs.couldNotFind })
  }
  else if(user && !user.confirmed) {
    const confirmuser = await User.findByIdAndUpdate(user._id , {confirmed:true})
     res.status(200).json({msg:'user data modified'})
  }
  else {
     res.json({ msg: msgs.alreadyConfirmed })
  }
})

// -------------------------------- CREATE ADMIN------------------------------//
router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Shree sir',
      email: 'sengargeetendra3@gmail.com',
      password: '1234',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});


export default router