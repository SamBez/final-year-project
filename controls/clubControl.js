const Club = require("../models/club/clubs.model")
const Student = require("../models/student.model")
const Applicant = require('../models/club/applicants.model')

exports.addNewClub = async(req, res, next)=>{
    console.log(" New Club")
    const club = {
        clubname: req.body.clubname,
        logo: req.file.filename,
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
    const newApplicant = await Applicant.create(data);
    if(newApplicant){
        res.json({})
    }
}