var localStrategy=require('passport-local').Strategy;
const mysql=require('mysql');
// const bcrypt=require('bcrypt-nodejs');

module.exports=function(passport){

    passport.serializeUser(function(user,done){
        done(null,user);
    });

    passport.deserializeUser(function(user,done){
        done(null,user);
    });

    passport.use(new localStrategy({

        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
        
    },function(req,email,password,done){

        let config=require('../Database/database');
        let db=mysql.createConnection(config);

        db.connect();
        db.query('SELECT * FROM user WHERE email=?',email,(err,rows,fields)=>{

            if(err) throw err;

            if(rows.length > 0){

                var user=rows[0];

                if(password == user.password){
                    
                    return done(null,{
                        id:user.id,
                        email:user.email,
                    });
                    
                }

            }

            return done(null,false,req.flash('loginMessage','Wrong Data, try again'));


        });

    }));
}