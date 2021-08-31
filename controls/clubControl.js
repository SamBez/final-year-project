const Club = require("../models/club/clubs.model")
const Student = require("../models/student.model")
const Applicant = require('../models/club/applicants.model')
const path = require('path')
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

exports.getAllClubs = async(req, res, next)=>{
    const clubs = await Club.find({});
    res.json({
       status: 'success',
       clubs
    })
}

exports.getClubMembers = async(req, res, next)=>{
    const club = await Club.findOne({_id: req.body.clubId});
    const members = club.members;
    res.json({
        status: 'success',
        members
    })
    
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

    const applicants = Applicant.find({clubId: theClub._id});
    if(!applicants){
        res.json({
            message: "No Applicant Yet."
        })
        next();
    }
    else{
       // const president = await User.findOne({userId: req.params.userId});
        res.json({
            status: 'success',
            applicants
        })
    }
}
exports.approveApplicant = async(req, res, next)=>{
    const clubs = await Club.findOne({userId: req.params.userId})
    console.log("found club "+ clubs)
    const member = req.body.userId
    clubs.members.push(member);
    clubs.save();
    res.json({
        status: 'success',
        message: 'saved.'
    });
    next();
}

exports.myClubs = async(req, res, next)=>{
    let user = req.params.userId
    const clubs = await Club.find({})
    const myclubs = clubs.map( member =>{
          let obj={}
          obj[member.userId] = member.userId
          return myclubs
    })
}