const Club = require("../models/club/clubs.model")
const Student = require("../models/student.model")
const Applicant = require('../models/club/applicants.model')
const path = require('path')
const User = require('../models/user.model')
const fs = require('fs')

exports.addNewClub = async(req, res, next)=>{
    console.log(" New Club")
    const club = {
        clubname: req.body.clubname,
        logo: {
            data:  fs.readFileSync( req.file.path),
            contentType: 'image/jpg/png'
        },
        club_description: req.body.club_description,
        maxIntake: req.body.maxIntake,
        recruiting: req.body.recruiting,
        userId: req.params.userId,
        members: req.body.members

    }
    console.log(club);
    const newclub = await Club.create(club);
    if (newclub){
        res.json({
            status: "success",
            newclub
        });
    }else{
        res.json({
            status: "failure",
            message: "message"
        })
    }
    next();
}

exports.applyToClub = async(req, res, next)=>{

       let userId = req.params.userId;

    const theclub = await Club.findOne({_id: req.body.clubId})
    if(theclub){
    console.log(theclub);
    theclub.members.push(userId);
    console.log(theclub);
    theclub.save();
   next();
    }
    else {
        res.json({
            status: "failure",
            message: "Could not apply to this club"
        })
    }
}

exports.getAllClubs = async (req, res, next)=>{
    const clubs = await Club.find({});
    res.json({
       status: 'success',
       clubs
    })
    console.log(clubs);
    next();
}

exports.getClubMembers = async(req, res, next)=>{
    const club = await Club.findOne({userId: req.params.userId});
    console.log(club)
    const members = club.members;
    res.json({
        status: 'success',
        members
    })
    next();
    
}
exports.deleteMember = async( req, res, next)=>{
    const club = await Club.findOne({_id: req.params.userId});
    club.members.pop(req.body.userId)
    club.save();
    res.json({
        status: "success",
        message: "YOu have succesfuly removed this member" 
    })
    next();
}
exports.studentApplyClub = async (req, res, next)=>{
    const data = {
        userId: req.params.userId,
        clubId: req.body.clubId,
        department: req.body.department,
        WhyThisClub: req.body.WhyThisClub
    }
    const alreadyApplied = await Applicant.findOne({userId: req.params.userId, clubId: req.body.clubId});
    if (!alreadyApplied){
        const newApplicant = await Applicant.create(data);
        if(newApplicant){
            res.json({
                status: 'success',
                message: " you have successfuly applied to the club.", 
                newApplicant
            })
        }
        else{
            res.json({
                status: 'failure',
                message: " Not applied. Try again."
            })
        }
    }
    else{
        res.json({
            status: 'failure',
            message: 'You have already applied to this Club.'
        })
    }
    
    next();
}

exports.notifyCP = async (req, res, next)=>{
    const theClub = await Club.findOne({userId: req.params.userId});
   console.log(theClub);

    const applicants = await  Applicant.find({clubId: theClub._id});

     if(applicants.length == 0){

            res.json({
                status: 'failure',
                message: 'No Applicant'
            })
        }
        else{
            let applicantUsers = applicants.map(async id => await User.findById(id.userId))
            const users =  await Promise.all(applicantUsers);
            console.log(users);
            res.json({
                status: 'success',
                users
            })
        }
    

    /*if(!applicants){
        res.json({
            status: 'failure',
            message: "No Applicant Yet."
        })
    }
    else{
       // const president = await User.findOne({userId: req.params.userId});
        res.json({
            status: 'success',
            applicants
        })*/
    next();

}
exports.approveApplicant = async(req, res, next)=>{
    const clubs = await Club.findOne({userId: req.params.userId})
    console.log("found club "+ clubs)
     const approvedApplicant = await User.findOne({_id: req.body.aid})
     approvedApplicant.clubId = clubs._id;
     approvedApplicant.save();
    const member = req.body.userId
    clubs.members.push(member);
    clubs.save();
    await Applicant.findOneAndDelete({userId: req.body.aid});
    res.json({
        status: 'success',
        message: 'saved.',
        clubs
    });
    next();
}
exports.declineApplicant = async(req, res, next)=>{
    const user = await Applicant.findOne({userId: req.params.id});
    if (!user){
        res.json({
            status: 'failure',
            message:'User not found'
        });
    }
    else{
        user.rejected = true
        user.save
        res.json({
            status: 'success',
            message: " Applicant has been rejected.",
            user
        });
    }
    
    const my = clubArray.map( async id =>  await Club.findById( id))
    console.log(my)

    const myclubs = await Promise.all(my);
    res.json({
        status: 'success',
        myclubs
    });
    next();
}

exports.myClubs = async(req, res, next)=>{
    const user = await User.findOne({_id: req.params.userId});
    
    let clubArray = user.clubId
    console.log(clubArray)
    
    const my = clubArray.map( async id =>  await Club.findById( id))
    console.log(my)

    const myclubs = await Promise.all(my);
    res.json({
        status: 'success',
        myclubs
    });
    next();
}

exports.getClubInfo = async(req, res, next)=>{

     const club = await Club.findOne({userId: req.params.userId})
   if(!club){
       
    res.json({
        status: 'failuer',
        message: 'You have not specified the details of your club. Click To add now'
    });
   }
else{
    res.json({
        status: 'success',
        club
    });
    console.log(club)
}
    next();
}
exports.editClubInfo = async(req, res, next)=>{
    console.log("kjfjkdfjk")
    console.log(req.body)   
     const club = await Club.findOne({userId: req.params.userId});
     console.log(club);
         club.title = req.body.title
         club.body = req.body.body
         club.file = req.file.filename
  
        club.save();
              res.json({
                status: " success",
                 club
              })
              console.log(club);
            next();
  
     }
  